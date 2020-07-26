const express = require('express');
const morgan = require('morgan');
const socket = require('socket.io');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const port = process.env.PORT || 5000;
const router = require('./routes/router')

const app = express();

const server = app.listen(port, () => console.log(`Running on port ${port}`));

app.use(morgan('dev'));
app.use(router);

const io = socket(server);

io.on('connection', socket => {
    socket.on('join', ({username, chatroom}, callback) => {
        const {error, newUser} = addUser({id: socket.id, username, chatroom});
    })
    socket.on('disconnect', () => {
        console.log('User just left');
    });
});

