const Telegraf = require('telegraf');
const LocalSession = require('telegraf-session-local');

// From https://github.com/drvirtuozov/scrobblerBot
const session = new LocalSession({
    database: 'session_database.json',
    getSessionKey(ctx) {
        return `${ ctx.from.id }${ ctx.chat.id }`;
    }
});

// This is a wrapper for a session middleware to store updated session data after throwing an error
module.exports = Telegraf.compose([
    async (ctx, next) => {
        // wait for the session function
        await next();

        // if there's an error throw it for the error middleware to catch it
        if (ctx.state.error) {
            throw ctx.state.error;
        }
    },
    session.middleware(),
    async (ctx, next) => {
        // setting default session state
        if (ctx.session && !ctx.session.state) {
            ctx.session.state = {};
        }

        try {
            await next();
        } catch (e) {
            ctx.state.error = e;
        }
    }
]);
