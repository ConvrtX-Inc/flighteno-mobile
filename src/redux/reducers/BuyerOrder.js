import {
    CREATE_ORDER_DETAIL,
} from '../constants'

let initialState = {
    buyerOrderData: null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_DETAIL:
            return {
                ...state,
                buyerOrderData: action.data,
            };
        default:
            return state;
    }

}