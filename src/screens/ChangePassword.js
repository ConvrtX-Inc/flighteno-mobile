import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import Input from '../components/InputField';
import ButtonLarge from '../components/ButtonLarge';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePassword } from '../redux/actions/Auth';
import { useTranslation } from 'react-i18next';
import TextBold from '../components/atoms/TextBold';

var windowWidth = Dimensions.get('window').width;

export default function ChangePassword() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentUser, loading, token } = useSelector(({ authRed }) => authRed)
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("")
    const {t} = useTranslation()

    const passwordChange = () => {
        if (oldPassword == "") {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please, enter old password",
            })
            return
        }
        if (password == "") {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please, enter new password",
            })
            return
        }

        if (password != cPassword) {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Password don't match",
            })
            return
        }

        var obj = {
            admin_id: currentUser._id,
            oldPassword: oldPassword,
            password: password,
            confirmed_password: cPassword
        }

        dispatch(UpdatePassword(
            obj, token,
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid old password",
                })
            },
            () => {
                navigation.goBack()
            }
        ))
    }

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../images/back.png')}
                    />
                </TouchableOpacity>

                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', textAlign:'left' }]}>{t('common.changePass')}</TextBold>

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left'}]}>{t('common.oldPass')}</Text>

                <Input
                    placeholder={t('common.oldPass')}
                    onChangeText={text => setOldPassword(text)}
                    value={oldPassword}
                    secureTextEntry={false}
                    
                />
                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.enterNewPass')}</Text>

                <Input
                    placeholder={t('common.newPass')}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.confirmPass')}</Text>

                <Input
                    placeholder={t('common.confirmPass')}
                    onChangeText={text => setCPassword(text)}
                    value={cPassword}
                    secureTextEntry={true}
                />

                <View style={{ marginTop: (windowWidth * 10) / 100, marginBottom: 20 }}>
                    <ButtonLarge
                        title={t('common.save')}
                        loader={loading}
                        onPress={passwordChange}
                    />
                </View>
            </ScrollView>
        </View>
    );

}

const Styles = StyleSheet.create({
    profileButton: {
        alignSelf: 'center',
        marginTop: 30
    }
})