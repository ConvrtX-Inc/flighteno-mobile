import axios from 'axios';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../BASE_URL/index';
import { IS_LOADING } from '../constants';


export function VerifyAccount(token, data, message) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/knowYourCustomer`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {

            Toast.show({
                type: 'success',
                text2: "Successfully submitted KYC",
            })
            message()
            dispatch({ type: IS_LOADING, isloading: false})
        })
    }
}