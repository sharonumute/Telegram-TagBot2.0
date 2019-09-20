const inlineQueryResultArticle = require('../models/inlineQueryResultArticle');
const { returnAllTagsInGroupBySearch } = require('../server/fetchTags');

/**
 * Fetch and return an array of all the tags in the specified group
 * Return as an array on inline results
 * @param {string} inlineQuery
 * @param {string} groupTgID
 * @returns {Array<inlineQueryResultArticle>}
 */
async function returnAllTagsInGroupInline(inlineQuery, groupTgID) {
    var allTagsInGroup = await returnAllTagsInGroupBySearch(
        groupTgID,
        inlineQuery
    );
    var allTagsInGroupAsInlineResults = [];

    allTagsInGroup.forEach((tag, index) => {
        var inlineResult = inlineQueryResultArticle;
        inlineResult.id = index;
        inlineResult.title = tag.name;
        inlineResult.description = tag.description;
        inlineResult.message_text = `@${ tag.name }`;

        allTagsInGroupAsInlineResults.push(inlineResult);
    });

    return allTagsInGroupAsInlineResults;
}

module.exports = returnAllTagsInGroupInline;
