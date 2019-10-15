// eslint-disable-next-line no-unused-vars
const Tag = require('../../Models/Tag');
const TagPostOperationValue = require('../../Models/TagPostOperationValue');

/**
 * Create the tag on the server
 * @param {Tag} userEnteredTagDetails
 * @returns {TagPostOperationValue}
 */

async function createTagOnServer(userEnteredTagDetails) {
    var tempReturnVal = TagPostOperationValue;
    tempReturnVal.tag = userEnteredTagDetails;
    tempReturnVal.status = true;
    tempReturnVal.statusMessage = 'Tag Added Successfully';

    return tempReturnVal;
}

module.exports = createTagOnServer;
