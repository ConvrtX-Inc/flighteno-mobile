import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBold from '../../../components/atoms/TextBold';
import ButtonLarge from '../../../components/ButtonLarge';
import ButtonPlain from '../../../components/ButtonPlain';
import InputText from '../../../components/InputText';
import { CreditCardInput } from "react-native-credit-card-input";
import { useTranslation } from 'react-i18next';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import CountryPicker from 'react-native-country-picker-modal'
import { color } from '../../../Utility/Color';
import { showErrorToast, showToast } from '../../../Utility/Utils';
import Toast from 'react-native-toast-message';
import { addBankAccountToStripe } from '../../../services/Stripe/BankAccountManagement';


export default function AddNewCardScreen() {


    const { t } = useTranslation()
    const [countryCode, setCountryCode] = useState('AE');
    const [accountName, setAccountName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [address, setAddress] = useState('');
    const [currency, setCurrency] = useState('AED');



    const onSelect = (country) => {
        setCountryCode(country.cca2)

        setCurrency(country.currency[0]);

        console.log('Country Code', countryCode, country, 'currency', country.currency[0]);
    }


    async function addBankAccount() {
        console.log('Adding bank account ...', accountName, currency);

        if (accountName == "") {
            showErrorToast( 'Account Name is Required');
            return
        }

        if (accountNumber == "") {
            showErrorToast( 'Account Number is Required');
            return
        }

        if (bankName == "") {
            showErrorToast( 'Bank Name is Required');
            return
        }

        // if (routingNumber == "") {
        //     showErrorToast( 'Bank Routing Number is Required');
        //     return
        // }

        if (accountName == "") {
            showErrorToast( 'Account Name is Required');
            return
        }

        const bankAccountDetails = {
            account_name: accountName,
            account_number: accountNumber,
            country: countryCode,
            currency: currency,
            routing_number: routingNumber,
            email_address: emailAddress,
            address: address
        }

        console.log('Bank Account Details',bankAccountDetails)
        ///Static account id for now...
        const accountId ='acct_1Kut5d4KEhni0zMM';
        try{
            const res = await addBankAccountToStripe(bankAccountDetails,accountId);
           if(res?.id ){
            console.log('Response id',res.id)
           }else{
               showErrorToast(res.error.message);
           }
        }catch(err){
            console.log('error',err)
        }
    }

   
    return (
        <SafeAreaView style={{ marginLeft: 18, marginRight: 18 }}>
            <ScrollView>
                <TextBold style={{ fontSize: 26, textAlign: 'left' }}>Add New Bank Account</TextBold>

                <TextBold style={{ marginTop: 24, textAlign: 'left' }}>{t('common.accountName')}</TextBold>
                <View style={{ marginTop: 8 }}>
                    <InputText placeholder="Margarette Smith" value={accountName} onChangeText={text => setAccountName(text)} />
                </View>


                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>{t('common.bankName')}</TextBold>
                    <View style={{ marginTop: 8 }} >
                        <InputText placeholder="Bank of Canada" value={bankName} onChangeText={text => setBankName(text)} />
                    </View>
                </View>


                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>{t('common.accountNum')}</TextBold>
                    <View style={{ marginTop: 8 }}>
                        {/* <InputText/> */}
                        <InputText placeholder="7860 1230 4560 7890" value={accountNumber} onChangeText={text => setAccountNumber(text)}   />
                    </View>
                </View>

                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>Bank Routing Number</TextBold>
                    <View style={{ marginTop: 8 }}>

                        <InputText placeholder="Bank Routing Number" value={routingNumber} onChangeText={text => setRoutingNumber(text)} />
                    </View>
                </View>

                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>{t('common.emailAddress')}</TextBold>
                    <View style={{ marginTop: 8 }}>
                        <InputText placeholder="margarette_smith@gmail.com" value={emailAddress} onChangeText={text => setEmailAddress(text)} />
                    </View>
                </View>

                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>Country</TextBold>
                    <View style={{ marginTop: 8 }}>
                        <CountryPicker
                            {...{
                                countryCode,
                                withFilter: true,
                                withFlag: true,
                                withCountryNameButton: true,

                                onSelect, containerButtonStyle: {
                                    height: 50,
                                    borderColor: '#00000011',
                                    borderWidth: 1,
                                    borderRadius: 35,
                                    alignSelf: 'center',
                                    fontSize: 14,
                                    color: '#656F85',
                                    fontFamily: 'Gilroy-Regular',
                                    backgroundColor: color.inputBackColor,
                                    padding: 14,
                                    width: '100%'
                                }
                            }}

                        />
                    </View>
                </View>

                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>{t('common.address')}</TextBold>
                    <View style={{ marginTop: 8 }}>
                        <InputText placeholder="Ontario, Canada" value={address} onChangeText={text => setAddress(text)} />
                    </View>
                </View>

                {/* <CreditCardInput /> */}

                <View style={{ marginTop: 16, marginBottom: 16 }}>
                    <View style={{ marginTop: 16 }}>
                        <ButtonLarge title={t('common.addBankAccount')} onPress={addBankAccount} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}