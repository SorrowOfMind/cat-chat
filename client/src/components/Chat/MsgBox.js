import React from 'react';
// import ScrollToBottom from 'react-scroll-to-bottom';

import Msg from './Msg';

const MsgBox = ({msgs, username}, ref) => {
    return (
        <div className="chatbox" ref={ref}>
            {msgs.map((message, idx) => <div key={idx}><Msg message={message} username={username} /></div>)}
        </div>
    )
}

const forwardedMsgBox = React.forwardRef(MsgBox);
export default forwardedMsgBox;
