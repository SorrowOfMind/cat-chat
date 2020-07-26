import React, {useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import io from 'socket.io-client';

let socket;

const Chat = () => {
    const {user: {username, chatroom}} = useContext(UserContext);
    const endpoint = 'localhost:5000'
    useEffect(() => {
        socket = io.connect(endpoint);
        socket.emit('join', {username, chatroom}, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [endpoint, username, chatroom])
    return (
        <div>
            
        </div>
    )
}

export default Chat
