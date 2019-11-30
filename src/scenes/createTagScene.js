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
const { clearAndSetActiveActionButtons } = require('../Utils/SceneHelpers');

/** Scene played out when user wishes to create a tag */
const createTagScene = new Scene('create_tag');

createTagScene.enter(async ctx => {
    const parts = inputParser(ctx.message.text, ctx.message.entities);
    ctx.scene.state.tagName = parts.first_word;

    if (!isValidTagName(ctx.scene.state.tagName)) {
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

    var promptMessage;
    promptMessage = await ctx.replyWithMarkdown(text, extra);

    if (ctx.callbackQuery) {
        promptMessage = await ctx.editMessageText(text, extra);
    }

    ctx.scene.state.promptMessageId = promptMessage.message_id;
    ctx.scene.state.lastMessageWithButtonsId = ctx.scene.state.promptMessageId;
    ctx.scene.state.lastMessageWithButtonsString = text;
});

createTagScene.on('text', async ctx => {
    ctx.scene.state.userMessageToReply = ctx.message.message_id;
    const description = ctx.message.text;

    if (!description) {
        clearAndSetActiveActionButtons(
            ctx,
            ctx.scene.state.lastMessageWithButtonsId,
            ctx.scene.state.lastMessageWithButtonsString,
            await ctx.replyWithMarkdown(
                promptDescriptionString(ctx.scene.state.tagName),
                Telegraf.Markup.inlineKeyboard([
                    Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
                    Telegraf.Markup.callbackButton('Skip', 'SKIP')
                ]).extra()
            ),
            promptDescriptionString(ctx.scene.state.tagName)
        );
        return;
    }

    await createTag(description, ctx);

    await ctx.scene.leave();
});

/**
 * Create tag and update Scene
 * @param {string} description
 * @param {*} ctx
 */
async function createTag(description, ctx) {
    try {
        clearAndSetActiveActionButtons(
            ctx,
            ctx.scene.state.lastMessageWithButtonsId,
            ctx.scene.state.lastMessageWithButtonsString,
            null,
            null
        );

        ctx.scene.state.messageIdToEdit = (await ctx.reply(
            '<i>Creating Tag...</i>',
            Telegraf.Extra.HTML().inReplyTo(ctx.scene.state.userMessageToReply)
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
                res.statusMessage,
                extra.markdown()
            );
            return;
        }

        await ctx.telegram.editMessageText(
            ctx.chat.id,
            ctx.scene.state.messageIdToEdit,
            null,
            postTagEditReplyFormatString(
                res.tag,
                res.statusMessage
            ),
            extra.markdown()
        );
    } catch (error) {
        console.error(error);
        ctx.reply('A Server error occured');
    }
}

createTagScene.action('SKIP', async ctx => {
    await createTag('', ctx);
    await ctx.scene.leave();
});

module.exports = createTagScene;
