const Stage = require('telegraf/stage');
const createTagScene = require('../scenes/createTagScene');
const deleteTagScene = require('../scenes/deleteTagScene');
const helpString = require('../strings/helpString');
const { TelegramBotUsername } = require('../../config');

const stage = new Stage();

stage.command('start', async (ctx, next) => {
    if (ctx.session.user) {
        await next();
    }
});

stage.command('help', ctx => ctx.replyWithMarkdown(helpString()));

stage.command('create', ctx => ctx.scene.enter('create_tag'));
stage.command(`create@${ TelegramBotUsername }`, ctx =>
    ctx.scene.enter('create_tag')
);

stage.command('delete', ctx => ctx.scene.enter('delete_tag'));
stage.command(`delete@${ TelegramBotUsername }`, ctx =>
    ctx.scene.enter('delete_tag')
);

stage.register(createTagScene);
stage.register(deleteTagScene);

module.exports = stage.middleware();
