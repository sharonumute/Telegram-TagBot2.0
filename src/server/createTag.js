// eslint-disable-next-line no-unused-vars
const Tag = require('../models/tag');
const tagPostSeverValue = require('../models/tagPostSeverValue');

/**
 * Create the tag on the server
 * @param {Tag} userEnteredTagDetails
 * @returns {tagPostSeverValue}
 */

async function createTagOnServer(userEnteredTagDetails) {
    var tempReturnVal = tagPostSeverValue;
    tempReturnVal.tag = userEnteredTagDetails;
    tempReturnVal.status = true;
    tempReturnVal.statusMessage = 'Tag Added Successfully';

    return tempReturnVal;
}

module.exports = createTagOnServer;
