// eslint-disable-next-line no-unused-vars
const Tag = require('../models/tag');

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

function postTagReplyFormatString(tagCreationPostDetails, statusMessage) {
    return `
*Tag Name:* ${ tagCreationPostDetails.tagName }
*Description:* ${ tagCreationPostDetails.description }
*Craeted On:* ${ tagCreationPostDetails.createdOn }
*Created By:* ${ tagCreationPostDetails.createdBy }
*Number of members:* ${ tagCreationPostDetails.membersCount }
*GroupID:* ${ tagCreationPostDetails.groupTgID }

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

module.exports.invalidTagNameString = invalidTagNameString;
module.exports.postTagReplyFormatString = postTagReplyFormatString;
module.exports.promptDescriptionString = promptDescriptionString;
