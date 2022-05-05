import {
    REGISTER_USER,
    LOGIN_ACTION,
    LOGIN_DATA,
    IS_LOADING,
    CURRENT_COUNTRY,
    LOGOUT,
    CURRENT_PROFILE,
    IS_LOADING_FACEBOOK,
    IS_LOADING_GOOGLE,
    FIRST_LAUNCH,
    NOTIFICATION_LIST,
    SUPPORT_TICKETS,
    UPDATE_CUSTOMER_ID,
    UPDATE_ACCOUNT_ID
} from '../constants'

let initialState = {
    loading: false,
    resetLoading:true,
    loadingResend: false,
    data: {},
    token: '',
    currentUser: null,
    verificationCode: null,
    userSignupDetail: null,
    currentCountry: null,
    currentProfile: null,
    loadingFacebook: false,
    loadingGoogle: false,
    firstLaunch: 0,
    notificationsData: [],
    supportTickets: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FIRST_LAUNCH:
            return {
                ...state,
                firstLaunch: action.data,
            };
        case REGISTER_USER:
            return {
                ...state,
                currentUser: action.data,
            };
        case CURRENT_COUNTRY:
            return {
                ...state,
                currentCountry: action.data,
            };
        case LOGIN_ACTION:
            return {
                ...state,
                token: action.data,
            };
        case LOGIN_DATA:
            return {
                ...state,
                currentUser: action.data,
            };
        case IS_LOADING:
            return {
                ...state,
                loading: action.isloading,
            };

        case LOGOUT:
            return {
                ...state,
                currentUser: action.data,
                token: ''
            };

        case CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: action.data,
            };

        case IS_LOADING_FACEBOOK:
            return {
                ...state,
                loadingFacebook: action.isloading,
            };

        case IS_LOADING_GOOGLE:
            return {
                ...state,
                loadingGoogle: action.isloading,
            };
        case NOTIFICATION_LIST:
            return {
                ...state,
                notificationsData: action.data,
            };

        case SUPPORT_TICKETS:
            return {
                ...state,
                supportTickets: action.data,
            };
        case UPDATE_ACCOUNT_ID:
            return {
                ...state,
                currentUser: action.data,
            };
        default:
            return state;
    }

}