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
 * Prompt the user for a new name for the tag
 * @param {string} tagName
 * @returns {string}
 */

function promptNewNameString(tagName) {
    return `Send a new name for the tag "${ tagName }"`;
}

/**
 * Prompt the user for a new description
 * @param {string} tagName
 * @param {string} description
 * @returns {string}
 */

function promptNewDescriptionString(tagName, description) {
    return `
Send a new description for "${ tagName }"

Old description: ${ description }`;
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

function failedToRemoveString(tagName) {
    return `Done. Some users failed to be removed from ${ tagName }
Click the button below for more info`;
}

/**
 * Success on adding users to a tag
 * @param {string} tagName
 * @returns {string}
 */

function successOnAddString(tagName) {
    return `Done. Successfully added all users to ${ tagName }`;
}

/**
 * Success on removing users from a tag
 * @param {string} tagName
 * @returns {string}
 */
function successOnRemoveString(tagName) {
    return `Done. Successfully removed specified users from ${ tagName }`;
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

/**
 * Trying to access a tag that does not exist
 */
function nonexistantTagNameString() {
    return `This tag does not exist.`;
}

module.exports.promptNewNameString = promptNewNameString;
module.exports.nonexistantTagNameString = nonexistantTagNameString;
module.exports.invalidTagNameString = invalidTagNameString;
module.exports.postTagEditReplyFormatString = postTagEditReplyFormatString;
module.exports.promptDescriptionString = promptDescriptionString;
module.exports.pleaseSpecifyNamesString = pleaseSpecifyNamesString;
module.exports.failedToAddString = failedToAddString;
module.exports.failedToRemoveString = failedToRemoveString;
module.exports.successOnAddString = successOnAddString;
module.exports.successOnRemoveString = successOnRemoveString;
module.exports.userMessageParse = userMessageParse;
module.exports.promptNewDescriptionString = promptNewDescriptionString;
