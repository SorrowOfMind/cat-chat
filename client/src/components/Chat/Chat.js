import React, {useEffect, useContext, useState, useRef} from 'react';
import {UserContext} from '../../contexts/UserContext';
import io from 'socket.io-client';

import Header from './Header';
import Input from './Input';
import MsgBox from './MsgBox';

let socket;
const endpoint = 'localhost:5000';

const Chat = () => {
    const {user: {username, chatroom}, dispatch} = useContext(UserContext);
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [users, setUsers] = useState([]);

    const chatboxRef = useRef(null);

    useEffect(() => {
        socket = io.connect(endpoint, { transports: ['websocket', 'polling'] });
    }, [])

    useEffect(() => {
        if (!username || !chatroom) return window.location.replace('/');
        socket.emit('join', {username, chatroom}, err => {
            if (err) alert(err)
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
            dispatch({type: 'CLEAR_DATA'})
        };
    }, [username, chatroom]);

    useEffect(() => {
        socket.on('msg', data => setMsgs([...msgs, data]))
        socket.on('roomUsers', ({users}) => setUsers(users))
        scrollToBottom();
    }, [msgs, users]);


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

    const scrollToBottom = () => {
        const scroll = chatboxRef.current.scrollHeight -  chatboxRef.current.clientHeight;
        chatboxRef.current.scrollTo(0, scroll);
    }

    return (
        <div className="chat-wrapper">
            <Header username={username} chatroom={chatroom} socket={socket} handleClosing={handleClosing} users={users}/>
            <MsgBox msgs={msgs} username={username} ref={chatboxRef}/>
            <Input 
                msg={msg} 
                handleChange={handleChange} 
                handleKeyDown={handleKeyDown} 
                sendMsg={sendMsg}/>
        </div>
    )
}

export default Chat;
