import {
    TRIPS_DATA,
    MY_ORDERS,
    MY_RECENT_ORDERS,
    ORDERS_TO_DESTINATION,
    TRAVLER_ORDERS,
    LATEST_TRIP_ID,
    TRENDING_ORDERS,
    FILTERED_ORDERS_DATA,
    IS_LOADING_FILTER,
    IS_LOADING_RESET_FILTER
} from '../constants'

let initialState = {
    tripsData: [],
    myOrders: [],
    myRecentOrders: [],
    ordersToDestination: [],
    filteredOrdersToDestination: [],
    travlerOrders: [],
    latestTripId: null,
    trendingOrders: [],
    isFilterLoading:true,
    isLoadingReset:true
};


export default (state = initialState, action) => {
    switch (action.type) {
        case TRIPS_DATA:
            return {
                ...state,
                tripsData: action.data,
            };
        case LATEST_TRIP_ID:
            return {
                ...state,
                latestTripId: action.data,
            };
        case MY_ORDERS:
            return {
                ...state,
                myOrders: action.data,
            };
        case TRAVLER_ORDERS:
            return {
                ...state,
                travlerOrders: action.data,
            };
        case MY_RECENT_ORDERS:
            return {
                ...state,
                myRecentOrders: action.data,
            };
        case ORDERS_TO_DESTINATION:
            return {
                ...state,
                ordersToDestination: action.data,
            };
        case FILTERED_ORDERS_DATA:
            return {
                ...state,
                filteredOrdersToDestination: action.data,
        };
        case TRENDING_ORDERS:
            return {
                ...state,
                trendingOrders: action.data,
            };
        case IS_LOADING_FILTER:
            return {
                ...state,
                isLoadingFilter:action.isLoading
            }
        case IS_LOADING_RESET_FILTER:
            return {
                ...state,
                isLoadingReset:action.isLoading
            }
        default:
            return state;
    }

}