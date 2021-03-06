const Telegraf = require('telegraf');
const Scene = require('telegraf/Scenes/base');
const extra = require('telegraf/extra');
const { inputParser } = require('../Utils/InputValidation');
const {
    pleaseSpecifyNamesString,
    failedToAddString,
    successOnAddString,
    userMessageParse
} = require('../Strings/TagOperationsStrings');
const addUserOnServer = require('../Database/Server/AddUser');

/** Scene played out when user wishes to add a user to a tag */
const addUserScene = new Scene('add_user');

addUserScene.enter(async ctx => {
    ctx.scene.state.userMessageToReply = ctx.message.message_id;

    const parts = inputParser(ctx.message.text, ctx.message.entities);
    const usernames = parts.mentions;

    if (usernames.length <= 0) {
        await ctx.replyWithMarkdown(pleaseSpecifyNamesString());
        return;
    }

    const tagName = parts.first_word.replace('@', '');

    await addUser(tagName, usernames, ctx);
    await ctx.scene.leave();
});

/**
 * Add user and update scene
 * @param {string} tagName
 * @param {[]} users
 * @param {*} ctx
 */
async function addUser(tagName, users, ctx) {
    try {
        ctx.scene.state.messageIdToEdit = (
            await ctx.reply(
                '<i>Adding User[s]...</i>',
                Telegraf.Extra.HTML().inReplyTo(
                    ctx.scene.state.userMessageToReply
                )
            )
        ).message_id;

        const usersNotAdded = {};
        users.forEach(async user => {
            const res = await addUserOnServer(tagName, ctx.chat.id, user);

            if (!res.status) {
                usersNotAdded[user] = res.statusMessage;
            }
        });

        if (Object.keys(usersNotAdded).length > 0) {
            ctx.session.pmMessage = userMessageParse(usersNotAdded);

            const extra = Telegraf.Markup.inlineKeyboard([
                Telegraf.Markup.callbackButton('Click for more info', 'PM_INFO')
            ]).extra();

            await ctx.telegram.editMessageText(
                ctx.chat.id,
                ctx.scene.state.messageIdToEdit,
                null,
                failedToAddString(tagName),
                extra
            );

            return;
        }

        await ctx.telegram.editMessageText(
            ctx.chat.id,
            ctx.scene.state.messageIdToEdit,
            null,
            successOnAddString(tagName),
            extra.markdown()
        );
    } catch (error) {
        console.error(error);
        ctx.reply('A Server error occured');
    }
}

module.exports = addUserScene;
