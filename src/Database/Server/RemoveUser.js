const TagPostOperationValue = require('../../Models/TagPostOperationValue');
const { getChatMemberByUsername } = require('./Membership');

/**
 * Remove a user from the specified tag
 * @param {string} tagName
 * @param {string} groupTgID
 * @param {string} username
 * @returns {TagPostOperationValue}
 */

async function RemoveUserOnServer(tagName, groupTgID, username) {
    const userID = (await getChatMemberByUsername(username)).UserID;

    const returnVal = TagPostOperationValue;
    returnVal.tag = {
        Name: 'something',
        Description: 'something',
        CreationTimeStamp: Date.now().toString(),
        UpdateTimeStamp: Date.now().toString(),
        CreatorUserID: userID,
        GroupID: 'someoen'
    };
    returnVal.status = true;
    returnVal.statusMessage = 'Successfully Removed User';

    return returnVal;
}

module.exports = RemoveUserOnServer;
