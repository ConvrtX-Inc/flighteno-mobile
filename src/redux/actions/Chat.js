import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import { CHAT_MESSAGES } from '../constants';
import moment from 'moment';

export function getChatMessages(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getChatMessages`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
            console.log("MESSAGES \n\n", Response.data.messagesData)
            var sortedData = Response.data.messagesData.sort(function (a, b) {
                return new Date(b.messages[0]?.currentMessage.createdAt) - new Date(a.messages[0]?.currentMessage.createdAt);
            });
            dispatch({ type: CHAT_MESSAGES, data: sortedData })
        })
    }
}

export function sendEditOffer(data, token) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/saveOfferDetails`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
        }).then(Response => {
        })
    }
}

export function getOneToOneChat(data, token, callback, stopLoading) {
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/getChatUsingId`,
            data: data,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            stopLoading()
        }).then(Response => {
            callback(Response.data)
            stopLoading()
        })
    }
}
