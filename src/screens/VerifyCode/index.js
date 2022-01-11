import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import { verifyOtpCodeResetPasswordAction } from '../../redux/actions/Auth';




var windowWidth = Dimensions.get('window').width;
var cellNoParam = ""
export default function VerifyCode({ route }) {

    const navigation = useNavigation();
    const { loading } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()



    const [email, setEmail] = useState('');
    const [cellno, setCellNo] = useState('');
    const [code, setcode] = useState('')
    const [userCell, setUserCell] = useState('')


    useEffect(() => {

        cellNoParam = route.params.cellNo
        setUserCell(cellNoParam)


    }, []);



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

                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Verify code</Text>

                <Text style={[styles.verifyPhonTxt, { marginTop: (windowWidth * 10) / 100, }]}>Verification code sent to</Text>
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





            </ScrollView>


            <View style={{ marginTop: (windowWidth * 30) / 100, marginBottom: 20 }}>
                <ButtonLarge
                    title="Verify account"
                    loader={loading}
                    onPress={() => verifyCodeFN()}
                />
            </View>


        </View>
    );

}