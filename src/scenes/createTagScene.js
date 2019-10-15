const Telegraf = require('telegraf');
const Scene = require('telegraf/Scenes/base');
const extra = require('telegraf/extra');
const { isValidTagName } = require('../Utils/InputValidation');
const { inputParser } = require('../Utils/InputValidation');
const {
    invalidTagNameString,
    postTagEditReplyFormatString,
    promptDescriptionString
} = require('../Strings/TagOperationsStrings');
const createTagOnServer = require('../Database/Server/CreateTag');

/**
 * Scene played out when user wishes to create a tag
 */
const createTagScene = new Scene('create_tag');

createTagScene.enter(async ctx => {
    const parts = inputParser(ctx.message.text, ctx.message.entities);

    ctx.scene.state.tagName = parts.first_word;

    const isValid = isValidTagName(ctx.scene.state.tagName);
    if (!isValid) {
        await ctx.replyWithMarkdown(
            invalidTagNameString(ctx.scene.state.tagName)
        );
        return;
    }

    const text = promptDescriptionString(ctx.scene.state.tagName);

    const extra = Telegraf.Markup.inlineKeyboard([
        Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
        Telegraf.Markup.callbackButton('Skip', 'SKIP')
    ]).extra();

    var createPromptMessage;
    if (ctx.callbackQuery) {
        createPromptMessage = await ctx.editMessageText(text, extra);
    }

    createPromptMessage = await ctx.replyWithMarkdown(text, extra);

    ctx.scene.state.createPromptMessageId = createPromptMessage.message_id;
});

createTagScene.on('text', async ctx => {
    ctx.scene.state.messageIdToReply = ctx.message.message_id;
    let description = ctx.message.text;

    if (!description) {
        await ctx.replyWithMarkdown(
            promptDescriptionString(ctx.scene.state.tagName),
            Telegraf.Markup.inlineKeyboard([
                Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
                Telegraf.Markup.callbackButton('Skip', 'SKIP')
            ]).extra()
        );

        return;
    }

    await createTag(description, ctx);

    await ctx.scene.leave();
});

async function createTag(description, ctx) {
    try {
        await ctx.telegram.editMessageText(
            ctx.chat.id,
            ctx.scene.state.createPromptMessageId,
            null,
            promptDescriptionString(ctx.scene.state.tagName),
            extra.markdown()
        );

        ctx.scene.state.messageIdToEdit = (await ctx.reply(
            '<i>Creating Tag...</i>',
            Telegraf.Extra.HTML().inReplyTo(ctx.scene.state.messageIdToReply)
        )).message_id;

        const res = await createTagOnServer({
            Name: ctx.scene.state.tagName,
            Description: description,
            CreationTimeStamp: Date.now().toString(),
            CreatorUserID: ctx.from.id,
            GroupID: ctx.chat.id
        });

        ctx.session.user = res;

        if (!res.status) {
            await ctx.telegram.editMessageText(
                ctx.chat.id,
                ctx.scene.state.messageIdToEdit,
                null,
                ctx.session.user.statusMessage,
                extra.markdown()
            );

            return;
        }

        await ctx.telegram.editMessageText(
            ctx.chat.id,
            ctx.scene.state.messageIdToEdit,
            null,
            postTagEditReplyFormatString(
                ctx.session.user.tag,
                ctx.session.user.statusMessage
            ),
            extra.markdown()
        );
    } catch (error) {
        ctx.reply('A Server error occured');
        console.log(error);
    }
}

createTagScene.action('SKIP', async ctx => {
    await createTag('', ctx);
    await ctx.scene.leave();
});

module.exports = createTagScene;
