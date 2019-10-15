const dotenv = require('dotenv');
const path = require('path');
const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const Session = require('./src/Middleware/Session');
const Scenes = require('./src/Middleware/Scenes');
const Logger = require('./src/Middleware/Logger');
const Membership = require('./src/Middleware/Membership');
const { cancel } = require('./src/Handlers/Actions');
const consoleMenu = require('./src/Handlers/Console');

// Bot Setup
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const bot = new Telegraf(process.env.TelegramBotToken);
const composer = new Composer();

// Middleware
bot.use(composer);
bot.use(Session);
bot.use(Scenes);
bot.use(Logger);
bot.use(Membership);
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
