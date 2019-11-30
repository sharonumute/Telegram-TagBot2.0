const TagPostOperationValue = require('../../Models/TagPostOperationValue');

/**
 * Edit the details or name of a specified tag
 * @param {string} tagID
 * @param {Tag} userEnteredTagDetails
 * @returns {TagPostOperationValue}
 */

async function EditTagOnServer(tagID, userEnteredTagDetails) {
    const returnVal = TagPostOperationValue;
    returnVal.tag = userEnteredTagDetails;
    returnVal.status = true;
    returnVal.statusMessage = 'Successfully Edited tag';

    return returnVal;
}

module.exports = EditTagOnServer;
