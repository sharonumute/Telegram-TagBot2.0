const InlineQueryResultArticle = require('../Models/InlineQueryResultArticle');
const {
    returnAllTagsInGroupBySearch
} = require('../Database/Server/FetchTags');

/**
 * Fetch and return an array of all the tags in the specified group
 * Return as an array on inline results
 * @param {string} inlineQuery
 * @param {string} groupTgID
 * @returns {Array<InlineQueryResultArticle>}
 */
async function returnAllTagsInGroupInline(inlineQuery, groupTgID) {
    var allTagsInGroup = await returnAllTagsInGroupBySearch(
        groupTgID,
        inlineQuery
    );
    var allTagsInGroupAsInlineResults = [];

    allTagsInGroup.forEach((tag, index) => {
        var inlineResult = InlineQueryResultArticle;
        inlineResult.id = index;
        inlineResult.title = tag.Name;
        inlineResult.description = tag.Description;
        inlineResult.message_text = `@${ tag.Name }`;

        allTagsInGroupAsInlineResults.push(inlineResult);
    });

    return allTagsInGroupAsInlineResults;
}

module.exports = returnAllTagsInGroupInline;
