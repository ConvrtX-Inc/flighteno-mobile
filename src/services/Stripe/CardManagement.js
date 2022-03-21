import axios from 'axios';
import { STRIPE_BASE_URL } from '../../BASE_URL';
import { STRIPE_SECRET_KEY } from '@env'
import { GET_CARDS, SET_DEFAULT_CARD, UPDATE_CUSTOMER_ID } from '../../redux/constants';
import { addCustomerDetails } from './Customer';


export async function createToken(cardDetails) {
    console.log('create token', cardDetails.values)
    const { number, expiry, name, cvc } = cardDetails.values;

    const expiryDates = expiry.split("/");

    const formData = new URLSearchParams();
    formData.append("card[number]", number);
    formData.append("card[exp_month]", expiryDates[0]);
    formData.append("card[exp_year]", expiryDates[1]);
    formData.append("card[cvc]", cvc);
    formData.append("card[name]", name);

    console.log("form data", formData);

    try {

        const response = await axios({
            method: 'post',
            url: `${STRIPE_BASE_URL}/tokens`,
            data: formData,
            headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}`, "content-type": "application/x-www-form-urlencoded" },
             validateStatus: (status) => {
                return true;
            },
        }).catch((error) => {
            console.log(error.message)
        })

        return response.data;

    } catch (err) {

        console.log(err)
        return err;
    }
}

// Save card to stripe
export async function createCard(cardDetails, customerID) {
    const token_source = await createToken(cardDetails);
    if (token_source.id) {
        console.log("customer id", customerID)
        var cardColor = Math.floor(Math.random() * 16777215).toString(16);
        const { number, expiry, cvc } = cardDetails.values;
        const formData = new URLSearchParams();
        formData.append("source", token_source.id);
        formData.append("metadata[color]", '#' + cardColor)
        formData.append("metadata[expiry]", expiry)
        formData.append("metadata[number]", number)
        formData.append("metadata[cvc]", cvc)

        try {

            const response = await axios({
                method: 'post',
                url: `${STRIPE_BASE_URL}/customers/${customerID}/sources`,
                data: formData,
                headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}`, "content-type": "application/x-www-form-urlencoded" },
            
                validateStatus: (status) => {
                    return true;
                },
            });


            return response.data;
        } catch (err) {
            console.log('ERR ====>', err,)
        }
    } else {
        return token_source;
    }

}

// Get the list of cards
export async function getCards(customerID) {

    try {
        return async dispatch => {
            const response = await axios({
                method: 'get',
                url: `${STRIPE_BASE_URL}/customers/${customerID}/sources`,
                // headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}` },
              
                validateStatus: (status) => {
                    return true;
                },
            });
            dispatch({ type: GET_CARDS, data: response.data.data })

        }
    } catch (err) {
        console.log('ERR ====>', err,)
    }
}

// Update Card
export function updateCard() {
    console.log('update card')
}

//Remove Card
export async function removeCard(cardId, customerID) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${STRIPE_BASE_URL}/customers/${customerID}/sources/${cardId}`,
            headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}`, "content-type": "application/x-www-form-urlencoded" },
         
            validateStatus: (status) => {
                return true;
            },  
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

// Set customer's default card/source
export async function setDefaultCard(cardId, customerID) {
    const formData = new URLSearchParams();
    formData.append("default_source", cardId)
    try {
        const response = await axios({
            method: 'post',
            url: `${STRIPE_BASE_URL}/customers/${customerID}`,
            data: formData,
            // headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}`, "content-type": "application/x-www-form-urlencoded" },
        
            validateStatus: (status) => {
                return true;
            },
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function getCustomerDefaultCard(customerID,currentUser) {
    try {
        return async dispatch => {
            const response = await axios({
                method: 'get',
                url: `${STRIPE_BASE_URL}/customers/${customerID}`,
                // headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}` },
              
                validateStatus: (status) => {
                    return true;
                },
            });

            console.log("default card",response.data.default_source)
            if (response.data.default_source) {
                dispatch({ type: SET_DEFAULT_CARD, data: response.data.default_source });

            } else if (response.data.error && response.data.error.code == "resource_missing") {
                //create customer if no customer found on stripe
                const addCustomerDetailsRes = await addCustomerDetails(currentUser._id);

                if (addCustomerDetailsRes.customer) {
                    const user = currentUser;
                    user.customer_id = addCustomerDetailsRes.customer

                    dispatch({ type: UPDATE_CUSTOMER_ID, data: user });
                }
            }
        }
    } catch (err) {
        console.log('ERR ====>', err,)
    }
}

