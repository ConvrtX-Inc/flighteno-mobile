import {
    GET_BANK_ACCOUNTS,
    ADD_BANK_ACCOUNT,
    REMOVE_BANK_ACCOUNT
} from '../constants'

let initialState = {
    myBankAccounts: [],
};


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BANK_ACCOUNTS:
            console.log('bank accounts::', action.data)
            return {
                ...state,
                myBankAccounts: action.data,
            };
        case ADD_BANK_ACCOUNT:
            const bankAccounts = state.myBankAccounts;
            bankAccounts.unshift(action.data)

            return {
                ...state,
                myBankAccounts: bankAccounts,
            };
        
        case REMOVE_BANK_ACCOUNT:
            return {
                ...state,
                myBankAccounts: state.myBankAccounts.filter((bank) => bank.id != action.data),
            };

        default:
            return state;
    }

}