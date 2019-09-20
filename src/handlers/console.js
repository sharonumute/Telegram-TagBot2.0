const TelegrafInlineMenu = require('telegraf-inline-menu');
const Markup = require('telegraf/markup');
const botHelp = require('../strings/helpString');

const backButton = {
    doFunc: () => {},
    setParentMenuAfter: true
};

const closeScreen = new TelegrafInlineMenu('Good-bye!');
const mainMenu = new TelegrafInlineMenu(
    ctx => `
Hi! Welcome to TagBot2.0
"${ ctx.chat.title }" currently has ${ 20 } tags.
What would you like to do?
`
);
mainMenu.setCommand('console');

const createScreen = new TelegrafInlineMenu('Create Screen');
mainMenu.submenu('Create New', 'create', createScreen);
createScreen.button('Back', 'back', backButton);
createScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

const deleteScreen = new TelegrafInlineMenu('Delete Screen');
mainMenu.submenu('Delete Existing', 'del', deleteScreen, { joinLastRow: true });
deleteScreen.button('Back', 'back', backButton);
deleteScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

const editScreen = new TelegrafInlineMenu('Edit Screen');
mainMenu.submenu('Edit a Tag', 'edit', editScreen, { joinLastRow: true });
editScreen.button('Back', 'back', backButton);
editScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

const addScreen = new TelegrafInlineMenu('Add Screen');
mainMenu.submenu('Add To', 'add', addScreen);
addScreen.button('Back', 'back', backButton);
addScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

const removeScreen = new TelegrafInlineMenu('Remove Screen');
mainMenu.submenu('Remove From', 'rem', removeScreen, { joinLastRow: true });
removeScreen.button('Back', 'back', backButton);
removeScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

const infoScreen = new TelegrafInlineMenu('Info Screen');
mainMenu.submenu('Info On', 'info', infoScreen, { joinLastRow: true });
infoScreen.button('Back', 'back', backButton);
infoScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

const allScreen = new TelegrafInlineMenu('All Screen');
mainMenu.submenu('All Tags', 'all', allScreen);
allScreen.button('Back', 'back', backButton);
allScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

const allYoursScreen = new TelegrafInlineMenu('All Yours Screen');
mainMenu.submenu('All Your Tags', 'allyou', allYoursScreen, {
    joinLastRow: true
});
allYoursScreen.button('Back', 'back', backButton);
allYoursScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

mainMenu.simpleButton('Tag Keyboard', 'keyboard', {
    doFunc: ctx =>
        ctx.reply(
            'Hi!',
            Markup.inlineKeyboard([
                Markup.callbackButton('text', 'my-callback-data')
            ])
        )
});

const helpScreen = new TelegrafInlineMenu(botHelp());
mainMenu.submenu('Help', 'help', helpScreen, { joinLastRow: true });
helpScreen.button('Back', 'back', backButton);
helpScreen.submenu('Close', 'close', closeScreen, { joinLastRow: true });

mainMenu.submenu('Close', 'close', closeScreen, { joinLastRow: true });

module.exports = mainMenu;
