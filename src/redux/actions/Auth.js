import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import {
    LOGIN_ACTION,
    LOGIN_DATA,
    IS_LOADING,
    LOGOUT,
    CURRENT_PROFILE,
    IS_LOADING_FACEBOOK,
    IS_LOADING_GOOGLE,
    NOTIFICATION_LIST,
    SUPPORT_TICKETS
} from '../constants/index';
import Toast from 'react-native-toast-message';


export function registerUserFN(data, removeStates, saveToken) {
    var obj = {
        full_name: data._parts[0][1],
        email: data._parts[1][1],
        phone_number: data._parts[2][1],
        password: data._parts[3][1],
        country_code: data._parts[4][1],
    }
    console.log("request body register",obj)
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/RegisterUser`,
            data: obj,
            headers: { "Authorization": "Basic ZmxpZ2h0ZW5vMzE6QXNpbTEyISEhfmFzYQ==" },
            validateStatus: (status) => {
                console.log(status)
                return true;
            },
        }).catch(error => {
            // loginError()
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
            Toast.show({
                type: 'error',
                text1: error
            })
        }).then(Response => {
            if (Response.data.type == 200) {
                dispatch({ type: LOGIN_ACTION, data: Response.data.token });
                dispatch({ type: IS_LOADING, isloading: false })
                dispatch({ type: LOGIN_DATA, data: Response.data.data });
                removeStates()
                saveToken(Response.data.data._id, Response.data.token)
            }
            else {
                dispatch({ type: IS_LOADING, isloading: false })
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: Response.data.status,
                })
            }
        })
    }
}


export function LoginAction(data, removeStates, loginError, saveToken) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/loginMobile`,
            data: data,
            headers: { "Authorization": "Basic ZmxpZ2h0ZW5vMzE6QXNpbTEyISEhfmFzYQ==" },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            loginError()
            console.log("Error", error)
        }).then(response => {
            if (response.data.status == "successfully Login!!!!!!!!!!") {
                dispatch({ type: LOGIN_ACTION, data: response.data.token });
                dispatch({ type: LOGIN_DATA, data: response.data.data });
                dispatch({ type: IS_LOADING, isloading: false })
                removeStates()
                saveToken(response.data.data._id, response.data.token)
            } else {
                dispatch({ type: IS_LOADING, isloading: false })
                loginError()
            }
        });
    }
}


export function getDataAction(token) {

    return async dispatch => {
        axios({
            method: 'get',
            url: `${BASE_URL}getLoggedInUser`,
            headers: {
                auth_token: token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(response => {
            console.log("CURRENT USER DATA",data)
            dispatch({ type: LOGIN_DATA, data: response.data });

        });
    }
}


export function verificationCodeAction(data, removeStates, navigate, verificationError) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Api/SendVerificationCode`,
            data: data,
            headers: { "Authorization": "Basic ZmxpZ2h0ZW5vMzE6QXNpbTEyISEhfmFzYQ==" },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {

            verificationError()
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)

        }).then(response => {
            dispatch({ type: IS_LOADING, isloading: false })
            if (response.data.Status == 200) {
                dispatch({ type: IS_LOADING, isloading: false })
                navigate()
                removeStates()

            } else {
                verificationError()
                dispatch({ type: IS_LOADING, isloading: false })
            }
        });
    }
}


export function verifyOtpCodeAction(data, removeStates, navigate, verificationError, registerData, saveToken) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Api/verifyCode`,
            data: data,
            headers: { "Authorization": "Basic ZmxpZ2h0ZW5vMzE6QXNpbTEyISEhfmFzYQ==" },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {

            verificationError()
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })


        }).then(response => {
            if (response.data.Status == 200) {
                removeStates()
                dispatch(registerUserFN(registerData, removeStates, saveToken))
            } else {
                verificationError()
                dispatch({ type: IS_LOADING, isloading: false })
            }
        });
    }
}


