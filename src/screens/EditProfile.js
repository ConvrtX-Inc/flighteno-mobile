import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import PhoneInput from "react-native-phone-number-input";
import { launchImageLibrary } from 'react-native-image-picker';
import Input from '../components/InputField';
import ButtonLarge from '../components/ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { UpdateProfile } from '../redux/actions/Auth';
import { generateUID } from '../Utility/Utils';
import { RNS3 } from 'react-native-aws3';
import { IS_LOADING } from '../redux/constants';

var windowWidth = Dimensions.get('window').width;

export default function EditProfile() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentUser, loading, token } = useSelector(({ authRed }) => authRed)
    const [fullName, setFullName] = useState(currentUser.full_name);
    const [image, setImage] = useState(null)
    const[phone,setPhone] = useState("")
    const phoneInput = useRef()
    
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
        <View style={styles.ScreenCss}>
            {currentUser ?
                <ScrollView>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backImg}
                            resizeMode='stretch'
                            source={require('../images/back.png')}
                        />
                    </TouchableOpacity>

                    <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Edit Profile</Text>

                    <TouchableOpacity onPress={chooseFile} style={Styles.profileButton}>
                        <Image
                            source={!currentUser.profile_image && image == null ? require("../images/manProfile.png") : { uri: image == null ? currentUser.profile_image : image.uri }}
                            style={styles.profileImage} />
                    </TouchableOpacity>

                    <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Full Name</Text>

                    <Input
                        placeholder={fullName}
                        onChangeText={text => setFullName(text)}
                        value={fullName}
                    />

                    <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Email</Text>

                    <Input
                        placeholder="myemail@flighteno.com"
                        onChangeText={text => setEmail(text)}
                        value={currentUser.email_address}
                        secureTextEntry={false}
                        editable={false}
                    />

                    <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Phone number</Text>
                   
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={currentUser.phone_number}
                        defaultCode={currentUser.country}
                        disabled={true}
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

                    <View style={{ marginTop: (windowWidth * 10) / 100, marginBottom: 20 }}>
                        <ButtonLarge
                            title="Save"
                            loader={loading}
                            onPress={updateProfile}
                        />
                    </View>
                </ScrollView>
                : null}
        </View>
    );

}

const Styles = StyleSheet.create({
    profileButton: {
        alignSelf: 'center',
        marginTop: 30
    }
})