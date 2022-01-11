import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import { IS_LOADING } from '../constants';


export function createOrder(data, navigate, token) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/createOrder`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(Response => {
            navigate("Congratulation", { data: Response.data })
            dispatch({ type: IS_LOADING, isloading: false })
        })
    }
}

export function GetDataFromUrl(data, token, loading, errorMessage, navigate, invalidUrl) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getOrderDetailsUsingURL`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            loading()
        }).then(Response => {
            loading()
            if (Response.data.price) {
                navigate("UrlData", Response.data)
            }
            else if (Response.data.status) {
                invalidUrl()
            }
            else {
                errorMessage()
            }
        })
    }
}

export function getCurrentOrder(data, token, callback) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getOrderDetails`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(Response => {
            callback(Response.data.data)
            dispatch({ type: IS_LOADING, isloading: false })
        })
    }
}
