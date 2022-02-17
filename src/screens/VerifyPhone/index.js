import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { verifyOtpCodeAction, verificationCodeAction, SaveDeviceToken } from '../../redux/actions/Auth';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import { useTranslation } from 'react-i18next';
import TextBold from '../../components/atoms/TextBold';


var windowWidth = Dimensions.get('window').width;
var nameParam = ''
var emailParam = ''
var passwordParam = ''
var formattedCellNoParam = ''
var cellNoParam = ''
export default function VerifyPhone({ route }) {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { loading } = useSelector(({ authRed }) => authRed)


    const [code, setcode] = useState('')
    const [userCell, setUserCell] = useState('')
    const {t} = useTranslation()

    useEffect(() => {
        nameParam = route.params.name
        emailParam = route.params.email
        passwordParam = route.params.password
        cellNoParam = route.params.cellno
        formattedCellNoParam = route.params.formattedPhoneNo

        setUserCell(formattedCellNoParam)

    }, []);



    ///////////////////////////////////Get Code For Phone Verification/////////////////////////////
    const VeryfyPhoneFunction = () => {

        // console.log(code)

        if (code == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your verification code",
            })
            return
        }

        const register_data = new FormData()
        register_data.append("fullName", nameParam)
        register_data.append("email", emailParam)
        register_data.append("phoneNumber", cellNoParam)
        register_data.append("password", passwordParam)
        register_data.append("date", moment().format("YYYY-MM-DD hh:mm:ss"))


        // console.log(register_data)
        const form_data = new FormData()
        form_data.append("code", code)
        form_data.append("phoneNumber", formattedCellNoParam)

        dispatch(verifyOtpCodeAction(
            form_data,
            () => {
                setcode("")

            },
            () => {
                navigation.navigate("SelectProfile")
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid Credentials",
                })
            },
            register_data,
            (userId, userToken) => {
                getTokenAndSave(userId, userToken);
            }
        ))

    }



    const resendOtp = () => {

        const form_data = new FormData()
        form_data.append("phoneNumber", formattedCellNoParam)

        dispatch(verificationCodeAction(
            form_data,
            () => {
                setcode("")

            },
            () => {
                console.log("")
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid OTP",
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

                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%',textAlign:'left' }]}>{t('common.verifyPhone')}</TextBold>

                <Text style={[styles.verifyPhonTxt, { marginTop: (windowWidth * 10) / 100, textAlign:'left'}]}>{t('common.verCodeSentTo')}</Text>
                <Text style={styles.verifyPhonTxt}>{userCell}</Text>


                <OTPInputView
                    style={styles.otpInputSyle}
                    pinCount={4}
                    keyboardType="phone-pad"
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code => {
                        setcode(code)
                    })}
                />


                <Text style={[styles.verifyPhonTxt, { alignSelf: 'center', marginLeft: '0%', fontSize: 17, marginTop: (windowWidth * 15) / 100, textAlign:'center' }]}>{t('common.didntRecCode')}?</Text>
                <TouchableOpacity onPress={() => resendOtp()}>
                    <Text style={styles.resentPassTxt}>{t('common.resend')} OTP</Text>
                </TouchableOpacity>

                <View style={{ marginTop: (windowWidth * 30) / 100, marginBottom: 20 }}>
                    <ButtonLarge
                        title={t('common.verifyAccount')}
                        loader={loading}
                        onPress={() => VeryfyPhoneFunction()}
                    />
                </View>


            </ScrollView>

        </View>
    );

}