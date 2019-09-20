const Tag = require('../models/tag');

/**
 * Fetch and return an array of all the tags in the specified group
 * @param {string} groupTgID
 * @returns {Array<Tag>}
 */
async function returnAllTagsInGroup(groupTgID) {
    var tempTag = Tag;
    tempTag.tagName = 'pizzaTag';
    tempTag.description = 'Pizza lovers';
    tempTag.createdBy = '123456';
    tempTag.createdOn = '2019-08-04';
    tempTag.membersCount = '5';
    tempTag.groupTgID = groupTgID;

    return [tempTag];
}

/**
 * Fetch and return an array of all the tags in the specified group, that have the specified user Telegram ID as a member
 * @param {string} groupTgID
 * @param {string} userTgID
 * @returns {Array<Tag>}
 */
async function returnAllTagMembershipsOf(groupTgID, userTgID) {
    var tempTag = Tag;
    tempTag.tagName = 'pizzaTag';
    tempTag.description = 'Pizza lovers';
    tempTag.createdBy = userTgID;
    tempTag.createdOn = '2019-08-04';
    tempTag.membersCount = '5';
    tempTag.groupTgID = groupTgID;
    return [tempTag];
}

/**
 * Fetch and return an array of all the tags in the specified group, that match the search term
 */
async function returnAllTagsInGroupBySearch(groupTgID, searchTerm) {
    var tempTag = Tag;
    tempTag.tagName = `${ searchTerm }pizzaTag`;
    tempTag.description = 'Pizza lovers';
    tempTag.createdBy = '123456';
    tempTag.createdOn = '2019-08-04';
    tempTag.membersCount = '5';
    tempTag.groupTgID = groupTgID;

    var tempTag2 = Tag;
    tempTag2.tagName = 'pizzaTag';
    tempTag2.description = `Pizza lovers ${ searchTerm }`;
    tempTag2.createdBy = '123456';
    tempTag2.createdOn = '2019-08-04';
    tempTag2.membersCount = '5';
    tempTag2.groupTgID = groupTgID;

    return [tempTag, tempTag2];
}

module.exports.returnAllTagsInGroup = returnAllTagsInGroup;
module.exports.returnAllTagMembershipsOf = returnAllTagMembershipsOf;
module.exports.returnAllTagsInGroupBySearch = returnAllTagsInGroupBySearch;
