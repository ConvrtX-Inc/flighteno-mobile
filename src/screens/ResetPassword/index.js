import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
// import PhoneInput from "react-native-phone-number-input";
import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input'

import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { otpResetPasswordAction } from '../../redux/actions/Auth';
import { IS_LOADING } from '../../redux/constants';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import { useTranslation } from 'react-i18next';


var windowWidth = Dimensions.get('window').width;
export default function ResetPassword() {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const countryPicker = useRef()
  
    const { loading } = useSelector(({ authRed }) => authRed)
    const {t} = useTranslation()


    const [email, setEmail] = useState('');
    const [cellno, setCellNo] = useState('');
    const [cellnoShow, setCellNoShow] = useState('');

    const [isPhoneEnabled, setPhoneEnabled] = useState(true)
    const [isEmailEnabled, setEmailEnabled] = useState(true)
    const [isPickerOpen, setPickerOpen] = useState(false)

    const [initialCountry, setInitialCountry] = useState('us')

    const phoneInput = useRef();
    const [phoneInputVal, setPhoneInputVal] = useState('') 

    useEffect(() => {

       

    },[])

    const resetPasswordFN = () => {

       
        if(isPhoneEnabled && isEmailEnabled){
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your email address or phone number",
           })

           return 
        }


        if(isPhoneEnabled){
            if(phoneInputVal.length <= 10){
                Toast.show({
                    type: 'info',
                    text1: 'Alert!',
                    text2: "Phone number not valid",
                })
                return 
            }
        }

        const form_data = new FormData()

        if (email != "") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(email.trim()) === false) {
                Toast.show({
                    type: 'info',
                    text1: 'Alert!',
                    text2: "Please, enter valid email",
                })
                return;
            }
            else {
                form_data.append("type", "email")
                form_data.append("data", email.trim().toLowerCase())
            }
        }
        else {
            form_data.append("type", "phone")
            form_data.append("data", phoneInputVal)
        }

    
        dispatch(otpResetPasswordAction(
            form_data,
            () => {
                setCellNo("")
                setCellNoShow("")
                setEmail("")
            },
            (cellNo) => {
            
                if(isEmailEnabled){
                    navigation.navigate("VerifyCode", { cellNo:  cellNo })
                }

                if(isPhoneEnabled){
                    // console.log(phoneInputVal)
                    navigation.navigate("VerifyCode", { cellNo:  phoneInputVal })
                }

                
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid Credentials",
                })
            },

        ))

    }

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../images/back.png')}
                    />
                </TouchableOpacity>

                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', textAlign:'left' }]}>{t('common.resetPassword')}</TextBold>

                <TextMedium style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 12) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>
                    {t('common.enterEmailAd')}
                </TextMedium>


                    {/* TextInputs For Reset Password */}


                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.email')}</TextBold>

                <Input
                    placeholder="myemail@flighteno.com"
                    onChangeText={text => {
                        setEmail(text)
                        
                        if(text === ""){
                            setPhoneEnabled(true)
                        }else{
                            setPhoneEnabled(false)
                        }
                     }}
                    value={email}
                    secureTextEntry={false}
                    editable={isEmailEnabled}
                    // editable={cellnoShow ? false : true}
                />

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.phoneNum')}</TextBold>
                     <PhoneInput
                        ref={phoneInput}
                        onPressFlag={() => {
                            // countryPicker.current?.open()
                            setPickerOpen(!isPickerOpen)
                        }}
                        textProps={{
                            placeholder:'123-456-789'
                        }}
                        onChangePhoneNumber={(displayValue) => {
                        if(displayValue.length >1){
                            setEmailEnabled(false)
                        }else{
                            setEmailEnabled(true)
                        }
                         setPhoneInputVal(displayValue)
                        }}
                        
                        // disabled={email ? true : false}
                        disabled={!isPhoneEnabled}
                        style={[styles.phoneContainer, {padding:16}]}
                     />
                {/* <PhoneInput
                    ref={phoneInput}
                    defaultValue={cellno}
                    defaultCode="AU"
                    // disableArrowIcon={email ? true : false}
                   
                    autoFocus
                    // disabled={email ? true : false}
                    countryPickerProps={{
                    //    withFilt  er:false,
                    //    withCallingCodeButton:false,
                    //    withFilter:false,
                    //    withCurrency:false,
                    //    withCallingCode:false,
                    //    withAlphaFilter:false
                    }}
                    
                    onChangeFormattedText={(text) => {
                        setCellNo(text)

                        if(text === ""){
                            setEmailEnabled(true)
                        }else{
                            setEmailEnabled(false)
                        }
                    }}
                    onChangeText={(text) => {
                        setCellNoShow(text)
                    }}
                    // onChangeCountry={(country) => setCellNo("+" + country.callingCode)}
                    containerStyle={styles.phoneContainer}
                    textInputStyle={styles.phoneInput}
                    textContainerStyle={styles.phoneTextContainer}
                    codeTextStyle={styles.phoneCodeText}
                    textInputProps={{
                        placeholderTextColor: email ? "#CDCDCD" : "#707070",
                        keyboardType: "phone-pad",
                        value: cellnoShow,
                        placeholder: "123-456-789",
                        editable:email ? false : true,         
                    }}
                /> */}


                <View style={{ marginTop: (windowWidth * 20) / 100, marginBottom: 35 }}>
                    <ButtonLarge
                        title={t('common.verifyAccount')}
                        loader={loading}
                        onPress={() => resetPasswordFN()}
                    />
                </View>




            </ScrollView>
                

            {isPickerOpen &&
            (
            <CountryPicker 
            // ref={countryPicker}
            // ref={countryPicker}
            visible={true}
            onClose={() => {
                setPickerOpen(!isPickerOpen)
            }}
            onSelect={(country) => {
                // console.log(country?.cca2)
                // setInitialCountry(country?.cca2.toLowerCase())
                setInitialCountry(country)
                phoneInput.current?.selectCountry(country?.cca2.toLowerCase())
            }}
        
            />)}

        </View>
    );

}