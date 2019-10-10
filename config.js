const path = require('path');
const dotenv = require('dotenv');

const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

// Bot Info
module.exports.TelegramBotUsername = process.env.TelegramBotUsername;
