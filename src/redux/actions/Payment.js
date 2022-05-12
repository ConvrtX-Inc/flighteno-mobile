import axios from 'axios';
import { Linking } from 'react-native';
import { BASE_URL, PAYMENT_BASE_URL } from '../../BASE_URL/index'
import { addCustomerDetails } from '../../services/Stripe/Customer';
import { IS_LOADING, LOGIN_DATA, UPDATE_CUSTOMER_ID } from '../constants';

export function ConfigureStripeAccount(data, token, navigation, userDetails) {

    console.log("TOKEN", token)
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${PAYMENT_BASE_URL}/create-connected-account`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log(error)
        }).then(async Response => {
            console.log("RES:", Response.data)
            dispatch({ type: IS_LOADING, isloading: false })

            navigation.replace('StripeWebView', { url: Response.data.conected_account_id })
        })
    }
}

export function RespondToOffer(data, token, sendOfferMessage, callback) {
    console.log('Offer Data',data);
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
            console.log("Stripe Data", response.data.data)
            dispatch({ type: LOGIN_DATA, data: response.data.data });
        });
    }
}


export async function SetupStripeAccount(data, token) {
    try {
        const res = await axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/createStripeAccount`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        });

        return res.data;
    } catch (err) {
        return err;
    }
}


export async function OnBoardStripeAccount(data, token) {
    try {
        const res = await axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/onBoardAccount`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        });

        return res.data;
    } catch (err) {
        return err;
    }
}


export async function CreateTransferIntent(data,token){
    try {
        const res = await axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/transferToAccount`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        });

        return res.data;
    } catch (err) {
        return err;
    }
}


export async function ConfirmTransferToAccount(data,token){
    try {
        const res = await axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/confirmTransferToAccount`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        });

        return res.data;
    } catch (err) {
        return err;
    }
}



export async function GetPaymentMethodId(data,token){
    try {
        const res = await axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getPaymentMethodByOrderId`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        });

        return res.data;
    } catch (err) {
        return err;
    }
}

export async function GetLatestTransactions(data,token){
    try {
        const res = await axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getUserLatestTransactions`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        });

        return res.data;
    } catch (err) {
        return err;
    }
}


