const Telegraf = require('telegraf');
const Scene = require('telegraf/scenes/base');
const extra = require('telegraf/extra');
const { inputParser } = require('../utils/inputValidation');
const {
    pleaseSpecifyNamesString,
    failedToAddString,
    successOnAddString,
    userMessageParse
} = require('../strings/tagOperationStrings');
const addUserOnServer = require('../database/addUser');

/**
 * Scene played out when user wishes to add a user to a tag
 */
const addUserScene = new Scene('add_user');

addUserScene.enter(async ctx => {
    ctx.scene.state.messageIdToReply = ctx.message.message_id;

    const parts = inputParser(ctx.message.text, ctx.message.entities);

    console.log(parts);

    const tagName = parts.first_word.replace('@', '');
    const usernames = parts.mentions;

    const isValid = usernames.length > 0;
    if (!isValid) {
        await ctx.replyWithMarkdown(pleaseSpecifyNamesString());
        return;
    }

    await addUser(tagName, usernames, ctx);

    await ctx.scene.leave();
});

async function addUser(tagName, users, ctx) {
    try {
        ctx.scene.state.messageIdToEdit = (await ctx.reply(
            '<i>Adding User[s]...</i>',
            Telegraf.Extra.HTML().inReplyTo(ctx.scene.state.messageIdToReply)
        )).message_id;

        const usersNotAdded = {};
        for (var index in users) {
            const user = users[index].replace('@', '');

            const res = await addUserOnServer(tagName, ctx.chat.id, user);

            if (!res.status) {
                usersNotAdded[user] = res.statusMessage;
            }
        }

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
        ctx.reply('A Server error occured');
        console.log(error);
    }
}

module.exports = addUserScene;
