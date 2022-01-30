import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import { IS_LOADING } from '../constants';


export function createOrder(data, navigate, token) {
    console.log('data', data);
    console.log('navigate', navigate);
    console.log('token', token);
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/createOrder`,
            data: data,
            headers: { "Authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6IjYxYmIyN2NiOWM3Yjc4NTVkNzViNDAzNCIsImRhdGUiOiIyMDIyLTAxLTI5IDEwOjI3OjA3IiwiaWF0Ijp7IiRkYXRlIjp7IiRudW1iZXJMb25nIjoiMTY0NTE4MDAyNzAwMCJ9fX0.0Kbfh0e-gteX8gW3xWe0BsdyRurN859MdNRLzNn8bkQ' },
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
