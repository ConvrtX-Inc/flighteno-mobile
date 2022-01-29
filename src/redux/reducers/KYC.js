import { VERIFY_KYC } from "../constants";

let initialState = {
    
};


export default (state = initialState, action) => {
    switch (action.type) {

        case VERIFY_KYC:
            return {
                ...state
            }
        default:
            return state;
    }

}