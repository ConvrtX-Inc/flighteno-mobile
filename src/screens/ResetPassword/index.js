import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import PhoneInput from "react-native-phone-number-input";

import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { otpResetPasswordAction } from '../../redux/actions/Auth';
import { IS_LOADING } from '../../redux/constants';


var windowWidth = Dimensions.get('window').width;
export default function ResetPassword() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch({type: IS_LOADING, isloading: false})
    // })
    const { loading } = useSelector(({ authRed }) => authRed)



    const [email, setEmail] = useState('');
    const [cellno, setCellNo] = useState('');
    const [cellnoShow, setCellNoShow] = useState('');


    const phoneInput = useRef();

    const resetPasswordFN = () => {

        if (email == "" && cellno == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your email address or phone number",
            })
            return
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
            form_data.append("data", cellno)
        }

        
        console.log("DATA", form_data)
        dispatch(otpResetPasswordAction(
            form_data,
            () => {
                setCellNo("")
                setCellNoShow("")
                setEmail("")
            },
            (cellNo) => {
                navigation.navigate("VerifyCode", { cellNo: cellno.length >= 6 ? cellno : cellNo })
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

                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Reset password</Text>

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 12) / 100, marginBottom: (windowWidth * 2) / 100 }]}>
                    Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password
                </Text>


                {/* TextInputs For Reset Password */}


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Email</Text>

                <Input
                    placeholder="myemail@flighteno.com"
                    onChangeText={text => { setEmail(text) }}
                    value={email}
                    secureTextEntry={false}
                />




                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Phone number</Text>

                <PhoneInput
                    ref={phoneInput}
                    defaultValue={cellno}
                    defaultCode="AU"
                    onChangeFormattedText={(text) => {
                        setCellNo(text)

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
                        placeholderTextColor: "#707070",
                        keyboardType: "phone-pad",
                        value: cellnoShow,
                        placeholder: "123-456-789"
                    }}
                />


                <View style={{ marginTop: (windowWidth * 20) / 100, marginBottom: 35 }}>
                    <ButtonLarge
                        title="Verify Account"
                        loader={loading}
                        onPress={() => resetPasswordFN()}
                    />
                </View>




            </ScrollView>

        </View>
    );

}