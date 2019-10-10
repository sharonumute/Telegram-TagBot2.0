const { TelegramBotUsername } = require('../../config');

/**
 * Determine if input is a valid tag name string
 * @param {string} input
 * @returns {boolean}
 */
function isValidTagName(input) {
    if (input === null || input === undefined) {
        return false;
    }

    const isSingleWord = input.trim().split(/\s+/).length === 1;
    const doesntContainsSymbols = /^[A-Za-z0-9 ]+$/.test(input);

    return isSingleWord && doesntContainsSymbols;
}

/**
 * Parses comman input and returns only the arguments
 * @param {string} input
 * @param {Array<{}>} entities
 * @returns {{command:string, first_word:string, mentions:[]}}
 */
function inputParser(input, entities) {
    const output = {
        command: '',
        first_word: '',
        mentions: []
    };
    for (var index in entities) {
        const entity = entities[index];
        switch (entity.type) {
        case 'bot_command':
            output.command = input.substring(
                entity.offset,
                entity.offset + entity.length
            );
            output.first_word = input
                .substring(entity.offset + entity.length + 1)
                .split(' ')[0]
                .trim();
            break;
        case 'mention':
            const mention = input.substring(
                entity.offset,
                entity.offset + entity.length
            );
            if (mention !== output.first_word) {
                output.mentions.push(mention);
            }

            break;
        default:
            break;
        }
    }

    return output;
}

module.exports.isValidTagName = isValidTagName;
module.exports.inputParser = inputParser;
