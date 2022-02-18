import axios from 'axios';
import { IS_LOADING } from '../constants';


export function GetLanguages() {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'GET',
            url: `https://google-translate1.p.rapidapi.com/language/translate/v2/languages`,
            headers: { 
                'accept-encoding':'application/gzip',
                'x-rapidapi-key':'bb82b77dbdmsh80ab2f67bc7d192p1efa94jsn81c0a8a7b263',
                'x-rapidapi-host':'google-translate1.p.rapidapi.com'
             },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            // dispatch({ type: IS_LOADING, isloading: false })
        }).then(Response => {
            console.log(Response.data)
            // message()
            // navigate()
            // dispatch({ type: IS_LOADING, isloading: false })
        })
    }
}