const TagPostSeverValue = require('../models/tagPostSeverValue');
const { canDelete } = require('../handlers/permissions');
const { returnSpecificTag } = require('./fetchTags');

/**
 * Delete the tag on the server
 * @param {string} tagName
 * @param {string} groupTgID
 * @param {string} userTgID
 * @param {string} userStatus
 * @returns {TagPostSeverValue}
 */

async function deleteTagOnServer(tagName, groupTgID, userTgID, userStatus) {
    const tag = await returnSpecificTag(groupTgID, tagName, userTgID);
    const permToDelete = canDelete(userTgID, userStatus, tag);

    const returnVal = TagPostSeverValue;
    returnVal.tag = tag;

    if (permToDelete) {
        // Delete tag and get back data
        returnVal.status = true;
        returnVal.statusMessage = 'Successfully Deleted Tag';
    } else {
        returnVal.status = false;
        returnVal.statusMessage =
            'Invalid Permissions. You must be the creator of the tag, or an admin, to delete it';
    }

    return returnVal;
}

module.exports = deleteTagOnServer;
