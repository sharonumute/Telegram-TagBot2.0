const path = require('path');
const dotenv = require('dotenv');

const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

// Redis Cache Info
module.exports.REDIS_HOST = process.env.RedisHost;
module.exports.REDIS_PORT = process.env.RedisPort;
module.exports.REDIS_PWD = process.env.RedisPwd;

// Bot Info
module.exports.TelegramBotUsername = process.env.TelegramBotUsername;
