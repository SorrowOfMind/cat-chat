import React from 'react';

const Header = ({username, chatroom,handleClosing, users}) => {
    return (
    <header className="chat-header">
        <h3 className="room">Room: {chatroom}</h3>
        <h5 className="name">You are chatting as: {username}</h5>
        <h5 className="name">Active users: {users.length}</h5>
        <div className="close" title="Leave chat" onClick={handleClosing}>X</div>
    </header>
    )
}

export default Header;
