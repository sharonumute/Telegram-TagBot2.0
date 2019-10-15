const {
    getChatMembers,
    addChatMember,
    createChatMembersEntry,
    getChatMemberByUsername
} = require('../Database/Server/Membership');

module.exports = async function(ctx, next) {
    const chatMembers = await getChatMembers(ctx.chat.id);

    if (chatMembers === null) {
        await createChatMembersEntry(ctx.chat.id, ctx.from.id);
    }

    const currentChatMember = await ctx.getChatMember(ctx.from.id);
    if (!currentChatMember) {
        return next(ctx);
    }

    await addChatMember(ctx.chat.id, ctx.from.id, ctx.from.username);

    ctx.getChatMembers = getChatMembers;
    ctx.getChatMemberByUsername = getChatMemberByUsername;

    return next(ctx);
};
