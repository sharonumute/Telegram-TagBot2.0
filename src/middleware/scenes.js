const Stage = require('telegraf/stage');
const createTagScene = require('../scenes/createTagScene');
const helpString = require('../strings/helpString');

const stage = new Stage();

stage.command('start', async (ctx, next) => {
    if (ctx.session.user) {
        await next();
    }
});

stage.command('help', ctx => ctx.replyWithMarkdown(helpString()));

stage.command('create', ctx => ctx.scene.enter('create_tag'));
stage.command(`create@TgTagBot`, ctx => ctx.scene.enter('create_tag'));

stage.register(createTagScene);

module.exports = stage.middleware();
