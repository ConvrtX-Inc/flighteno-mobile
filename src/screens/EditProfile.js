import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import PhoneInput from 'react-native-phone-input'
import { launchImageLibrary } from 'react-native-image-picker';
import Input from '../components/InputField';
import ButtonLarge from '../components/ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { UpdateProfile } from '../redux/actions/Auth';
import { generateUID } from '../Utility/Utils';
import { RNS3 } from 'react-native-aws3';
import { IS_LOADING } from '../redux/constants';
import { useTranslation } from 'react-i18next';
import TextBold from '../components/atoms/TextBold';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryPicker from 'react-native-country-picker-modal';

var windowWidth = Dimensions.get('window').width;

export default function EditProfile() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentUser, loading, token } = useSelector(({ authRed }) => authRed)
    const [fullName, setFullName] = useState(currentUser?.full_name);
    const [image, setImage] = useState(null)
    const[phone,setPhone] = useState(currentUser?.phone_number)
    const phoneInput = useRef()
    const {t} = useTranslation()
    const [isPickerOpen, setPickerOpen] = useState(false)
    const [imageValid, setImageValid] = useState(true)
    
    useEffect(() => {
        console.log(currentUser)
    },[])

    const chooseFile = () => {
        let options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                setImage(response.assets[0]);
            }
        });
    };

    const updateProfile = () => {
        if (fullName == "") {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please, enter full name",
            })
            return
        }
        if (image == null && (fullName == currentUser.full_name)) {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Nothing to update",
            })
            return
        }
        if (!image) {
            var obj = {
                admin_id: currentUser._id,
                full_name: fullName,
                profile_image: currentUser.profile_image,
            }

            dispatch(UpdateProfile(
                obj, token,
                () => {
                    navigation.goBack()
                }
            ))
        }
        else {
            dispatch({ type: IS_LOADING, isloading: true })
            const file = {
                uri: image.uri,
                name: generateUID() + ".jpg",
                type: 'image/jpeg'
            }
            const options = {
                keyPrefix: "flighteno/users/",
                bucket: "memee-bucket",
                region: "eu-central-1",
                accessKey: "AKIA2YJH3TLHCODGDKFV",
                secretKey: "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",
                successActionStatus: 201
            }
            RNS3.put(file, options).then(response => {
                if (response.status !== 201)
                    throw new Error("Failed to upload image to S3");
                var obj = {
                    admin_id: currentUser._id,
                    full_name: fullName,
                    profile_image: response.body.postResponse.location,
                }

                dispatch(UpdateProfile(
                    obj, token,
                    () => {
                        navigation.goBack()
                    }
                ))

            });
        }
    }

    return (
        <SafeAreaView style={{flex:1, marginLeft:18, marginRight:18}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backImg}
                            resizeMode='stretch'
                            source={require('../images/back.png')}
                        />
                    </TouchableOpacity>

                    <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100,  textAlign:'left' }]}>{t('common.editProfile')}</TextBold>

                    <TouchableOpacity onPress={chooseFile} style={Styles.profileButton}>
                        <Image
                            // source={imageValid ?  !currentUser.profile_image && image == null ? require("../images/manProfile.png") : { uri: image == null ? currentUser.profile_image : image.uri }}
                          source={imageValid ? {uri: currentUser.profile_image } : require("../images/manProfile.png")}
                          style={styles.profileImage} 
                          onError={() => setImageValid(false)}
                          />
                    </TouchableOpacity>

                    <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.fullName')}</TextBold>

                    <Input
                        placeholder={fullName}
                        onChangeText={text => setFullName(text)}
                        value={fullName}
                    />

                    <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.email')}</TextBold>

                    <Input
                        placeholder="myemail@flighteno.com"
                        onChangeText={text => setEmail(text)}
                        value={currentUser.email_address}
                        secureTextEntry={false}
                        editable={false}
                    />

                    <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('common.phoneNum')}</TextBold>
                   
                    <PhoneInput
                    ref={phoneInput}
                    onPressFlag={() => {
                    // countryPicker.current?.open()
                    setPickerOpen(!isPickerOpen)
                    }}
                    initialValue={phone}
                    textProps={{
                        placeholder:'123-456-789'
                    }}
                    onChangePhoneNumber={setPhone}
            
            // disabled={email ? true : false}
            // disabled={!isPhoneEnabled}
            style={[styles.phoneContainer, {padding:16}]}
         />

                    <View style={{ marginTop: (windowWidth * 10) / 100, marginBottom: 20 }}>
                        <ButtonLarge
                            title={t('common.save')}
                            loader={loading}
                            onPress={updateProfile}
                        />
                    </View>
               
        {isPickerOpen && (
        <CountryPicker 
            visible={true}
            onClose={() => {
                setPickerOpen(!isPickerOpen)
            }}
            
            onSelect={(country) => {
                // console.log(country?.cca2)
                // setInitialCountry(country?.cca2.toLowerCase())
                // setInitialCountry(country)
                phoneInput.current?.selectCountry(country?.cca2.toLowerCase())
            }}
            withFilter={true}
        />    
        )}

       
        </SafeAreaView>
    );

}

const Styles = StyleSheet.create({
    profileButton: {
        alignSelf: 'center',
        marginTop: 30
    }
})