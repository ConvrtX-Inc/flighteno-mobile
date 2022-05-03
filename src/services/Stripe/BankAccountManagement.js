import axios from 'axios';
import { STRIPE_BASE_URL } from '../../BASE_URL';
import { STRIPE_SECRET_KEY } from '@env'
import { GET_BANK_ACCOUNTS,} from '../../redux/constants';
 
/// Encrypt Bank details 
export async function createBankAccountToken(bankAccountDetails) {
    console.log('bank account details',bankAccountDetails)
    const {  account_name,account_number,country,currency,routing_number } = bankAccountDetails;

    let formData = new URLSearchParams();
    formData.append("bank_account[country]", country);
    formData.append("bank_account[account_holder_name]", account_name);
    formData.append("bank_account[account_number]", account_number);
    formData.append("bank_account[currency]", currency);

    if(routing_number != ''){
        formData.append("bank_account[routing_number]", routing_number);
    }
   
  
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

// Save bank account to stripe
export async function addBankAccountToStripe(bankAccountDetails, stripeAccountId) {
    const token_source = await createBankAccountToken(bankAccountDetails);
    console.log('token source',token_source)
    if (token_source.id) {
        console.log("stripe account id", stripeAccountId,'Token source',token_source.id);
        const formData = new URLSearchParams();
        formData.append("metadata[email]", bankAccountDetails.email_address)
        formData.append("metadata[bank_name]", bankAccountDetails.bank_name)
        formData.append("metadata[address]", bankAccountDetails.address)
        formData.append("metadata[account_number]", bankAccountDetails.account_number)


        try {

            const response = await axios({
                method: 'post',
                url: `${STRIPE_BASE_URL}/accounts/${stripeAccountId}/external_accounts?external_account=${token_source.id}`,
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


// Get the list of bank accounts
export async function getUserBankAccounts(stripeAccountId) {
    
    try {
        return async dispatch => {
            const response = await axios({
                method: 'get',
                url: `${STRIPE_BASE_URL}/accounts/${stripeAccountId}/external_accounts?object=bank_account`,
                headers: { "Authorization": `Bearer ${STRIPE_SECRET_KEY}` },
              
                validateStatus: (status) => {
                    return true;
                },
            });

        dispatch({ type: GET_BANK_ACCOUNTS, data: response.data.data })

        }
    } catch (err) {
        console.log('ERR ====>', err,)
    }
}

//Remove Bank Account
export async function removeStripeBankAccount(bankAcctId, stripeAccountId) {
    
    try {
        const response = await axios({
            method: 'delete',
            url: `${STRIPE_BASE_URL}/accounts/${stripeAccountId}/external_accounts/${bankAcctId}`,
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


