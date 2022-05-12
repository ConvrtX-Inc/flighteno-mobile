import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import { CheckSamePasswordAction, newPaswordCreationAction } from '../../redux/actions/Auth';
import { useTranslation } from 'react-i18next';
import TextBold from '../../components/atoms/TextBold';
import { IS_LOADING } from '../../redux/constants';


var windowWidth = Dimensions.get('window').width;
export default function NewPassword({ route }) {

    const navigation = useNavigation();
    const { loading } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {cellno} = route?.params

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const phoneInput = useRef()

    useEffect(() => {
        // cellNoParam = route.params.cellno
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
            phone_number: cellno,
            password: password,
            confirmed_password: confirmPass
        }


        const samePassObj = new FormData()
        samePassObj.append('phone_number', cellno)
        samePassObj.append('password', password)

        dispatch(CheckSamePasswordAction(samePassObj,(data) => {
           console.log(data)
            if(data?.isOldPassword){
                dispatch({ type: IS_LOADING, isloading: false })
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: data?.Message,
                })
            }else{
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
        }))

        // dispatch(newPaswordCreationAction(
        //     obj,
        //     () => {
        //         setPassword("")
        //         setConfirmPass("")
        //     },
        //     () => {
        //         navigation.navigate('LoginScreen')
        //     },

        // ))

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

                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', textAlign:'left' }]}>{t('common.createNewPass')}</TextBold>

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 12) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>
                    {t('common.yourPasswordMust')}.
                </Text>


                {/* TextInputs For Reset Password */}


                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100,  textAlign:'left' }]}>{t('common.enterNewPass')}</TextBold>

                <Input
                    placeholder="************"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100,  textAlign:'left' }]}>{t('common.confirmNewPass')}</TextBold>

                <Input
                    placeholder="************"
                    onChangeText={text => setConfirmPass(text)}
                    value={confirmPass}
                    secureTextEntry={true}
                />







                <View style={{ marginTop: (windowWidth * 20) / 100, marginBottom: 35 }}>
                    <ButtonLarge
                        title={t('common.verifyAccount')}
                        loader={loading}
                        onPress={() => setNewpasswordFN()}
                    />
                </View>




            </ScrollView>

        </View>
    );

}