import React, {useEffect, useContext, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import io from 'socket.io-client';

import Header from './Header';
import Input from './Input';
import MsgBox from './MsgBox';

let socket;

const Chat = () => {
    const {user: {username, chatroom}, dispatch} = useContext(UserContext);
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const endpoint = 'localhost:5000';

    useEffect(() => {
        if (!username || !chatroom) return window.location.replace('/');
        socket = io.connect(endpoint);
        socket.emit('join', {username, chatroom}, err => {
            if (err) alert(err)
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
            dispatch({type: 'CLEAR_DATA'})
        };
    }, [endpoint, username, chatroom]);

    useEffect(() => {
        socket.on('msg', data => setMsgs([...msgs, data]))
    }, [msgs]);


    const handleChange = e => {
        const {value} = e.target;
        setMsg(value);
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13) sendMsg(e);
    }

    const handleClosing = () => {
        window.location.replace('/')
    }

    const sendMsg = e => {
        e.preventDefault();
        if (msg) socket.emit('sendMsg', msg, () => setMsg(''))
    }

    return (
        <div className="chat-wrapper">
            <Header username={username} chatroom={chatroom} socket={socket} handleClosing={handleClosing}/>
            <MsgBox msgs={msgs} username={username}/>
            <Input 
                msg={msg} 
                handleChange={handleChange} 
                handleKeyDown={handleKeyDown} 
                sendMsg={sendMsg}/>
        </div>
    )
}

export default Chat;
