import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';

import ButtonWithImage from '../../components/ButtonWithImage';
import Input from '../../components/InputField';
import ButtonLarge from '../../components/ButtonLarge';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { LoginAction, SocialLogin, SaveDeviceToken } from '../../redux/actions/Auth';
import { IS_LOADING } from '../../redux/constants';
import {
    LoginManager,
    AccessToken,
    Profile,
    Settings
} from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import TextBold from '../../components/atoms/TextBold';
import { useTranslation } from 'react-i18next';
// import { TextExtrabold } from '../../components/atoms/TextExtraBold';

const clientID = "274927645478-6jq3vb9mph0j7kud7knkq5sciir7uv4c.apps.googleusercontent.com"
GoogleSignin.configure({
    androidClientId: clientID,
    offlineAccess: false
});

Settings.initializeSDK();
var windowWidth = Dimensions.get('window').width;

{/* Fix for FLIGHT-46 */}
export default function LoginScreen() {

    //i18n.changeLanguage()

    const {t} = useTranslation()
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { loading, loadingFacebook, loadingGoogle } = useSelector(({ authRed }) => authRed)

    useEffect(() => {
        dispatch({ type: IS_LOADING, isloading: false })
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginFunction = () => {
        if (email == "") {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please, enter your email",
            })
            return
        }
        if (password == "") {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please, enter your password",
            })
            return
        }

        var obj = {
            email_address: email.trim().toLowerCase(),
            password: password.trim().toLowerCase()
        }

        dispatch(LoginAction(
            obj,
            () => {
                setEmail("")
                setPassword("")
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Invalid Credentials",
                })
            },
            (userId, userToken) => {
                getTokenAndSave(userId, userToken);
            }
        ))
    }

    const socialLogin = (userData, source) => {
        var obj = {
            full_name: userData.name,
            email_address: userData.email,
            phone_number: "",
            password: "",
            signup_source: source,
            profile_image: source == 'google' ? userData.photo : userData.picture.data.url
        }
        dispatch(SocialLogin(
            obj,
            (userId, userToken) => {
                getTokenAndSave(userId, userToken);
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

    async function onFacebookButtonPress() {
        LoginManager.logOut()
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    const currentProfile = Profile.getCurrentProfile().then(
                        function (currentProfile) {
                            if (currentProfile) {
                            }
                        },
                        AccessToken.getCurrentAccessToken().then((data) => {
                            const { accessToken } = data
                            initUser(accessToken)
                        })
                    );
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    const initUser = (token) => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,location,first_name,picture,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                socialLogin(json, 'facebook')
            })
            .catch((err) => {
                console.log('ERROR GETTING DATA FROM FACEBOOK', err)
            })
    }

    // Somewhere in your code
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            socialLogin(userInfo.user, "google")
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            } else {
            }
        }
    };

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>

                <View style={[styles.monoBarSplash, { justifyContent: 'center', marginLeft: '0%', marginTop: (windowWidth * 7) / 100 }]}>
                    <Image
                        style={styles.monoImg}
                        resizeMode='stretch'
                        source={require('../../images/mono.png')}
                    />
                </View>

                <TextBold  style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>{t('common.login')}</TextBold>
                {/* <TextExtrabold>Hello</TextExtrabold> */}
                {/* Buton fb gmail Login */}
                <View style={styles.fbBtnContainer}>
                    <ButtonWithImage
                        img={require("../../images/fb.png")}
                        title={t('common.loginWithFb')}
                        onPress={() => onFacebookButtonPress()}
                        loader={loadingFacebook}
                    />
                </View>

                <View style={styles.GmailBtnContainer}>
                    <ButtonWithImage
                        img={require("../../images/gmail.png")}
                        title={t('common.loginWithGoogle')}
                        onPress={() => signIn()}
                        loader={loadingGoogle}
                    />
                </View>


                {/* TextInputs For Login */}
                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 12) / 100, marginBottom: (windowWidth * 2) / 100 }]}>{t('common.email')}</TextBold>
                <Input
                    placeholder="myemail@flighteno.com"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    secureTextEntry={false}
                />

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>{t('common.password')}</TextBold>
                <Input
                    placeholder="*********"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />

                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <TextBold style={[styles.loginInputHeading, { textDecorationLine: 'underline', alignSelf: 'center', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 10) / 100 }]}>{t('common.forgotPass')}</TextBold>
                </TouchableOpacity>

                <ButtonLarge
                    title={t('common.login')}
                    loader={loading}
                    onPress={() => loginFunction()}
                />


                <View style={styles.bottomTxt}>
                    <TextMedium style={styles.loginInputHeading}>
                    {t('common.dontHaveAccount')}
                    </TextMedium>


                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <TextBold style={[styles.loginInputHeading, { textDecorationLine: 'underline', color: '#B52551' }]}> {t('common.signup')}</TextBold>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    );

}