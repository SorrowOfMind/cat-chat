const express = require('express');
const morgan = require('morgan');
const socket = require('socket.io');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const app = express();

const port = process.env.PORT || 5000;
const router = require('./routes/router')

const server = app.listen(port,  () => console.log(`Running on port ${port}`));

app.use(morgan('dev'));
app.use(cors());
app.use(router);

const io = socket(server, {transports: ['websocket', 'polling'] });

io.on('connection', socket => {
    socket.on('join', ({username, chatroom}, callback) => {
        const {error, newUser} = addUser({id: socket.id, username, chatroom});
        if (error) return callback(error);
        socket.join(newUser.chatroom);

        socket.emit('msg', {username: 'catbot', text: `Hi ${newUser.username}. Welcome to chat room "${newUser.chatroom}".`});
        socket.broadcast.to(newUser.chatroom).emit('msg', {username: 'catbot', text: `${newUser.username} has joined the room.`})

        io.to(newUser.chatroom).emit('roomUsers', {chatroom: newUser.chatroom, users: getUsersInRoom(newUser.chatroom)})

        callback();
    });

    socket.on('sendMsg', (data, callback) => {
        const user = getUser(socket.id);
        io.to(user.chatroom).emit('msg', {username: user.username, text: data});

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.chatroom).emit('msg', {username: 'catbot', text: `${user.username} has left.`})
            io.to(user.chatroom).emit('roomUsers',{chatroom: user.chatroom, users: getUsersInRoom(user.chatroom)})
        }
    });
});

