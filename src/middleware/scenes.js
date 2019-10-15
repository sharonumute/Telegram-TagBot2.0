const Stage = require('telegraf/stage');
const createTagScene = require('../Scenes/CreateTagScene');
const deleteTagScene = require('../Scenes/DeleteTagScene');
const addUserScene = require('../Scenes/AddUserScene');
const helpString = require('../Strings/HelpStrings');
const { TelegramBotUsername } = require('../../config');
const returnAllTagsInGroupInline = require('../Handlers/InlineQuery');

const stage = new Stage();

stage.command('start', async (ctx, next) => {
    if (ctx.session.user) {
        await next();
    }
});

stage.on('inline_query', async ctx => {
    const result = await returnAllTagsInGroupInline(
        ctx.inlineQuery.query,
        ctx.inlineQuery.from.id
    );

    await ctx.answerInlineQuery(result);
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

stage.command('add', ctx => ctx.scene.enter('add_user'));
stage.command(`add@${ TelegramBotUsername }`, ctx => ctx.scene.enter('add_user'));

stage.register(createTagScene);
stage.register(deleteTagScene);
stage.register(addUserScene);

module.exports = stage.middleware();
