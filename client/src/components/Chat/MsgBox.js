import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Msg from './Msg';

const MsgBox = ({msgs, username}) => {
    return (
        <ScrollToBottom className="chatbox">
            {msgs.map((message, idx) => <div key={idx}><Msg message={message} username={username} /></div>)}
        </ScrollToBottom>
    )
}

export default MsgBox;
