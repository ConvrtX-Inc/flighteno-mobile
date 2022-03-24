import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import {
    IS_LOADING, TRIPS_DATA, MY_ORDERS, MY_RECENT_ORDERS,
    ORDERS_TO_DESTINATION, TRAVLER_ORDERS, LATEST_TRIP_ID,
    TRENDING_ORDERS,
    FILTERED_ORDERS_DATA,
    IS_LOADING_RESET_FILTER
} from '../constants';
import Toast from 'react-native-toast-message';

export function AddTrip(token, data) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/addTrip`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(Response => {
            dispatch({ type: IS_LOADING, isloading: false })
            if (Response.data.type == 200) {
                dispatch({ type: TRIPS_DATA, data: Response.data.user_trip })
                dispatch({ type: LATEST_TRIP_ID, data: Response.data.user_trip[0]?._id })
                var newObj = {
                    admin_id: data.admin_id
                }
                dispatch(UserOrders(token, newObj))
            }
            else if (Response.data.type == 500) {
                Toast.show({ type: 'error', text1: 'Alert!', text2: Response.data.status, })
            }
        })
    }
}

export function getStoreNames(token, storeData){
    return async dispatch => {
        axios({
            method:'get',
            url: `${BASE_URL}Rest_calls/getStoreNames`,
         
            headers:{'Authorization': token },
            validateStatus: (status) => {
                return true
            }
        }).catch(error => {
            console.log('Error', error)
        }).then(Response => {
            // console.log(Response.data)
            
            storeData(Response.data)
            // if(Response.data.type == 200){
            //     storeData(Response.data)
            // }

        })
    }
}

export function UserTrips(token, data) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getUserTrip`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
            if (Response.data.type == 200) {
                dispatch({ type: TRIPS_DATA, data: Response.data.user_trip })
                dispatch({ type: LATEST_TRIP_ID, data: Response.data.user_trip[0]?._id })
            }
        })
    }
}

export function UserOrders(token, data, hideFilter) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getUserOrdersOnTheBasisOnCountry`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
            dispatch({ type: IS_LOADING, isloading: false })
            hideFilter()
            if (Response.data.type == 200) {
                if (Response.data.orders?.length > 0) {
                    if (Response.data.orders[0].profile_data.length > 0) {
                        dispatch({ type: ORDERS_TO_DESTINATION, data: Response.data.orders })
                     
                        // dispatch({ type: FILTERED_ORDERS_DATA, data: Response.data.orders })
                    }
                }
                else dispatch({ type: ORDERS_TO_DESTINATION, data: Response.data.orders })
            }
        })
    }
}

export function FilterOrders(data, token, hideFilter) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/filterApi`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(Response => {
            dispatch({ type: IS_LOADING, isloading: false })
            hideFilter()
            if (Response.data.status == "Data Fetched!") {
                dispatch({ type: ORDERS_TO_DESTINATION, data: Response.data.orders })
            }
        })
    }
}

export function FilterResetOrders(token, data, hideFilter) {
    return async dispatch => {
        dispatch({ type: IS_LOADING_RESET_FILTER, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getUserOrdersOnTheBasisOnCountry`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
            dispatch({ type: IS_LOADING_RESET_FILTER, isloading: false })
            hideFilter()
            if (Response.data.type == 200) {
                if (Response.data.orders?.length > 0) {
                    if (Response.data.orders[0].profile_data.length > 0) {
                        dispatch({ type: ORDERS_TO_DESTINATION, data: Response.data.orders })
                     
                        // dispatch({ type: FILTERED_ORDERS_DATA, data: Response.data.orders })
                    }
                }
                else dispatch({ type: ORDERS_TO_DESTINATION, data: Response.data.orders })
            }
        })
    }
}



export function GetMyOrders(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getOrdersPendingCancelledCompleted`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
            dispatch({ type: MY_ORDERS, data: Response.data.order })
        })
    }
}

export function GetTravelerOrders(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getTravelerOrdersPendingCompleted`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
            dispatch({ type: TRAVLER_ORDERS, data: Response.data.traveler_order })
        })
    }
}

export function UpdateOrder(data, token, navigation) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/uploadPicAndReciptAgainstTheOrder`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(Response => {
            // dispatch({ type: IS_LOADING, isloading: false })
            navigation()
        })
    }
}

export function CompleteOrder(data, token, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/orderMarkAsComplete`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(Response => {
            navigate()
            dispatch({ type: IS_LOADING, isloading: false })
        })
    }
}

export function GetMyRecentOrders(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getRecentOrders`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
            dispatch({ type: MY_RECENT_ORDERS, data: Response.data.orders })
        })
    }
}

export function CancelOrder(data, token, navigation) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/markOrderAsCancelled`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(Response => {
            /*Fix for FLIGHT-15*/
            dispatch({ type: IS_LOADING, isloading: false })
            navigation.navigate('Track',{ screen:'Transactions'})
        })
    }
}

export function GetProfile(data, token, callback, updateRating) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getUserDetails`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(Response => {
            dispatch({ type: IS_LOADING, isloading: false })

            if (Response?.data?.user_data?.length > 0) {
                callback(Response.data.user_data[0])
            }
            // if (Response?.data?.user_data[0].traveler_ratting?.length > 0) {
            //     updateRating(Response.data.user_data[0].traveler_ratting[0].avg_rating)
            // }
        })
    }
}

export function GetTrendingOrders(token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/trendingOrders`,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
     
            dispatch({ type: TRENDING_ORDERS, data: Response.data.data })
        })
    }
}

