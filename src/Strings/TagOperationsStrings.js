// eslint-disable-next-line no-unused-vars
const Tag = require('../Models/Tag');

/**
 * Return a message addressing an invalid tag
 * @param {string} tagName
 * @returns {string}
 */
function invalidTagNameString(tagName) {
    return `
*Invalid tag name*
Your tag name should be a single word and not contain special characters
You entered: ${ tagName }`;
}

/**
 * Return a message after tag creation
 * @param {Tag} tagCreationPostDetails
 * @param {string} statusMessage
 * @returns {string}
 */

function postTagEditReplyFormatString(tagCreationPostDetails, statusMessage) {
    return `
*Tag Name:* ${ tagCreationPostDetails.Name }
*Description:* ${ tagCreationPostDetails.Description }
*Created On:* ${ tagCreationPostDetails.CreationTimeStamp }
*Created By:* ${ tagCreationPostDetails.CreatorUserID }
*GroupID:* ${ tagCreationPostDetails.GroupID }

${ statusMessage }`;
}

/**
 * Prompt the user for a description
 * @param {string} tagName
 * @returns {string}
 */

function promptDescriptionString(tagName) {
    return `Now send a description for ${ tagName }`;
}

/**
 * Ask user to specify usernames
 * @returns {string}
 */

function pleaseSpecifyNamesString() {
    return `Please specify one or more usernames`;
}

/**
 * Message that shows if users failed to get added
 * @param {string} tagName
 * @returns {string}
 */

function failedToAddString(tagName) {
    return `Done. Some users failed to be added to ${ tagName }
Click the button below for more info`;
}

/**
 * Success on add
 * @param {string} tagName
 * @returns {string}
 */

function successOnAddString(tagName) {
    return `Done. Successfully added all users to ${ tagName }`;
}

/**
 * match user to message and return final string
 * @param {{}} map
 * @returns {string}
 */

function userMessageParse(map) {
    const finalMessage = [];

    for (const key in map) {
        const userMessage = `${ key }: ${ map[key] }`;
        finalMessage.push(userMessage);
    }

    return finalMessage.join('\n');
}

module.exports.invalidTagNameString = invalidTagNameString;
module.exports.postTagEditReplyFormatString = postTagEditReplyFormatString;
module.exports.promptDescriptionString = promptDescriptionString;
module.exports.pleaseSpecifyNamesString = pleaseSpecifyNamesString;
module.exports.failedToAddString = failedToAddString;
module.exports.successOnAddString = successOnAddString;
module.exports.userMessageParse = userMessageParse;
