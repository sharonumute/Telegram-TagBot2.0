const Telegraf = require('telegraf');
const Scene = require('telegraf/scenes/base');
const extra = require('telegraf/extra');
const { isValidTagName } = require('../utils/inputValidation');
const { commandParser } = require('../utils/inputValidation');
const {
    invalidTagNameString,
    postTagReplyFormatString
} = require('../strings/createTagStrings');
const deleteTagOnServer = require('../server/deleteTag');

/**
 * Scene played out when user wishes to delete a tag
 */
const deleteTagScene = new Scene('delete_tag');

deleteTagScene.enter(async ctx => {
    const userArgument = commandParser('/delete', ctx.message.text);

    ctx.scene.state.tagName = userArgument;
    ctx.scene.state.userID = ctx.message.from.id;
    ctx.scene.state.chatID = ctx.message.chat.id;

    const isValid = isValidTagName(userArgument);
    if (!isValid) {
        await ctx.replyWithMarkdown(invalidTagNameString(userArgument));
        return;
    }

    await deleteTag(ctx);
    await ctx.scene.leave();
});

async function deleteTag(ctx) {
    ctx.scene.state.messageIdToEdit = (await ctx.reply(
        '<i>Deleting Tag...</i>',
        Telegraf.Extra.HTML().inReplyTo(ctx.scene.state.messageIdToReply)
    )).message_id;

    const userStatus = (await ctx.telegram.getChatMember(
        ctx.scene.state.chatID,
        ctx.scene.state.userID
    )).status;

    const res = await deleteTagOnServer(
        ctx.scene.state.tagName,
        ctx.scene.state.chatID,
        ctx.scene.state.userID,
        userStatus
    );

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
        postTagReplyFormatString(
            ctx.session.user.tag,
            ctx.session.user.statusMessage
        ),
        extra.markdown()
    );
}

module.exports = deleteTagScene;
