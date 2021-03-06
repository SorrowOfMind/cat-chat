import React from 'react';
import ReactEmoji from 'react-emoji';

const Msg = ({message, username}) => {
    let isCurrentUser = false
    const formattedUsername = username.trim().toLowerCase();

    if (message.username === formattedUsername) isCurrentUser = true;
    return (isCurrentUser
        ? (
            <div className="msg-wrapper align-right">
                <p className="username">{message.username}</p>
                <div className="msg msg_color">
                    <p className="msg__text">{ReactEmoji.emojify(message.text)}</p>
                </div>
            </div>
        )
        : (
            <div className="msg-wrapper">
                <p className="username">{message.username}</p>
                <div className="msg">
                    <p className="msg__text">{ReactEmoji.emojify(message.text)}</p>
                </div>
            </div>
        ))
}

export default Msg;
