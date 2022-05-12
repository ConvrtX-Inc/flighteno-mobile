import axios from 'axios';
import { BASE_URL } from '../../BASE_URL/index'
import { CHAT_MESSAGES } from '../constants';
import moment from 'moment';

export function getChatMessages(data, token) {
    console.log("data",data)
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
        
            var messages = Response.data.messagesData.filter((chat) => chat.messages && chat.messages.length > 0 );

            messages.forEach(chat =>{
                chat.messages = chat.messages.filter(message => message.currentMessage != null);
                chat.messages.forEach((msg) =>{
                    msg.currentMessage.text =  msg.currentMessage.text.replace(new RegExp("<br>","g"),'\n');
                })
            })

            var sortedData = messages.sort(function (a, b) {
                return new Date(b.messages[0]?.currentMessage.createdAt) - new Date(a.messages[0]?.currentMessage.createdAt);
            });

            
            dispatch({ type: CHAT_MESSAGES, data: sortedData })
        })
    }
}

export function sendEditOffer(data, token, success) {
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

            success(Response.data)
            // console.log(Response)
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
