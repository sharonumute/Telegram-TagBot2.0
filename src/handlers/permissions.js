// eslint-disable-next-line no-unused-vars
const Tag = require('../Models/Tag');
const UserStatus = require('../Models/UserStatus');

/**
 * Check if the user can delete the tag
 * @param {string} userTgID
 * @param {string} userStatus
 * @param {Tag} tag
 * @returns {boolean}
 */
function canDelete(userTgID, userStatus, tag) {
    return (
        userTgID === tag.CreatorUserID ||
        userStatus === UserStatus.administrator ||
        userStatus === UserStatus.creator
    );
}

/**
 * Check if the user can remove a user from the tag
 * @param {string} userTgID
 * @param {string} userStatus
 * @param {Tag} tag
 * @param {string} userBeingRemovedTgId
 * @returns {boolean}
 */
function canRemove(userTgID, userStatus, tag, userBeingRemovedTgId) {
    return (
        userTgID === tag.CreatorUserID ||
        userStatus === UserStatus.administrator ||
        userStatus === UserStatus.creator ||
        userTgID === userBeingRemovedTgId
    );
}

/**
 * Check if the user can edit a tag
 * @param {string} userTgID
 * @param {string} userStatus
 * @param {Tag} tag
 * @returns {boolean}
 */
function canEdit(userTgID, userStatus, tag) {
    return (
        userTgID === tag.CreatorUserID ||
        userStatus === UserStatus.administrator ||
        userStatus === UserStatus.creator
    );
}

module.exports.canDelete = canDelete;
module.exports.canRemove = canRemove;
module.exports.canEdit = canEdit;
