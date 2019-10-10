const Telegraf = require('telegraf');
const RedisSession = require('telegraf-session-redis');
const { REDIS_HOST, REDIS_PORT, REDIS_PWD } = require('../../config');

// From https://github.com/drvirtuozov/scrobblerBot
const session = new RedisSession({
    store: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        auth_pass: REDIS_PWD
    },
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
