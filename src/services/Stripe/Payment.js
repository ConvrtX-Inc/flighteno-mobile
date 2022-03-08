import axios from 'axios';

// Create Payment Intent
export const createStripePaymentIntent = async (url) => {
    
    try {
        const response = await axios({
            method: 'get',
            url: url,
            validateStatus: (status) => {
                return true;
            },
        });

        const res =response.data;

        let data = {
            customer: res.customer,
            ephemeralKey: res.ephemeralKey,
            paymentIntent: res.paymentIntent,
            paymentIntentId: res.paymentIntentId,
            status :res.status
        }

        return data;
    } catch (err) {
        return err;
    }

};


