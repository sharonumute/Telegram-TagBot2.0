const Telegraf = require('telegraf');
const Scene = require('telegraf/scenes/base');
const extra = require('telegraf/extra');
const { isValidTagName } = require('../utils/inputValidation');
const { commandParser } = require('../utils/inputValidation');
const {
    invalidTagNameString,
    postTagReplyFormatString,
    promptDescriptionString
} = require('../strings/createTagStrings');
const createTagOnServer = require('../server/createTag');

/**
 * Scene played out when user wishes to create a tag
 */
const createTagScene = new Scene('create_tag');

createTagScene.enter(async ctx => {
    const userArgument = commandParser('/create', ctx.message.text);

    ctx.scene.state.tagName = userArgument;

    const isValid = isValidTagName(userArgument);
    if (!isValid) {
        await ctx.replyWithMarkdown(invalidTagNameString(userArgument));
        return;
    }

    const text = promptDescriptionString(userArgument);

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
        tagName: ctx.scene.state.tagName,
        description: description,
        createdOn: Date.now().toString(),
        createdBy: ctx.from.id,
        membersCount: '0',
        groupTgID: ctx.chat.id
    });

    ctx.session.user = res;

    await ctx.telegram.editMessageText(
        ctx.chat.id,
        ctx.scene.state.messageIdToEdit,
        null,
        postTagReplyFormatString(
            ctx.session.user.tag,
            ctx.session.user.statusMessage
        ),
        extra.markdown()
    );
}

createTagScene.action('SKIP', async ctx => {
    await createTag('', ctx);
    await ctx.scene.leave();
});

module.exports = createTagScene;
