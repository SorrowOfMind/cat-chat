import React, {useEffect, useContext, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

import Header from './Header';
import Input from './Input';

let socket;

const Chat = () => {
    const {user: {username, chatroom}} = useContext(UserContext);
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const endpoint = 'localhost:5000';

    useEffect(() => {
        socket = io.connect(endpoint);
        socket.emit('join', {username, chatroom}, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [endpoint, username, chatroom]);

    useEffect(() => {
        socket.on('msg', data => {
            setMsgs([...msgs, data])
        })
    }, [msgs]);

    const handleChange = e => {
        const {value} = e.target;
        setMsg(value);
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13) sendMsg(e);
    }

    const sendMsg = e => {
        e.preventDefault();
        if (msg) socket.emit('sendMsg', msg, () => setMsg(''))
    }

    console.log('chat', msg, msgs);
    return (
        <div className="chat-wrapper">
            <Header username={username} chatroom={chatroom} />
            <main className="chatbox">

            </main>
            <Input 
                msg={msg} 
                handleChange={handleChange} 
                handleKeyDown={handleKeyDown} 
                sendMsg={sendMsg}/>
        </div>
    )
}

export default Chat;
