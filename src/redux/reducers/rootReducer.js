import { combineReducers } from 'redux';

import authRed from './Auth';
import buyerOrderRed from './BuyerOrder';
import tripsRed from './Trips';
import chatRed from './Chat'
import reviewRed from './Reviews'
import kycRed from './KYC'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'


/**
 * Remove Chat messages from redux persist
 * - this prevents messages from being stored to local storage which causes delays on app
 */

const chatsPersistConfig = {
    key: 'chats',
    storage: AsyncStorage,
    blacklist: ['chatMessages']
  }

const rootReducer = combineReducers({
    authRed,
    buyerOrderRed,
    tripsRed,
    chatRed:persistReducer(chatsPersistConfig, chatRed),
    reviewRed,
    kycRed
});
  
export default rootReducer;