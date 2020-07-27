import React, {useEffect, useContext, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import io from 'socket.io-client';

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
            setMsgs(prevMsgs => ([...prevMsgs, data]))
        })

    }, [msgs]);

    const handleChange = e => {
        const {value} = e.target;
        setMsg(value);
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13) sendMsg();
    }

    const sendMsg = e => {
        e.preventDefault();
        if (msg) {
            socket.emit('sendMsg', msg, () => setMsg(''))
        }
    }

    console.log('chat', msg, msgs);
    return (
        <div className="wrapper">
            <div>
                <input 
                    type="text" 
                    value={msg} 
                    onChange={handleChange} 
                    name="msg"
                    onKeyDown={handleKeyDown}
                    />
            </div>
        </div>
    )
}

export default Chat;
