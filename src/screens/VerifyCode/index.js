import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import { verificationCodeAction, verifyOtpCodeResetPasswordAction } from '../../redux/actions/Auth';
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
    const [userCell, setUserCell] = useState('')
    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    const startingMins = 10
    let time = startingMins * 60

    // const [seconds, setSeconds] = useState(0)
    // const [minutes, setMinutes] = useState(0)

    const [counter, setCounter] = useState(60)

    useEffect(() => {

        cellNoParam = route.params.cellNo
        setUserCell(cellNoParam)

        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)


    }, [counter]);

    const calculateTimeLeft = (duration) => {
        
        let timeLeft = {
            mins: Math.floor((duration % 3600) / 60),
            secs: duration % 60
        }

        return timeLeft

    }


    const secondsToTime = (secs) => {
        
        let hours = Math.floor(secs/(60*60))

        let divisorForMinutes = secs % (60*60)
        let minutes = Math.floor(divisorForMinutes/60)

        let divisorForSeconds = divisorForMinutes * 60
        let seconds = Math.ceil(divisorForSeconds)

        let obj = {
            "h":hours,
            "m":minutes,
            "s":seconds
        }

        return obj

    }

    const startTimer = () => {

    }

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
        form_data.append("phoneNumber", cellNoParam)

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

        setCounter(60)
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
                </> : <TextRegular style={{textAlign:'center', marginBottom:16, fontSize:18}}>{counter}</TextRegular>}
             

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