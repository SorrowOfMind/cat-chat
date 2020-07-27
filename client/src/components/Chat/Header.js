import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({username, chatroom}) => (
    <header className="chat-header">
        <h3 className="room">Room: {chatroom}</h3>
        <h5 className="name">You are chatting as: {username}</h5>
        <Link to="/">
            <div className="close" title="Leave chat">X</div>
        </Link>
    </header>
)

export default Header;
