const TagPostOperationValue = require('../../Models/TagPostOperationValue');

/**
 * Fetch and return an array of all the tags in the specified group
 * @param {string} groupTgID
 * @returns {Array<TagPostOperationValue>}
 */
async function returnAllTagsInGroup(groupTgID) {
    const returnVal = TagPostOperationValue;
    returnVal.tag = {
        Name: 'something',
        Description: 'something',
        CreationTimeStamp: Date.now().toString(),
        UpdateTimeStamp: Date.now().toString(),
        CreatorUserID: `userID`,
        GroupID: 'someoen'
    };
    returnVal.status = true;
    returnVal.statusMessage = 'Successfully Removed User';

    return [returnVal];
}

/**
 * Fetch and return an array of all the tags in the specified group, that have the specified user Telegram ID as a member
 * @param {string} groupTgID
 * @param {string} userTgID
 * @returns {Array<TagPostOperationValue>}
 */
async function returnAllTagMembershipsOf(groupTgID, userTgID) {
    const returnVal = TagPostOperationValue;
    returnVal.tag = {
        Name: 'something',
        Description: 'something',
        CreationTimeStamp: Date.now().toString(),
        UpdateTimeStamp: Date.now().toString(),
        CreatorUserID: `userID`,
        GroupID: 'someoen'
    };
    returnVal.status = true;
    returnVal.statusMessage = 'Successfully Removed User';

    return [returnVal];
}

/**
 * Fetch and return an array of all the tags in the specified group, that match the search term
 * @param {string} groupTgID
 * @param {string} searchTerm
 * @returns {Array<TagPostOperationValue>}
 */
async function returnAllTagsInGroupBySearch(groupTgID, searchTerm) {
    const returnVal = TagPostOperationValue;
    returnVal.tag = {
        Name: 'something',
        Description: 'something',
        CreationTimeStamp: Date.now().toString(),
        UpdateTimeStamp: Date.now().toString(),
        CreatorUserID: `userID`,
        GroupID: 'someoen'
    };
    returnVal.status = true;
    returnVal.statusMessage = 'Successfully Removed User';

    return [returnVal, returnVal];
}

/**
 * Return a specific tag
 * @param {string} groupTgID
 * @param {string} tagName
 *  @param {string} userTgID
 * @returns {TagPostOperationValue}
 */
async function returnSpecificTag(groupTgID, tagName) {
    const returnVal = TagPostOperationValue;
    returnVal.tag = {
        Name: 'something',
        Description: 'something',
        CreationTimeStamp: Date.now().toString(),
        UpdateTimeStamp: Date.now().toString(),
        CreatorUserID: `userID`,
        GroupID: 'someoen'
    };
    returnVal.status = true;
    returnVal.statusMessage = 'Successfully Removed User';

    return returnVal;
}

module.exports.returnAllTagsInGroup = returnAllTagsInGroup;
module.exports.returnAllTagMembershipsOf = returnAllTagMembershipsOf;
module.exports.returnAllTagsInGroupBySearch = returnAllTagsInGroupBySearch;
module.exports.returnSpecificTag = returnSpecificTag;
