const users = [];

const addUser = ({id, username, chatroom}) => {
    username = username.trim().toLowerCase();
    chatroom = chatroom.trim().toLowerCase();

    const userExists = users.find(user => user.username === username && user.chatroom === chatroom);
    if (userExists) return {error: 'Username is already taken'}

    const newUser = {id, username, chatroom}
    users.push(newUser);
    return {newUser}
};

const removeUser = id => {
    const userIdx = users.findIndex(user => user.id === id);
    if (userIdx !== -1) return users.splice(userIdx,1);
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = chatroom => users.filter(user => user.chatroom === chatroom);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};