import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/InputField';
import InputMultiline from '../components/inputFieldMultiLine';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ButtonLarge from '../components/ButtonLarge';
import { color } from '../Utility/Color';
import Icon from 'react-native-vector-icons/Entypo'
import Toast from 'react-native-toast-message';
import { RNS3 } from 'react-native-aws3';
import { generateUID } from '../Utility/Utils'
import { customerSupport } from '../redux/actions/Auth';
import { IS_LOADING } from '../redux/constants';
import axios from 'axios'
import { BASE_URL } from '../BASE_URL';

var windowWidth = Dimensions.get('window').width;
export default function Support({ route }) {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [subject, setSubject] = useState('');
    const [orderNo, setOrderNo] = useState('')
    const [message, setMessage] = useState('')
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [imagesUri, setImagesUri] = useState([])
    const [videosUri, setVideosUri] = useState([])

    const chooseImages = () => {
        let options = {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false
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
                setImages(response.assets)
            }
        });
    };

    const chooseVideos = () => {
        let options = {
            selectionLimit: 0,
            mediaType: 'video',
            includeBase64: false
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
                setVideos(response.assets)
            }
        });
    };

    const removeImage = (index) => {
        images.splice(index, 1)
        setImages([...images])
    }

    const removeVideo = (index) => {
        videos.splice(index, 1)
        setVideos([...videos])
    }

    const uploadImageToS3 = async () => {
        dispatch({ type: IS_LOADING, isloading: true })
        if (images.length != 0) {
            images.forEach(element => {
                const file = {
                    uri: element.uri,
                    name: generateUID() + ".jpg",
                    type: element.type
                }
                const options = {
                    keyPrefix: "flighteno/support/",
                    bucket: "memee-bucket",
                    region: "eu-central-1",
                    accessKey: "AKIA2YJH3TLHCODGDKFV",
                    secretKey: "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",
                    successActionStatus: 201
                }
                RNS3.put(file, options).then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    imagesUri.push(response.body.postResponse.location)
                    setImagesUri([...imagesUri]);
                    if (imagesUri.length == images.length) {
                        if (videos.length != 0) {
                            uploadVideoToS3()
                        }
                        else {
                            sendSupport()
                        }
                    }
                });

            });
        }
        else {
            uploadVideoToS3()
        }
    }

    const uploadVideoToS3 = async () => {
        if (videos.length != 0) {
            videos.forEach(element => {
                const file = {
                    uri: element.uri,
                    name: generateUID() + ".mp4",
                    type: 'image/jpg'
                }
                const options = {
                    keyPrefix: "flighteno/support/",
                    bucket: "memee-bucket",
                    region: "eu-central-1",
                    accessKey: "AKIA2YJH3TLHCODGDKFV",
                    secretKey: "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",
                    successActionStatus: 201
                }
                RNS3.put(file, options).then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    videosUri.push(response.body.postResponse.location)
                    setVideosUri([...videosUri]);
                    if (videosUri.length == videos.length) {
                        sendSupport()
                    }
                });

            });
        }
        else {
            sendSupport()
        }
    }

    const contactSupport = () => {
        if (subject == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter a subject",
            })
            return
        }
        if (orderNo == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter your order number",
            })
            return
        }
        if (images.length == 0 && videos.length == 0) {
            sendSupport()
        }
        else {
            uploadImageToS3()
        }
    }

    const sendSupport = () => {
        dispatch({ type: IS_LOADING, isloading: true })
        var data1 = {
            order_id: orderNo,
            admin_id: currentUser._id
        }
        axios({
            method: 'post',
            url: `${BASE_URL}Rest_calls/varifyOrderId`,
            data: data1,
            headers: { "Authorization": token },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log("Error", error)
            dispatch({ type: IS_LOADING, isloading: false })

        }).then(response => {
            if (response.data.profileStatus == "Order id is wrong") {
                dispatch({ type: IS_LOADING, isloading: false })
                Toast.show({
                    type: "error",
                    text1: "Alert",
                    text2: response.data.profileStatus
                })
            }
            else {
                var data =
                {
                    order_number: orderNo,
                    subject: subject,
                    message: message,
                    image: imagesUri,
                    video: videosUri,
                    admin_id: currentUser._id,
                    profile_status: response.data.profileStatus
                }
                dispatch(customerSupport(data, token, () => {
                    navigation.navigate("CongratulationSupport")
                }))
            }
        });
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
                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Support</Text>


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Subject</Text>

                <Input
                    placeholder={"Write subject here..."}
                    onChangeText={text => setSubject(text)}
                    value={subject}
                    secureTextEntry={false}
                />

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Order No.</Text>

                <Input
                    placeholder="ex. 00235421151"
                    onChangeText={text => setOrderNo(text)}
                    value={orderNo}
                    secureTextEntry={false}
                />


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Your Message</Text>

                <InputMultiline
                    placeholder="What would you like to tell us?"
                    onChangeText={text => setMessage(text)}
                    value={message}
                />


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Upload pictures</Text>
                <View style={Styles.boxView}>
                    <TouchableOpacity onPress={() => chooseImages()}>
                        <View style={styles.imgPickView}>
                            <Image
                                style={styles.cameraImgStyle}
                                resizeMode='stretch'
                                source={require('../images/cameraImg.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            data={images}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <View style={{ marginRight: 10, flexDirection: 'row' }}>
                                    <View style={styles.imgPickShowStyle}>
                                        <Image source={{ uri: item.uri }}
                                            style={styles.imgPickShowStyle} resizeMode="cover" />
                                    </View>
                                    <TouchableOpacity onPress={() => removeImage(index)} style={Styles.crossButton}>
                                        <Icon name="cross" color={color.blueColor} size={36} />
                                    </TouchableOpacity>
                                </View>
                            }
                            keyExtractor={item => item.fileName}
                            style={{ marginLeft: 10, marginRight: 110 }}
                        />
                    </View>
                </View>

                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Upload Videos</Text>
                <View style={Styles.boxView}>
                    <TouchableOpacity onPress={() => chooseVideos()}>
                        <View style={styles.imgPickView}>
                            <Image
                                style={styles.cameraImgStyle}
                                resizeMode='stretch'
                                source={require('../images/cameraImg.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            data={videos}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <View style={{ marginRight: 10, flexDirection: 'row' }}>
                                    <View style={styles.imgPickShowStyle}>
                                        <Image source={{ uri: item.uri }}
                                            style={styles.imgPickShowStyle} resizeMode="cover" />
                                    </View>
                                    <TouchableOpacity onPress={() => removeVideo(index)} style={Styles.crossButton}>
                                        <Icon name="cross" color={color.blueColor} size={36} />
                                    </TouchableOpacity>
                                </View>
                            }
                            keyExtractor={item => item.fileName}
                            style={{ marginLeft: 10, marginRight: 110 }}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 30 }}>
                    <ButtonLarge
                        title="Submit"
                        loader={loading}
                        onPress={() => contactSupport()}
                    />
                </View>
            </ScrollView>
        </View>
    );

}

const Styles = StyleSheet.create({
    boxView: {
        flexDirection: 'row',
        marginLeft: '5%'
    },
    crossButton: {
        marginLeft: -35,
        marginTop: -5,
    }
})