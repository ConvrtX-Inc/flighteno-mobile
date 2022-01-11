import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import { IS_LOADING, LOGIN_DATA } from '../constants';

export function ConfigureStripeAccount(data, token, navigation) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `http://3.124.117.144:3000/create-connected-account`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log(error)
        }).then(Response => {
            dispatch({ type: IS_LOADING, isloading: false })
            navigation.navigate('StripeWebView', { url: Response.data.conected_account_id })
        })
    }
}

export function RespondToOffer(data, token, sendOfferMessage, callback) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/offerAccepted`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log('error', error)
        }).then(Response => {
            dispatch({ type: IS_LOADING, isloading: false })
            sendOfferMessage()
            setTimeout(() => {
                callback(Response.data.order[0])
            }, 2000);
        })
    }
}

export function GetUserStipeAccountDetail(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getUserDetailsForStripeConnectedAccountID`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(response => {
            dispatch({ type: LOGIN_DATA, data: response.data.data });
        });
    }
}
