import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import { IS_LOADING } from '../constants';


export function SubmitReview(data, token, navigate, message) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/submitRating`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(Response => {
            message()
            navigate()
            dispatch({ type: IS_LOADING, isloading: false })
        })
    }
}
