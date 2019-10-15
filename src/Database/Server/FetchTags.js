const Tag = require('../../Models/Tag');

/**
 * Fetch and return an array of all the tags in the specified group
 * @param {string} groupTgID
 * @returns {Array<Tag>}
 */
async function returnAllTagsInGroup(groupTgID) {
    var tempTag = Tag;
    tempTag.Name = 'pizzaTag';
    tempTag.Description = 'Pizza lovers';
    tempTag.CreatorUserID = '123456';
    tempTag.CreationTimeStamp = '2019-08-04';
    tempTag.GroupID = groupTgID;

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
    tempTag.Name = 'pizzaTag';
    tempTag.Description = 'Pizza lovers';
    tempTag.CreatorUserID = userTgID;
    tempTag.CreationTimeStamp = '2019-08-04';
    tempTag.GroupID = groupTgID;
    return [tempTag];
}

/**
 * Fetch and return an array of all the tags in the specified group, that match the search term
 * @param {string} groupTgID
 * @param {string} searchTerm
 * @returns {Array<Tag>}
 */
async function returnAllTagsInGroupBySearch(groupTgID, searchTerm) {
    var tempTag = Tag;
    tempTag.Name = `${ searchTerm }pizzaTag`;
    tempTag.Description = 'Pizza lovers';
    tempTag.CreatorUserID = '123456';
    tempTag.CreationTimeStamp = '2019-08-04';
    tempTag.GroupID = groupTgID;

    var tempTag2 = Tag;
    tempTag2.Name = 'pizzaTag';
    tempTag2.Description = `Pizza lovers ${ searchTerm }`;
    tempTag2.CreatorUserID = '123456';
    tempTag2.CreationTimeStamp = '2019-08-04';
    tempTag2.GroupID = groupTgID;

    return [tempTag, tempTag2];
}

/**
 * Return a specific tag
 * @param {string} groupTgID
 * @param {string} tagName
 *  @param {string} userTgID
 * @returns {Tag}
 *
 * TODO: Remove userTgID
 */
async function returnSpecificTag(groupTgID, tagName, userTgID) {
    var tempTag = Tag;
    tempTag.Name = tagName;
    tempTag.Description = 'Arbitrary description';
    tempTag.CreatorUserID = userTgID;
    tempTag.CreationTimeStamp = Date.now().toString();
    tempTag.GroupID = groupTgID;

    return tempTag;
}

module.exports.returnAllTagsInGroup = returnAllTagsInGroup;
module.exports.returnAllTagMembershipsOf = returnAllTagMembershipsOf;
module.exports.returnAllTagsInGroupBySearch = returnAllTagsInGroupBySearch;
module.exports.returnSpecificTag = returnSpecificTag;
