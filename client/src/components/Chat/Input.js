import React from 'react';

const Input = ({msg, handleChange, handleKeyDown, sendMsg}) => {
    return (
        <footer className="input-box">
                <input 
                    type="text"
                    className="msg-input"
                    value={msg}
                    onChange={handleChange}
                    placeholder="type a message..."
                    name="msg"
                    onKeyDown={handleKeyDown}
                    />
                <button className="btn-send" onClick={sendMsg} >Send</button>
            </footer>
    )
}

export default Input;

