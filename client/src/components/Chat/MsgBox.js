import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Msg from './Msg';

const MsgBox = ({msgs, username}) => {
    console.log('msgBox', msgs, username);
    return (
        <ScrollToBottom>
        <main className="chatbox">{msgs.map((message, idx) => <div key={idx}><Msg message={message} username={username} /></div>)}</main>
        </ScrollToBottom>
    )
}

export default MsgBox;
