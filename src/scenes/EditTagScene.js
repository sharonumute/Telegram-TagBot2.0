const Telegraf = require('telegraf');
const Scene = require('telegraf/Scenes/base');
const extra = require('telegraf/extra');
const { isValidTagName } = require('../Utils/InputValidation');
const { inputParser } = require('../Utils/InputValidation');
const {
    nonexistantTagNameString,
    invalidTagNameString,
    postTagEditReplyFormatString,
    promptNewDescriptionString,
    promptNewNameString
} = require('../Strings/TagOperationsStrings');
const editTagOnServer = require('../Database/Server/EditTag');
const { returnSpecificTag } = require('../Database/Server/FetchTags');
const { clearAndSetActiveActionButtons } = require('../Utils/SceneHelpers');

/** Scene played out when user wishes to edit a tag */
const editTagScene = new Scene('edit_tag');

editTagScene.enter(async ctx => {
    const parts = inputParser(ctx.message.text, ctx.message.entities);
    ctx.scene.state.tagName = parts.first_word;

    if (!isValidTagName(ctx.scene.state.tagName)) {
        await ctx.replyWithMarkdown(
            invalidTagNameString(ctx.scene.state.tagName)
        );
        return;
    }

    const currentTagAndStatus = await returnSpecificTag(
        ctx.chat.id,
        ctx.scene.state.tagName
    );

    if (!currentTagAndStatus.status) {
        await ctx.replyWithMarkdown(
            nonexistantTagNameString(ctx.scene.state.tagName)
        );
        return;
    }

    ctx.scene.state.tagId = currentTagAndStatus.tag.TagID;
    ctx.scene.state.description = currentTagAndStatus.tag.Description;

    const text = promptNewNameString(ctx.scene.state.tagName);
    const extra = Telegraf.Markup.inlineKeyboard([
        Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
        Telegraf.Markup.callbackButton('Skip', 'SKIP')
    ]).extra();

    var editPromptMessage;
    editPromptMessage = await ctx.replyWithMarkdown(text, extra);

    if (ctx.callbackQuery) {
        editPromptMessage = await ctx.editMessageText(text, extra);
    }

    ctx.scene.state.lastMessageWithButtonsId =
        editPromptMessage.message_id;
    ctx.scene.state.lastMessageWithButtonsString = text;

    ctx.scene.state.editedName = false;
});

editTagScene.on('text', async ctx => {
    if (!ctx.scene.state.editedName) {
        var newName = ctx.message.text;

        if (!newName || !isValidTagName(newName)) {
            clearAndSetActiveActionButtons(
                ctx,
                ctx.scene.state.lastMessageWithButtonsId,
                ctx.scene.state.lastMessageWithButtonsString,
                await ctx.replyWithMarkdown(
                    promptNewNameString(ctx.scene.state.tagName),
                    Telegraf.Markup.inlineKeyboard([
                        Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
                        Telegraf.Markup.callbackButton('Skip', 'SKIP')
                    ]).extra()
                )
            );
            return;
        }

        ctx.scene.state.tagName = newName;
        ctx.scene.state.editedName = true;

        // Prompt for description edit
        clearAndSetActiveActionButtons(
            ctx,
            ctx.scene.state.lastMessageWithButtonsId,
            ctx.scene.state.lastMessageWithButtonsString,
            await ctx.replyWithMarkdown(
                promptNewDescriptionString(
                    ctx.scene.state.tagName,
                    ctx.scene.state.description
                ),
                Telegraf.Markup.inlineKeyboard([
                    Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
                    Telegraf.Markup.callbackButton('Skip', 'SKIP')
                ]).extra()
            )
        );
    } else {
        ctx.scene.state.userMessageToReply = ctx.message.message_id;
        const description = ctx.message.text;

        if (!description) {
            clearAndSetActiveActionButtons(
                ctx,
                ctx.scene.state.lastMessageWithButtonsId,
                ctx.scene.state.lastMessageWithButtonsString,
                await ctx.replyWithMarkdown(
                    promptNewDescriptionString(
                        ctx.scene.state.tagName,
                        ctx.scene.state.description
                    ),
                    Telegraf.Markup.inlineKeyboard([
                        Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
                        Telegraf.Markup.callbackButton('Skip', 'SKIP')
                    ]).extra()
                )
            );
            return;
        }

        ctx.scene.state.description = description;

        await editTag(ctx);
        await ctx.scene.leave();
    }
});

async function editTag(ctx) {
    try {
        const description = ctx.scene.state.description;
        const name = ctx.scene.state.tagName;

        clearAndSetActiveActionButtons(
            ctx,
            ctx.scene.state.lastMessageWithButtonsId,
            ctx.scene.state.lastMessageWithButtonsString,
            null
        );

        ctx.scene.state.messageIdToEdit = (
            await ctx.reply(
                '<i>Editing Tag...</i>',
                Telegraf.Extra.HTML().inReplyTo(
                    ctx.scene.state.userMessageToReply
                )
            )
        ).message_id;

        const res = await editTagOnServer(ctx.scene.state.tagId, {
            Name: name,
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
                ctx.session.user.tag,
                ctx.session.user.statusMessage
            ),
            extra.markdown()
        );
    } catch (error) {
        console.error(error);
        ctx.reply('A Server error occured');
    }
}

editTagScene.action('SKIP', async ctx => {
    if (!ctx.scene.state.editedName) {
        // Prompt for description edit
        clearAndSetActiveActionButtons(
            ctx,
            ctx.scene.state.lastMessageWithButtonsId,
            ctx.scene.state.lastMessageWithButtonsString,
            await ctx.replyWithMarkdown(
                promptNewDescriptionString(
                    ctx.scene.state.tagName,
                    ctx.scene.state.description
                ),
                Telegraf.Markup.inlineKeyboard([
                    Telegraf.Markup.callbackButton('Cancel', 'CANCEL'),
                    Telegraf.Markup.callbackButton('Skip', 'SKIP')
                ]).extra()
            )
        );

        ctx.scene.state.editedName = true;
    } else {
        await editTag(ctx);
        await ctx.scene.leave();
    }
});

module.exports = editTagScene;
