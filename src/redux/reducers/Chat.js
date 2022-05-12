import {
    CHAT_MESSAGES,
    UPDATE_CHATS
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
        case UPDATE_CHATS:
            const chats = state.chatMessages;  
            const chatHistoryIndex = chats.findIndex((c) => c._id == action.data.chat_id);
            chats[chatHistoryIndex].messages.unshift(action.data)

            var sortedData = chats.sort(function (a, b) {
                return new Date(b.messages[0]?.currentMessage.createdAt) - new Date(a.messages[0]?.currentMessage.createdAt);
            });
         
            return {
                ...state,
                chatMessages:sortedData,
            };

        default:
            return state;
    }

}