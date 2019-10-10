const Telegraf = require('telegraf');
const Scene = require('telegraf/scenes/base');
const extra = require('telegraf/extra');
const { isValidTagName } = require('../utils/inputValidation');
const { inputParser } = require('../utils/inputValidation');
const {
    invalidTagNameString,
    postTagEditReplyFormatString
} = require('../strings/tagOperationStrings');
const deleteTagOnServer = require('../database/deleteTag');

/**
 * Scene played out when user wishes to delete a tag
 */
const deleteTagScene = new Scene('delete_tag');

deleteTagScene.enter(async ctx => {
    const parts = inputParser(ctx.message.text, ctx.message.entities);

    ctx.scene.state.tagName = parts.first_word;
    ctx.scene.state.userID = ctx.message.from.id;
    ctx.scene.state.chatID = ctx.message.chat.id;

    const isValid = isValidTagName(ctx.scene.state.tagName);
    if (!isValid) {
        await ctx.replyWithMarkdown(
            invalidTagNameString(ctx.scene.state.tagName)
        );
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
        postTagEditReplyFormatString(
            ctx.session.user.tag,
            ctx.session.user.statusMessage
        ),
        extra.markdown()
    );
}

module.exports = deleteTagScene;
