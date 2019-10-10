const dotenv = require('dotenv');
const path = require('path');
const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const session = require('./src/middleware/session');
const scenes = require('./src/middleware/scenes');
const logger = require('./src/middleware/logger');
const { cancel } = require('./src/handlers/actions');
const manageChatMembers = require('./src/middleware/manageChatMembers');
const consoleMenu = require('./src/handlers/console');

// Bot Setup
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const bot = new Telegraf(process.env.TelegramBotToken);
const composer = new Composer();

// Middleware
bot.use(composer);
bot.use(session);
bot.use(scenes);
bot.use(logger);
bot.use(manageChatMembers);
bot.use(consoleMenu.init());

// Actions
bot.action('CANCEL', ctx => cancel(ctx));
bot.action('PM_INFO', ctx => {
    bot.telegram.sendMessage(ctx.from.id, ctx.session.pmMessage);
    console.log(ctx.session.pmMessage);
});

// Error Handling
bot.catch(e => {
    console.log(e);
});

// Start
bot.startPolling();
