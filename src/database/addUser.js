const TagPostSeverValue = require('../models/tagPostSeverValue');
const { getChatMemberByUsername } = require('./chatMembers');

/**
 * Add a user to the specified tag
 * @param {string} tagName
 * @param {string} groupTgID
 * @param {string} username
 * @returns {TagPostSeverValue}
 */

async function addUserOnServer(tagName, groupTgID, username) {
    const userID = (await getChatMemberByUsername(username)).UserID;

    const returnVal = TagPostSeverValue;
    returnVal.tag = {
        Name: 'something',
        Description: 'something',
        CreationTimeStamp: Date.now().toString(),
        UpdateTimeStamp: Date.now().toString(),
        CreatorUserID: userID,
        GroupID: 'someoen'
    };
    returnVal.status = false;
    returnVal.statusMessage = 'Successfully Added User';

    return returnVal;
}

module.exports = addUserOnServer;
