const initialState = {
    username: '',
    chatroom: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_UP':
            const {username, chatroom} = action.payload;
            console.log('reducer', action.payload);
            return {
                username,
                chatroom
            }
        default:
            return state;
    }
}