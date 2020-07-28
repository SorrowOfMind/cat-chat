import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Link} from 'react-router-dom';

const Header = ({username, chatroom}) => {
    const {dispatch} = useContext(UserContext);
    const handleClosing = () => dispatch({type: 'CLEAR_DATA'})
    return (
    <header className="chat-header">
        <h3 className="room">Room: {chatroom}</h3>
        <h5 className="name">You are chatting as: {username}</h5>
        <Link to="/"><div className="close" title="Leave chat" onClick={handleClosing}>X</div></Link>
    </header>
    )
}

export default Header;
