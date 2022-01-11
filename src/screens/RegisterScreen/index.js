import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import PhoneInput from "react-native-phone-number-input";
import moment from 'moment'
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import { registerUserFN, verificationCodeAction } from '../../redux/actions/Auth';

import { useDispatch, useSelector } from 'react-redux';



var windowWidth = Dimensions.get('window').width;

export default function RegisterScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentUser, loading } = useSelector(({ authRed }) => authRed)


    const [email, setEmail] = useState('');
    const [cellno, setCellNo] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const phoneInput = useRef()

    ///////////////////////////////////Get Code For Phone Verification/////////////////////////////
    const getVerificationCode = () => {

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
        form_data.append("phoneNumber", cellno)

        dispatch(verificationCodeAction(
            form_data,
            () => {
                setEmail("")
                setCellNo("")
                setName("")
                setPassword("")
            },
            () => {
                navigation.navigate("VerifyPhone", { name: name, password: password, cellno: cellno, email: email })
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

                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Register</Text>



                {/* TextInputs For Login */}
                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 12) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Full name</Text>

                <Input
                    placeholder="John doe"
                    onChangeText={text => setName(text)}
                    value={name}
                    secureTextEntry={false}
                />

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Email</Text>

                <Input
                    placeholder="myemail@flighteno.com"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    secureTextEntry={false}
                />

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Password</Text>

                <Input
                    placeholder="**************"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Phone number</Text>

                <PhoneInput
                    ref={phoneInput}
                    defaultValue={cellno}
                    defaultCode="AU"
                    onChangeFormattedText={(text) => {
                        // setValue(text);
                        setCellNo(text)
                    }}
                    containerStyle={styles.phoneContainer}
                    textInputStyle={styles.phoneInput}
                    textContainerStyle={styles.phoneTextContainer}
                    codeTextStyle={styles.phoneCodeText}
                    textInputProps={{
                        placeholderTextColor: "#707070",
                        keyboardType: "phone-pad",
                        placeholder: "123-456-789",

                    }}
                />


                <View style={{ marginTop: (windowWidth * 20) / 100, }}>
                    <ButtonLarge
                        title="Register"
                        loader={loading}
                        onPress={() => getVerificationCode()}
                    />
                </View>

                <View style={styles.bottomTxt}>
                    <Text style={styles.loginInputHeading}>
                        Don’t have an account?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={[styles.loginInputHeading, { textDecorationLine: 'underline', color: '#B52551' }]}> Login</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>

        </View>
    );

}