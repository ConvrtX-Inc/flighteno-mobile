import React, { useRef, useState } from 'react';
import { View} from 'react-native';
import ButtonLarge from '../../components/ButtonLarge';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import TextBold from '../../components/atoms/TextBold';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import InputText from '../../components/InputText';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from '../../Utility/Styles';
import CountryPicker from 'react-native-country-picker-modal'
import { color } from '../../Utility/Color';
import Toast from 'react-native-toast-message';
import { SetupStripeAccount } from '../../redux/actions/Payment';


function CreateStripeAccount({ route }) {
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [phone, setPhone] = useState()
    const phoneInput = useRef()
    const [countryCode, setCountryCode] = useState('AE')
    const [country, setCountry] = useState(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [dialCode, setDialCode] = useState();
    const[isLoading,setIsLoading] = useState(false);


    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)

        console.log('Country Code', countryCode);
    }

    const createStripeAccount = async () => {

        if (firstName == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter your first name",
            })
            return
        }

        if (lastName == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter your Last name",
            })
            return
        }

        if (companyName == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter your Company name",
            })
            return
        }

        if (phone == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter your Phone Number",
            })
            return
        }

        const formattedPhoneNo = `${dialCode}${phone}`;
        if (!phoneInput.current?.isValidNumber(formattedPhoneNo)) {
            Toast.show({
                type: 'error',
                text2: "Invalid phone number",
            })
            return
        }

        // Add api call for create stripe account
        const form_data = new FormData()
        form_data.append("first_name", firstName);
        form_data.append("last_name", lastName);
        form_data.append("email", currentUser.email_address);
        form_data.append("product_description", "Payment For Orders");
        form_data.append("company_name", companyName);
        form_data.append("country", countryCode);
        form_data.append("phone", phone);

        setIsLoading(true);
        try {
             
            const response = await SetupStripeAccount(form_data, token);
            if(response.code == 400){
                Toast.show({
                    type: 'error',
                    text2: response.message,
                })
                setIsLoading(false);
                return
            }else{
                setIsLoading(false);
                // success message redirect to stripe website
            }
        } catch (err) {
            console.log('ERROR: ', err)
        }


    }
    return (
        <SafeAreaView style={{ marginLeft: 18, marginRight: 18 }}>
            <ScrollView>
                <TextBold style={{ fontSize: 26, textAlign: 'left' }}>Create Stripe Account</TextBold>

                <TextBold style={{ marginTop: 24, textAlign: 'left' }}>First Name</TextBold>
                <View style={{ marginTop: 8 }}>
                    <InputText placeholder="Margarette" onChangeText={text => setFirstName(text)}
                        value={firstName} />
                </View>


                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>Last Name</TextBold>
                    <View style={{ marginTop: 8 }}>
                        <InputText placeholder="Smith" onChangeText={text => setLastName(text)}
                            value={lastName} />
                    </View>
                </View>


                <View style={{ marginTop: 16 }}>
                    <TextBold style={{ textAlign: 'left' }}>Company Name</TextBold>
                    <View style={{ marginTop: 8 }}>
                        <InputText placeholder="Company Name" onChangeText={text => setCompanyName(text)}
                            value={companyName} />
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
                    <TextBold style={{ textAlign: 'left' }}>Phone Number</TextBold>
                    <View style={{ marginTop: 8 }}>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phone}
                            defaultCode="AE"

                            onChangeText={(text) => {
                                setPhone(text)
                            }}
                            onChangeCountry={(country) => {
                                setDialCode(`+${country.callingCode}`)
                            }}
                            containerStyle={styles.phoneContainer}
                            textInputStyle={styles.phoneInput}
                            textContainerStyle={styles.phoneTextContainer}
                            codeTextStyle={styles.phoneCodeText}
                            textInputProps={{
                                placeholderTextColor: "#707070",
                                keyboardType: "phone-pad",
                                placeholder: "123-456-789",
                                fontFamily: Platform.OS == 'ios' ? 'Gilroy-Regular' : 'GilroyRegular'
                            }}
                        />
                    </View>
                </View>


                <View style={{ marginTop: 16, marginBottom: 16 }}>
                    <View style={{ marginTop: 16 }}>
                        <ButtonLarge title="Submit" loader={isLoading} onPress={createStripeAccount} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateStripeAccount;

