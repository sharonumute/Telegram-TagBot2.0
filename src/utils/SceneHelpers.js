const extra = require('telegraf/extra');

/**
 * Clear the Action buttons of the last massege with active action buttons
 * If there's a new message with active buttons, set the necessary variables to refer to it
 * @param {*} ctx
 * @param {*} lastMessageWithButtonsId
 * @param {*} lastMessageWithButtonsString
 * @param {*} newActiveButtons
 * @param {*} newString
 */
async function clearAndSetActiveActionButtons(
    ctx,
    lastMessageWithButtonsId,
    lastMessageWithButtonsString,
    newActiveButtons
) {
    await ctx.telegram.editMessageText(
        ctx.chat.id,
        lastMessageWithButtonsId,
        null,
        lastMessageWithButtonsString,
        extra.markdown()
    );

    if (newActiveButtons) {
        ctx.scene.state.lastMessageWithButtonsId = newActiveButtons.message_id;
        ctx.scene.state.lastMessageWithButtonsString = newActiveButtons.text;
    }
}

module.exports.clearAndSetActiveActionButtons = clearAndSetActiveActionButtons;
