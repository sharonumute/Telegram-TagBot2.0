module.exports = async function(ctx, next) {
    var generalLog = `[Date: ${ ctx.date }]: [Name: ${ ctx.from.username }] [Group: ${ ctx.chat.username }] [Session: ${ ctx.session.__scenes.current }]`;

    switch (ctx.updateType) {
    case 'callback_query':
        console.log(generalLog);
        console.log(`${ ctx.callbackQuery.id }:  ${ ctx.callbackQuery.data }`);
        break;

    case 'inline_query':
        console.log(generalLog);
        console.log(`${ ctx.inlineQuery.id }:  ${ ctx.inlineQuery.query }`);
        break;

    case 'chosen_inline_result':
        console.log(generalLog);
        console.log(
            `${ ctx.chosenInlineResult.result_id }:  ${ ctx.chosenInlineResult.query }`
        );
        break;

    default:
        break;
    }

    return next(ctx);
};
