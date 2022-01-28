import { combineReducers } from 'redux';

import authRed from './Auth';
import buyerOrderRed from './BuyerOrder';
import tripsRed from './Trips';
import chatRed from './Chat'
import reviewRed from './Reviews'
import kycRed from './KYC'

const rootReducer = combineReducers({
    authRed,
    buyerOrderRed,
    tripsRed,
    chatRed,
    reviewRed,
    kycRed
});
  
export default rootReducer;