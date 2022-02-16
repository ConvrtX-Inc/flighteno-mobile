import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import PhoneInput from "react-native-phone-number-input";
import moment from 'moment'
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import Input from '../../components/InputField';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import ButtonLarge from '../../components/ButtonLarge';
import { registerUserFN, verificationCodeAction } from '../../redux/actions/Auth';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';



var windowWidth = Dimensions.get('window').width;

{/* Fix for FLIGHT-46 */}
export default function RegisterScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentUser, loading } = useSelector(({ authRed }) => authRed)
    const {t} = useTranslation()


    const [email, setEmail] = useState('');
    const [cellno, setCellNo] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const phoneInput = useRef()
    const [dialCode, setDialCode] = useState('');

    ///////////////////////////////////Get Code For Phone Verification/////////////////////////////
    const getVerificationCode = () => {
         const formattedPhoneNo = `${dialCode}${cellno}`;
        if(!phoneInput.current?.isValidNumber(formattedPhoneNo)){
            Toast.show({
                type: 'info',
                text2: "Invalid phone number",
            })
            return
        }

        if (name == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your name",
            })
            return
        }
        if (password == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your password",
            })
            return
        }
        if (cellno == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your phone number",
            })
            return
        }
        if (email == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your email",
            })
            return
        }

        const form_data = new FormData()
        form_data.append("phoneNumber", formattedPhoneNo)

        dispatch(verificationCodeAction(
            form_data,
            () => {
                setEmail("")
                setCellNo("")
                setName("")
                setPassword("")
            },
            () => {
                console.log("cell no",formattedPhoneNo)
                navigation.navigate("VerifyPhone", { name: name, password: password, formattedPhoneNo: formattedPhoneNo, cellno: cellno, email: email })
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid Credentials",
                })
            }
        ))

    }

    const getTokenAndSave = (userId, userToken) => {
        messaging()
            .getToken()
            .then(deviceToken => {
                var data = {
                    admin_id: userId,
                    deveice_token: deviceToken
                }
                dispatch(SaveDeviceToken(data, userToken))
            });
        return messaging().onTokenRefresh(deviceToken => {
        });
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

                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', textAlign:'left' }]}>{t('common.register')}</TextBold>
                {/* TextInputs For Login */}
                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 12) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.fullName')}</TextBold>

                <Input
                    placeholder="John doe"
                    onChangeText={text => setName(text)}
                    value={name}
                    secureTextEntry={false}
                />

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.email')}</TextBold>

                <Input
                    placeholder="myemail@flighteno.com"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    secureTextEntry={false}
                />

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.password')}</TextBold>

                <Input
                    placeholder="**************"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />


                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.phoneNum')}</TextBold>

                <PhoneInput
                    ref={phoneInput}
                    defaultValue={cellno}
                    defaultCode="AU"
                     
                    onChangeText={(text) => {
                        setCellNo(text)
                    }}
                    onChangeCountry={(country) =>{
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
                        fontFamily:'GilroyRegular'
                    }}
                />


                <View style={{ marginTop: (windowWidth * 20) / 100, }}>
                    <ButtonLarge
                        title={t('common.register')}
                        loader={loading}
                        onPress={() => getVerificationCode()}
                    />
                </View>

                <View style={styles.bottomTxt}>
                    <TextBold style={styles.loginInputHeading}>
                        {t('common.dontHaveAccount')}?
                    </TextBold>

                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <TextBold style={[styles.loginInputHeading, { textDecorationLine: 'underline', color: '#B52551' }]}> {t('common.login')}</TextBold>
                    </TouchableOpacity>
                </View>


            </ScrollView>

        </View>
    );

}