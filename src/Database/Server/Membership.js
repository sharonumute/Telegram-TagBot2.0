const Member = require('../../Models/Member');

/**
 * Returns all the members of a chat from the cache
 * @param {string} groupID
 * @returns {Array<User>}
 */
async function getChatMembers(groupID) {
    const groupExists = true;

    if (!groupExists) {
        return null;
    }

    const chatMember = Member;
    chatMember.UserID = '635831636';
    chatMember.GroupID = groupID;
    return [chatMember];
}

/**
 * Creates a new entry in User-Group table
 * @param {string} groupID
 * @param {string} userID
 * @returns {Array<User>}
 */
async function createChatMembersEntry(groupID, userID) {
    const chatMember = Member;
    chatMember.GroupID = groupID;
    chatMember.UserID = userID;
    return [chatMember];
}

/**
 * Add a new membership
 * @param {string} groupID
 * @param {string} userID
 * @param {string} username
 * @returns {User}
 */
async function addChatMember(groupID, userID, username) {
    // If not member
    // Check if user exists
    // Add user
    // Add member

    const chatMember = Member;
    chatMember.GroupID = groupID;
    chatMember.UserID = userID;
    return [chatMember];
}

/**
 * Get Chat member by username
 * @param {string} username
 * @returns {User}
 */
async function getChatMemberByUsername(username) {
    // Search in users
    const chatMember = Member;
    chatMember.GroupID = 'dddjddkd';
    chatMember.UserID = '635831636';
    return [chatMember];
}

module.exports.getChatMembers = getChatMembers;
module.exports.createChatMembersEntry = createChatMembersEntry;
module.exports.addChatMember = addChatMember;
module.exports.getChatMemberByUsername = getChatMemberByUsername;
