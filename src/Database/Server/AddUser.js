const TagPostOperationValue = require('../../Models/TagPostOperationValue');
const { getChatMemberByUsername } = require('./Membership');

/**
 * Add a user to the specified tag
 * @param {string} tagName
 * @param {string} groupTgID
 * @param {string} username
 * @returns {TagPostOperationValue}
 */

async function AddUserOnServer(tagName, groupTgID, username) {
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
    returnVal.status = false;
    returnVal.statusMessage = 'Successfully Added User';

    return returnVal;
}

module.exports = AddUserOnServer;
