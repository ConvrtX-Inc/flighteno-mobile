import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import { useSelector, useDispatch } from 'react-redux'
import { AirbnbRating, Rating } from 'react-native-elements';
import ButtonLarge from '../../components/ButtonLarge';
import CardOrder from '../../components/CardOrder';
import InputMultiline from '../../components/inputFieldMultiLine';
import Icon from 'react-native-vector-icons/Entypo'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { generateUID } from '../../Utility/Utils';
import Toast from 'react-native-toast-message';
import { RNS3 } from 'react-native-aws3';
import { SubmitReview } from '../../redux/actions/Reviews';
import { IS_LOADING } from '../../redux/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBold from '../../components/atoms/TextBold';
import { useTranslation } from 'react-i18next';
var windowWidth = Dimensions.get('window').width;

export default function RateTransaction({ route }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [userRating, setUserRating] = useState(0)
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [imagesUrl, setImagesUrl] = useState([])
    const [videosUrl, setVideosUrl] = useState([])
    const [message, setMessage] = useState('')
    const { order } = route.params
    const {t} = useTranslation()

    const chooseMedia = (type) => {
        let options = {
            selectionLimit: 0,
            mediaType: type,
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
                if (type == "photo") {
                    setImages(response.assets)
                }
                else {
                    setVideos(response.assets)
                }
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

    const checkValidation = () => {
        if (userRating == 0) {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please select rating",
            })
            return
        }
        else {
            if (images.length == 0 && videos.length == 0) {
                submitRating()
            }
            else {
                uploadPhotos()
            }
        }
    }

    const submitRating = () => {
        var data = {
            buyer_admin_id: currentUser._id,
            traveler_admin_id: order.traveler_id[0].traveler_id,
            order_id: order._id,
            rating: parseInt(userRating),
            description: message,
            image_url: imagesUrl,
            video_url: videosUrl
        }
        dispatch(SubmitReview(data, token, () => {
            navigation.navigate("BottomTab", { screen: "Track", params: { screen: "Transactions" } })
        }, () => {
            Toast.show({
                type: 'success',
                text1: 'Alert!',
                text2: "Thanks for your response!",
            })
        }))
    }

    const uploadPhotos = () => {
        if (images.length != 0) {
            dispatch({ type: IS_LOADING, isloading: true })
            images.forEach(element => {
                const file = {
                    uri: element.uri,
                    name: generateUID() + ".jpg",   
                    type: 'image/jpeg'
                }
                const options = {
                    keyPrefix: "flighteno/reviews/",
                    bucket: "memee-bucket",
                    region: "eu-central-1",
                    accessKey: "AKIA2YJH3TLHCODGDKFV",
                    secretKey: "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",
                    successActionStatus: 201
                }
                RNS3.put(file, options).then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    imagesUrl.push(response.body.postResponse.location)
                    setImagesUrl([...imagesUrl]);
                    if (images.length == imagesUrl.length) {
                        uploadVideos()
                    }
                });

            })
        }
        else {
            uploadVideos()
        }
    }

    const uploadVideos = () => {
        if (videos.length != 0) {
            dispatch({ type: IS_LOADING, isloading: true })
            videos.forEach(element => {
                const file = {
                    uri: element.uri,
                    name: generateUID() + ".jpg",
                    type: 'image/jpeg'
                }
                const options = {
                    keyPrefix: "flighteno/reviews/",
                    bucket: "memee-bucket",
                    region: "eu-central-1",
                    accessKey: "AKIA2YJH3TLHCODGDKFV",
                    secretKey: "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",
                    successActionStatus: 201
                }
                RNS3.put(file, options).then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    videosUrl.push(response.body.postResponse.location)
                    setVideosUrl([...videosUrl]);
                    if (videos.length == videosUrl.length) {
                        submitRating()
                    }
                });

            })
        }
        else {
            submitRating()
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{ flex: 1, backgroundColor: color.backgroundColor, marginLeft:18, marginRight:18 }}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../images/back.png')}
                    />
                </TouchableOpacity>
                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginBottom: 20 }]}>{t('track.rateTransaction')}</TextBold>
                <CardOrder
                    order={order}>
                </CardOrder>
                <AirbnbRating
                    defaultRating={userRating}
                    type='star'
                    ratingCount={5}
                    size={45}
                    showRating={false}
                    onFinishRating={(rating) => setUserRating(rating)}
                />
                <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>{}</TextBold>
                <View style={Styles.boxView}>
                    <TouchableOpacity onPress={() => chooseMedia('photo')}>
                        <View style={styles.imgPickView}>
                            <Image
                                style={styles.cameraImgStyle}
                                resizeMode='stretch'
                                source={require('../../images/cameraImg.png')}
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

                <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Add Video</TextBold>
                <View style={Styles.boxView}>
                    <TouchableOpacity onPress={() => chooseMedia('video')}>
                        <View style={styles.imgPickView}>
                            <Image
                                style={styles.cameraImgStyle}
                                resizeMode='stretch'
                                source={require('../../images/cameraImg.png')}
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
                <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Enter Description</TextBold>
                <InputMultiline
                    placeholder="Share your experience with us."
                    onChangeText={text => setMessage(text)}
                    value={message}
                />
                <View style={{ marginVertical: 30 }}>
                    <ButtonLarge
                        title="Submit"
                        loader={loading}
                        onPress={() => checkValidation()}
                    />
                </View>
            </ScrollView>
        </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    listView: {
        paddingVertical: 20,
        backgroundColor: color.inputBackColor,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    upperView: {
        paddingHorizontal: '5%'
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomView: {
        paddingHorizontal: '5%',
        marginTop: 20,

    },
    productImage: {
        height: 90,
        width: '100%',
        borderRadius: 10
    },
    priceText: {
        fontSize: 16,
        fontWeight: '900',
        color: color.skipTextColor
    },
    dateView: {
        height: 32,
        width: 90,
        borderRadius: 20,
        backgroundColor: color.lightBlue,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    dateText: {
        fontSize: 14,
        color: color.backgroundColor,
    },
    userView: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginVertical: 20,
        alignItems: 'center'
    },
    productImageContainer: {
        height: 200,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: color.inputBackColor
    },
    innerImage: {
        height: 60,
        width: 70
    },
    bottomText: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 20,
        color: color.skipTextColor,
        textTransform: "uppercase"
    },
    boxView: {
        flexDirection: 'row',
        // marginLeft: '5%'
    },
    crossButton: {
        marginLeft: -35,
        marginTop: -5,
    }
})