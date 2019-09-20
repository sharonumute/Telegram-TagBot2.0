const tagPostSeverValue = require('../models/tagPostSeverValue');
const { canDelete } = require('./permissions');
const { returnSpecificTag } = require('./fetchTags');

/**
 * Delete the tag on the server
 * @param {string} tagName
 * @param {string} groupTgID
 * @param {string} userTgID
 * @param {string} userStatus
 * @returns {tagPostSeverValue}
 */

async function deleteTagOnServer(tagName, groupTgID, userTgID, userStatus) {
    const tag = await returnSpecificTag(groupTgID, tagName, userTgID);
    const permToDelete = await canDelete(userTgID, userStatus, tag);

    console.log(userStatus);
    console.log(permToDelete);
    console.log(userTgID);
    console.log(tag.createdBy);

    const returnVal = tagPostSeverValue;
    returnVal.tag = tag;

    var status = false;
    var statusMessage = '';

    if (permToDelete) {
        // Delete tag and get back data
        status = true;
        statusMessage = 'Successfully Deleted Tag';
    } else {
        status = false;
        statusMessage =
            'Invalid Permissions. You must be the creator of the tag, or an admin, to delete it';
    }

    returnVal.status = status;
    returnVal.statusMessage = statusMessage;
    return returnVal;
}

module.exports = deleteTagOnServer;
