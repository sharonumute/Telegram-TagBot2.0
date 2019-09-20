module.exports.cancel = async function cancel(ctx) {
    await ctx.scene.leave();
    await ctx.editMessageText('Canceled');
};
