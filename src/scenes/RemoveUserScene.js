const Telegraf = require('telegraf');
const Scene = require('telegraf/Scenes/base');
const extra = require('telegraf/extra');
const { inputParser } = require('../Utils/InputValidation');
const {
    pleaseSpecifyNamesString,
    failedToRemoveString,
    successOnRemoveString,
    userMessageParse
} = require('../Strings/TagOperationsStrings');
const removeUserOnServer = require('../Database/Server/RemoveUser');

/**
 * Scene played out when user wishes to remove a user from a tag
 */
const removeUserScene = new Scene('remove_user');

removeUserScene.enter(async ctx => {
    ctx.scene.state.userMessageToReply = ctx.message.message_id;

    const parts = inputParser(ctx.message.text, ctx.message.entities);
    const tagName = parts.first_word.replace('@', '');
    const usernames = parts.mentions;

    if (usernames.length <= 0) {
        await ctx.replyWithMarkdown(pleaseSpecifyNamesString());
        return;
    }

    await removeUser(tagName, usernames, ctx);

    await ctx.scene.leave();
});

/**
 * Remove User and update scene
 * @param {string} tagName
 * @param {[]} users
 * @param {*} ctx
 */
async function removeUser(tagName, users, ctx) {
    try {
        ctx.scene.state.messageIdToEdit = (
            await ctx.reply(
                '<i>Removing User[s]...</i>',
                Telegraf.Extra.HTML().inReplyTo(
                    ctx.scene.state.userMessageToReply
                )
            )
        ).message_id;

        const usersNotRemoved = {};
        users.forEach(async user => {
            const res = await removeUserOnServer(tagName, ctx.chat.id, user);

            if (!res.status) {
                usersNotRemoved[user] = res.statusMessage;
            }
        });

        if (Object.keys(usersNotRemoved).length > 0) {
            ctx.session.pmMessage = userMessageParse(usersNotRemoved);

            const extra = Telegraf.Markup.inlineKeyboard([
                Telegraf.Markup.callbackButton('Click for more info', 'PM_INFO')
            ]).extra();

            await ctx.telegram.editMessageText(
                ctx.chat.id,
                ctx.scene.state.messageIdToEdit,
                null,
                failedToRemoveString(tagName),
                extra
            );
            return;
        }

        await ctx.telegram.editMessageText(
            ctx.chat.id,
            ctx.scene.state.messageIdToEdit,
            null,
            successOnRemoveString(tagName),
            extra.markdown()
        );
    } catch (error) {
        ctx.reply('A Server error occured');
        console.log(error);
    }
}

module.exports = removeUserScene;
