import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import { newPaswordCreationAction } from '../../redux/actions/Auth';


var windowWidth = Dimensions.get('window').width;
export default function NewPassword({ route }) {

    const navigation = useNavigation();
    const { loading } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const phoneInput = useRef()

    useEffect(() => {
        cellNoParam = route.params.cellno
    }, []);



    const setNewpasswordFN = () => {

        if (password == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your Password",
            })
            return
        }

        if (confirmPass == "") {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Please, enter your Confirm Password",
            })
            return
        }

        if (confirmPass != password) {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Password you entered is not same",
            })
            return
        }

        var obj = {
            phone_number: cellNoParam,
            password: password,
            confirmed_password: confirmPass
        }

        dispatch(newPaswordCreationAction(
            obj,
            () => {
                setPassword("")
                setConfirmPass("")
            },
            () => {
                navigation.navigate('LoginScreen')
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

                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Create new password</Text>

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 12) / 100, marginBottom: (windowWidth * 2) / 100 }]}>
                    Your password must be different from previous used password.
                </Text>


                {/* TextInputs For Reset Password */}


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Enter new password</Text>

                <Input
                    placeholder="************"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Confirm new password</Text>

                <Input
                    placeholder="************"
                    onChangeText={text => setConfirmPass(text)}
                    value={confirmPass}
                    secureTextEntry={true}
                />







                <View style={{ marginTop: (windowWidth * 20) / 100, marginBottom: 35 }}>
                    <ButtonLarge
                        title="Verify Account"
                        loader={loading}
                        onPress={() => setNewpasswordFN()}
                    />
                </View>




            </ScrollView>

        </View>
    );

}