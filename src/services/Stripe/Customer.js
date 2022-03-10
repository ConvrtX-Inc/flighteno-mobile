import axios from "axios";
import { PAYMENT_BASE_URL } from "../../BASE_URL";
export async function addCustomerDetails(userId) {
    console.log('user id', userId)
    const url = `${PAYMENT_BASE_URL}/set-customer-id`;

    var body = {
        admin_id: userId,
    }
    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: body,
            validateStatus: (status) => {
                return true;
            },
        });

        console.log("response", response.data)
        return response.data;
    } catch (err) {
        return err;
    }
}