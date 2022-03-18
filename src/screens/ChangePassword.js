import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import Input from '../components/InputField';
import ButtonLarge from '../components/ButtonLarge';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { CheckSamePasswordAction, UpdatePassword } from '../redux/actions/Auth';
import { useTranslation } from 'react-i18next';
import TextBold from '../components/atoms/TextBold';
import TextRegular from '../components/atoms/TextRegular';
import { SafeAreaView } from 'react-native-safe-area-context';

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

        // var samePassObj = {
        //     phone_number: 
        // }

        // dispatch(CheckSamePasswordAction())

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
        <SafeAreaView style={{flex:1, marginLeft:18, marginRight:18}}>
 <View style={styles.ScreenCss}>

<ScrollView>

    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
            style={styles.backImg}
            resizeMode='stretch'
            source={require('../images/back.png')}
        />
    </TouchableOpacity>

    <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100,  textAlign:'left' }]}>{t('common.changePass')}</TextBold>

    <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left'}]}>{t('common.oldPass')}</TextBold>

    <Input
        placeholder={t('common.oldPass')}
        onChangeText={text => setOldPassword(text)}
        value={oldPassword}
        secureTextEntry={false}
        
    />
    <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.enterNewPass')}</TextBold>

    <Input
        placeholder={t('common.newPass')}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
    />

    <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.confirmPass')}</TextBold>

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
        </SafeAreaView>
    );

}

const Styles = StyleSheet.create({
    profileButton: {
        alignSelf: 'center',
        marginTop: 30
    }
})