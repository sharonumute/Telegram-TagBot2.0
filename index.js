const dotenv = require('dotenv');
const path = require('path');
const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const session = require('./src/middleware/session');
const scenes = require('./src/middleware/scenes');
const { cancel } = require('./src/handlers/actions');
const returnAllTagsInGroupInline = require('./src/handlers/inlineQuery');
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
bot.use(consoleMenu.init());

// None-Staged Commands and Features
composer.on('inline_query', async ctx => {
    const result = await returnAllTagsInGroupInline(
        ctx.message.text,
        ctx.chat.id
    );
    ctx.answerInlineQuery(result);
});

composer.command('delete', ({ reply }) => reply('Yo'));
composer.command('edit', ({ reply }) => reply('Yo'));
composer.command('add', ({ reply }) => reply('Yo'));
composer.command('remove', ({ reply }) => reply('Yo'));
composer.command('info', ({ reply }) => reply('Yo'));
composer.command('all', ({ reply }) => reply('Yo'));
composer.command('allmy', ({ reply }) => reply('Yo'));

// Actions
bot.action('CANCEL', ctx => cancel(ctx));

// Start
bot.startPolling();