export function otpResetPasswordAction(data, removeStates, navigate, loginError) {
    console.log("data dispatch:" ,data)
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Api/resetPasswordSendCode`,
            data: data,
            headers: { "Authorization": "Basic ZmxpZ2h0ZW5vMzE6QXNpbTEyISEhfmFzYQ==" },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            loginError()
            console.log("Error", error)
        }).then(response => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("DATA", response.data)
            if (response.data.Status == 200) {
                navigate(response.data.phoneNumber)
                dispatch({ type: IS_LOADING, isloading: false })
                removeStates()
            } else {
                dispatch({ type: IS_LOADING, isloading: false })
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: response.data.Message,
                })
            }
        });
    }
}


export function verifyOtpCodeResetPasswordAction(data, removeStates, navigate, verificationError) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Api/verifyCode`,
            data: data,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            verificationError()
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            if (response.data.Status == 200) {
                navigate()
                removeStates()
                dispatch({ type: IS_LOADING, isloading: false })
            } else {
                verificationError()
                dispatch({ type: IS_LOADING, isloading: false })
            }
        });
    }
}


export function newPaswordCreationAction(data, removeStates, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/forgetPassword`,
            data: data,
            headers: { "Authorization": "Basic ZmxpZ2h0ZW5vMzE6QXNpbTEyISEhfmFzYQ==" },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            verificationError()
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            dispatch({ type: IS_LOADING, isloading: false })
            if (response.data.type == 200) {
                navigate()
                removeStates()
                dispatch({ type: IS_LOADING, isloading: false })
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: response.data.status,
                })
                dispatch({ type: IS_LOADING, isloading: false })
            }
        });
    }
}


export function Logout() {
    return async dispatch => {
        dispatch({
            type: LOGOUT, data: null
        });
    }
}


export function ProfileSelection(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/profileStatusUpdate`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(response => {
            if (response.data.type == 200) {
                dispatch({ type: CURRENT_PROFILE, data: response.data.profile_status })
            }
        });
    }
}


export function SocialLogin(data, saveToken) {
    return async dispatch => {
        dispatch({ type: data.signup_source == "facebook" ? IS_LOADING_FACEBOOK : IS_LOADING_GOOGLE, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/RegisterUserUsingSocial`,
            data: data,
            headers: { "Authorization": "Basic ZmxpZ2h0ZW5vMzE6QXNpbTEyISEhfmFzYQ==" },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: data.signup_source == "facebook" ? IS_LOADING_FACEBOOK : IS_LOADING_GOOGLE, isloading: false })
            console.log("Error", error)
        }).then(response => {
            dispatch({ type: data.signup_source == "facebook" ? IS_LOADING_FACEBOOK : IS_LOADING_GOOGLE, isloading: false })
            if (response.data.type == 200) {
                dispatch({ type: LOGIN_ACTION, data: response.data.token });
                dispatch({ type: LOGIN_DATA, data: response.data.data });
                dispatch({ type: data.signup_source == "facebook" ? IS_LOADING_FACEBOOK : IS_LOADING_GOOGLE, isloading: false })
                saveToken(response.data.data._id, response.data.token)
            } else {
                dispatch({ type: data.signup_source == "facebook" ? IS_LOADING_FACEBOOK : IS_LOADING_GOOGLE, isloading: false })
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: response.data.status,
                })
            }
        });
    }
}


export function customerSupport(data, token, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/createTicket`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(response => {
            dispatch({ type: SUPPORT_TICKETS, data: response.data.data })
            navigate()
            dispatch({ type: IS_LOADING, isloading: false })
        });
    }
}

export function getTickets(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getAllTickets`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(response => {
            dispatch({ type: SUPPORT_TICKETS, data: response.data.data })
        });
    }
}


export function SaveDeviceToken(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/saveDeviceToken`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(response => {
        });
    }
}


export function NotificationsList(data, token, showList) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getMyNotification`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            dispatch({ type: NOTIFICATION_LIST, data: response.data.notification })
            showList()
            dispatch({ type: IS_LOADING, isloading: false })
        });
    }
}

export function UpdatePassword(data, token, oldPasswordError, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/updatePassword`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(response => {
            if (response.data.type == 200) {
                navigate()
                dispatch({ type: IS_LOADING, isloading: false })
            }
            else {
                oldPasswordError()
                dispatch({ type: IS_LOADING, isloading: false })
            }
        });
    }
}

export function UpdateProfile(data, token, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/editProfile`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(response => {
            dispatch({ type: LOGIN_ACTION, data: response.data.token });
            dispatch({ type: LOGIN_DATA, data: response.data.data });
            navigate()
            dispatch({ type: IS_LOADING, isloading: false })
        });
    }
}

export function customerSupportTickets(data, token, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/support`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("Error", error)
        }).then(response => {
            navigate()
            dispatch({ type: IS_LOADING, isloading: false })
        });
    }
}
