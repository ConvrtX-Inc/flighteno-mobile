import {
    GET_CARDS,
    ADD_CARD,
    SET_DEFAULT_CARD,
    REMOVE_CARD
} from '../constants'

let initialState = {
    myCards: [],
    defaultCard: ''
};


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS:
            console.log('cards', action.data)
            return {
                ...state,
                myCards: action.data,
            };
        case ADD_CARD:
            const cards = state.myCards;
            cards.unshift(action.data)

            return {
                ...state,
                myCards: cards,
            };
        case SET_DEFAULT_CARD:
            return {
                ...state,
                defaultCard: action.data,
            };

        case REMOVE_CARD:
            return {
                ...state,
                myCards: state.myCards.filter((card) => card.id != action.data),
            };

        default:
            return state;
    }

}