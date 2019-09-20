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
 * @param {string} command
 * @param {string} input
 * @returns {string}
 */
function commandParser(command, input) {
    const filterOutBot = input.split(`${ command }@${ TelegramBotUsername }`);
    const filterOutCommand = filterOutBot[filterOutBot.length - 1].split(
        `${ command }`
    );

    const args = filterOutCommand[filterOutCommand.length - 1].trim();

    return args;
}

module.exports.isValidTagName = isValidTagName;
module.exports.commandParser = commandParser;
