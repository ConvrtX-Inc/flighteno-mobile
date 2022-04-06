import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import PhoneInput from 'react-native-phone-input'
import { launchImageLibrary } from 'react-native-image-picker';
import Input from '../components/InputField';
import ButtonLarge from '../components/ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { UpdateProfile } from '../redux/actions/Auth';
import { generateImagePublicURLFirebase, generateUID } from '../Utility/Utils';
import { RNS3 } from 'react-native-aws3';
import { IS_LOADING } from '../redux/constants';
import { useTranslation } from 'react-i18next';
import TextBold from '../components/atoms/TextBold';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryPicker from 'react-native-country-picker-modal';
import storage from '@react-native-firebase/storage';


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
    const [transferred, setTransferred] = useState(0)
    
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

            if(response?.didCancel){
                console.log('User cancelled image picker');
            }else{
                setImage(response?.assets[0])
            }

            // if (response.didCancel) {
            //     console.log('User cancelled image picker');
            // } else if (response.error) {
            //     console.log('ImagePicker Error: ', response.error);
            // } else if (response.customButton) {
            //     console.log(
            //         'User tapped custom button: ',
            //         response.customButton
            //     );
            //     alert(response.customButton);
            // } else {
            //     setImage(response.assets[0]);
            // }
        });
    };

    const uploadImgToFirebase = async (uri) => {

        const filename = uri.substring(uri.lastIndexOf('/') + 1)
        const uploadUri = Platform.OS == 'ios' ? uri.replace('file://', '') : uri
        const task = storage()
        .ref(`${filename}`)
        .putFile(`${uploadUri}`)

        task.on('state_changed', snapshot => {
            const percentUploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            setTransferred(percentUploaded)
        })

        try{

            const resImg = await task

            const idImage = generateImagePublicURLFirebase(resImg.metadata.name)

            var obj = {
                admin_id: currentUser._id,
                full_name: fullName,
                phone_number:phone,
                profile_image: idImage,
            }

            dispatch(UpdateProfile(
                obj, token,
                () => {
                    dispatch({ type: IS_LOADING, isloading: false})
                    navigation.goBack()
                }
            ))

        }catch(e){
            console.log('errooooorrrrr', e);
        }

    }

    const updateProfile = () => {
    
        if (fullName == "") {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please, enter full name",
            })
            return
        }
        if (image == null && (fullName == currentUser.full_name) && phone == null) {
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
                phone_number: phone
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
            uploadImgToFirebase(image?.uri)
            
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