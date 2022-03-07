import {
    GET_CARDS,
    ADD_CARD
} from '../constants'

let initialState = {
    myCards: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS:
            console.log('cards',action.data)
            return {
                ...state,
                myCards: action.data,
            };
        case ADD_CARD:
            const cards = state.myCards;  
            cards.unshift(action.data)

            return {
                ...state,
                myCards:cards,
            };

        default:
            return state;
    }

}