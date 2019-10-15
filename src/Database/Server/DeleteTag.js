const TagPostOperationValue = require('../../Models/TagPostOperationValue');
const { canDelete } = require('../../Handlers/Permissions');
const { returnSpecificTag } = require('./FetchTags');

/**
 * Delete the tag on the server
 * @param {string} tagName
 * @param {string} groupTgID
 * @param {string} userTgID
 * @param {string} userStatus
 * @returns {TagPostOperationValue}
 */

async function deleteTagOnServer(tagName, groupTgID, userTgID, userStatus) {
    const tag = await returnSpecificTag(groupTgID, tagName, userTgID);
    const permToDelete = canDelete(userTgID, userStatus, tag);

    const returnVal = TagPostOperationValue;
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
