import {
    CHAT_MESSAGES,
} from '../constants'

let initialState = {
    chatMessages: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case CHAT_MESSAGES:
            return {
                ...state,
                chatMessages: action.data,
            };
        default:
            return state;
    }

}