/**
 * Return a help text for the bot
 */

function getHelpString() {
    return `
*Inline Features*:
Type @TgTagBot to perform and inline search of all your groups available tags. 

*General Commands:* 
/help - Show this dialog, a list of all available commands and their features 
/create - Create a new tag for the current group, with the tag name specified 
        ${ '`/create newTagName`' }
        A  prompt for a description of the tag will be asked
        Enter ${ '`/no`' }, to skip
        
/delete - Delete the tag name specified 
        ${ '`/delete existingTagName`' }

/edit - Edit the name or description of the specified tag name 
        ${ '`/edit existingTagName`' }
        A prompt for a new name will be asked
        Enter ${ '`/no`' }, to skip
        A prompt for a new description will be asked
        Enter ${ '`/no`' }, to skip

/add - Add the specified users to the specified tag 
        ${ '`/add existingTagName @sampleuser1 @anotheruser`' }

/remove - Remove the specified users from the specified tag 
        ${ '`/remove existingTagName @sampleuser1 @anotheruser`' }

/info - Show information about the specified tag including:
        - The tag name
        - The tag description
        - The creator of the tag and when it was created
        - Number of members in the tag

/all - Return a list of all tags in the current group. Showing the tag name and it's description
/allmy - Return a list of all tags, in the current group, that you are a member of
/console - Open a visual interface to interact with the bot instead
`;
}

module.exports = getHelpString;
