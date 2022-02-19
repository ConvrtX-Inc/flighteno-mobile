import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import { otpResetPasswordAction, verificationCodeAction, verifyOtpCodeResetPasswordAction } from '../../redux/actions/Auth';
import { useTranslation } from 'react-i18next';
import TextBold from '../../components/atoms/TextBold';
import TextRegular from '../../components/atoms/TextRegular';
import moment from 'moment';




var windowWidth = Dimensions.get('window').width;
var cellNoParam = ""
export default function VerifyCode({ route }) {

    const navigation = useNavigation();
    const { loading } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()
    const {t} = useTranslation()


    const [code, setcode] = useState('')
    const [userCell, setUserCell] = useState(route.params?.cellNo)
    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    const startingMins = 10
    let time = startingMins * 60

    // const [seconds, setSeconds] = useState(0)
    // const [minutes, setMinutes] = useState(0)

    const [counter, setCounter] = useState(120)

    useEffect(() => {

        // cellNoParam =
        // setUserCell(cellNoParam)

        // console.log(userCell)

        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)



    }, [counter]);



    const verifyCodeFN = () => {

        if (code.length < 4) {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your otp code",
            })
            return
        }

        const form_data = new FormData()
        form_data.append("code", code)
        form_data.append("phoneNumber", cellNoParam)


        dispatch(verifyOtpCodeResetPasswordAction(
            form_data,
            () => {
                setcode("")
            },
            () => {
                navigation.navigate('NewPassword', { cellno: cellNoParam })
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid OTP",
                })
            },

        ))

    }

    /*Fix for FLIGHT-6*/
    const resendOtp = () => {
       

        const form_data = new FormData()
        form_data.append("type", 'phone')
        form_data.append("data", userCell)


        // dispatch(verificationCodeAction(
        //     form_data,
        //     () => {
        //         setcode("")
        //     },
        //     () => {
        //         console.log("")
        //     },
        //     () => {
        //         Toast.show({
        //             type: 'error',
        //             text1: 'Alert!',
        //             text2: "Invalid OTP",
        //         })
        //     }
        // ))

        dispatch(otpResetPasswordAction(
            form_data,
            () => {
                // setCellNo("")
                // setCellNoShow("")
                // setEmail("")
            },
            (cellNo) => {
                console.log('success:'+cellNo)
                // navigation.navigate("VerifyCode", { cellNo: cellno.length >= 6 ? cellno : cellNo })
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid Credentials",
                })
            },

        ))

        setCounter(120)
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

                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', textAlign:'left' }]}>{t('common.verifyCode')}</TextBold>

                <TextRegular style={[styles.verifyPhonTxt, { marginTop: (windowWidth * 10) / 100,textAlign:'left' }]}>{t('common.verCodeSentTo')}</TextRegular>
                <TextRegular style={styles.verifyPhonTxt}>{userCell}</TextRegular>


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
                {/* Fix for FLIGHT-6 */}
                
             {counter == 0 ?    
                <>
                <TextRegular style={[styles.verifyPhonTxt, { alignSelf: 'center', marginLeft: '0%', fontSize: 17, marginTop: (windowWidth * 15) / 100 }]}>{t('common.didntRecCode')}?</TextRegular>
                <TouchableOpacity onPress={() => resendOtp()}>
                    <TextBold style={styles.resentPassTxt}>{t('common.resend')} OTP</TextBold>
                </TouchableOpacity>
                </> :  <TextRegular style={{textAlign:'center', marginBottom:16, fontSize:16, marginTop:24}}>{counter} seconds left</TextRegular>} 

            </ScrollView>


            <View style={{ marginTop: (windowWidth * 30) / 100, marginBottom: 20 }}>
              
                <ButtonLarge
                    title={t('common.verifyAccount')}
                    loader={loading}
                    onPress={() => verifyCodeFN()}
                />
            </View>


        </View>
    );

}