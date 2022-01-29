import axios from 'axios';
import { IS_LOADING } from '../constants';


export function SubmitKYC(data, token, navigate, message) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/knowYourCustomer_post`,
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
            message()
            console.log(Response)
            dispatch({ type: IS_LOADING, isloading: false })
        })
    }
}