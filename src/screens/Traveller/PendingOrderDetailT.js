import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, Modal, ScrollView, Platform } from 'react-native';
import { useNavigation, SwitchActions  } from '@react-navigation/native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import { useSelector, useDispatch } from 'react-redux'
import QRCode from 'react-native-qrcode-svg';
import ButtonTraveller from '../../components/ButtonTraveller';
import { launchImageLibrary } from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { formatAmount } from '../../Utility/Utils';
import ButtonLarge from '../../components/ButtonLarge';
import Toast from 'react-native-toast-message';
import { UpdateOrder, CompleteOrder } from '../../redux/actions/Trips'
import { generateUID } from '../../Utility/Utils';
import { RNS3 } from 'react-native-aws3';
import { IS_LOADING } from '../../redux/constants';
import ViewImages from '../../components/ViewImages'
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import TextBold from '../../components/atoms/TextBold';
import TextRegular from '../../components/atoms/TextRegular';
import ImageView from "react-native-image-viewing";

import storage from '@react-native-firebase/storage';

// Custom Imports
import { generateImagePublicURLFirebase } from '../../Utility/Utils';
import UploadProgressBar from '../../components/UploadProgressBart';
import { SafeAreaView } from 'react-native-safe-area-context';

var windowWidth = Dimensions.get('window').width;

var productUri = ""
var receiptUri = ""
export default function PendingOrderDetailT({ route }) {
    const { currentOrder } = route.params;
    // console.log('currentOrder', currentOrder)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [showModal, setSHowModal] = useState(false)
    const [productPic, setProductPic] = useState(currentOrder.new_image ? currentOrder.new_image : "")
    const [receiptPic, setReceiptPic] = useState(currentOrder.recipt ? currentOrder.recipt : "")
    const [uploadProductPic, setUploadProductPic] = useState(0)
    const [uploadReceiptPic, setUploadReceiptPic] = useState(0)
    const [showQr, setShowQr] = useState(false)
    const [showQrDetail, setShowQrDetail] = useState(false)
    const [showProductPic, setShowProductPic] = useState(false)
    const [showReceiptPic, setShowReceiptPic] = useState(false)
    const [showProduct, setSHowProduct] = useState(false) 
    const [transferred, setTransferred] = useState(0);
    const [uploadedCount, setUploadedCount] = useState(0);
    const [images, setImages] = useState([]);
    const [imageVisible, setImageVisible] = useState(false)
    const [imageUrl,setImageUrl] = useState('')
    const {t} = useTranslation()

    useEffect(() => {

       
        // console.log(currentOrder.status)

    },[])


    const chooseFile = (type) => {
        let options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 1000,
            maxHeight: 1000
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
                if (type == "product") {
                    setProductPic(response.assets[0].uri);
                    setUploadProductPic(1);
                }
                else {
                    setReceiptPic(response.assets[0].uri);
                    setUploadReceiptPic(1);
                }
                images.push(response.assets[0].uri);
                setImages([...images]);
            }
        });
    };

    const onSuccess = e => {
        if (e.data == currentOrder._id) {
            setShowQr(false)
            setShowQrDetail(true)
        }
        else {
            setShowQr(false)
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Order detail does not match!",
            })
        }

    };

    function getOrderStatus() {
        return currentOrder.status == "new" ? t('track.pending') : currentOrder.status == "complete" ? t('track.completed'): currentOrder.status == "accepted" ? t('track.inProgress') : t('track.cancelled')
    }
    function getOrderStatusColor() {
        return currentOrder.status == "new" ? "#ECB22E" : currentOrder.status == "complete" ? "#36C5F0" : currentOrder.status == "accepted" ? "#36C5F0" : "#E01E82"
    }
    
    const uploadProductImage = async () => {
        // const file = {
        //     uri: productPic,
        //     name: generateUID() + ".jpg",
        //     type: 'image/jpeg'
        // }
        // const options = {
        //     keyPrefix: "flighteno/orders/",
        //     bucket: "memee-bucket",
        //     region: "eu-central-1",
        //     accessKey: "AKIA2YJH3TLHCODGDKFV",
        //     secretKey: "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",
        //     successActionStatus: 201
        // }
        // RNS3.put(file, options).then(response => {
        //     if (response.status !== 201)
        //         throw new Error("Failed to upload image to S3");
        //     productUri = response.body.postResponse.location
        //     if (uploadReceiptPic == 1) {
        //         uploadReceiptImage()
        //     }
        //     else {
        //         updateUserOrder()
        //     }
        // });

         // return;
         const uri = productPic;
         const filename = uri.substring(uri.lastIndexOf('/') + 1);
         const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
         const task = storage()
             .ref(`${filename}`)
             .putFile(`${uploadUri}`);
         // set progress state
         task.on('state_changed', snapshot => {                    
             setTransferred(
                 Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
             );
         });
         try {
            const resImg = await task;
            const resImgPublicUrl = generateImagePublicURLFirebase(resImg.metadata.name);
            productUri = resImgPublicUrl;
            setUploadedCount(uploadedCount + 1);
         } catch (e) {
             console.log('errooooorrrrr -> penderOrderDetailT.js -> uploadProductImage ->', e);
         }
         return;
    }

    const uploadReceiptImage = async() => {
        // const file = {
        //     uri: receiptPic,
        //     name: generateUID() + ".jpg",
        //     type: 'image/jpeg'
        // }
        // const options = {
        //     keyPrefix: "flighteno/orders/",
        //     bucket: "memee-bucket",
        //     region: "eu-central-1",
        //     accessKey: "AKIA2YJH3TLHCODGDKFV",
        //     secretKey: "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",
        //     successActionStatus: 201
        // }
        // RNS3.put(file, options).then(response => {
        //     if (response.status !== 201)
        //         throw new Error("Failed to upload image to S3");

        //     receiptUri = response.body.postResponse.location
        //     updateUserOrder()

        // });
        const uri = receiptPic;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const task = storage()
            .ref(`${filename}`)
            .putFile(`${uploadUri}`);
        // set progress state
        task.on('state_changed', snapshot => {                    
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            const resImg = await task;
            const resImgPublicUrl = generateImagePublicURLFirebase(resImg.metadata.name);
            receiptUri = resImgPublicUrl;
            setUploadedCount(uploadedCount + 1);
        } catch (e) {
            console.log('errooooorrrrr -> penderOrderDetailT.js -> uploadReceiptImage ->', e);
        }
        return;
    }
    // dispatch({ type: IS_LOADING, isloading: false })
    const uploadImages = async() => {
        if (uploadProductPic == 0 && uploadReceiptPic == 0) {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Nothing to update!",
            })
            return
        }
        else {
            dispatch({ type: IS_LOADING, isloading: true })
            if (uploadProductPic == 1) {
                await uploadProductImage();
            }
            if (uploadReceiptPic == 1) {
                await uploadReceiptImage();        
            }
            updateUserOrder();
        }
    }

    const updateUserOrder = () => {
        var data = {
            order_id: currentOrder._id,
            image: productUri == "" ? productPic : productUri,
            recipt: receiptUri == "" ? receiptPic : receiptUri
        }
        dispatch(UpdateOrder(data, token, () => {
            setTimeout(async() => {
                dispatch({ type: IS_LOADING, isloading: false })
                Toast.show({
                    type: 'success',
                    text2: "Order has been updated!",
                });                
                // console.log('navigation', navigation)
                navigation.pop(2);
            }, 3000);
        }));
    }

    const orderCompletion = () => {
        var data = {
            order_id: currentOrder._id
        }
        dispatch(CompleteOrder(data, token, () => {
            navigation.goBack()
        }))
    }

    const checkUploadedFile = (type) => {
        if (currentOrder.status == 'complete' && type == 'product') {
            if (currentOrder.new_image) {
                setShowProductPic(true)
            }
            else {
                chooseFile(type)
            }
        }
        else {
            if (currentOrder.status == 'complete') {
                setShowReceiptPic(true)
            }
            else {
                chooseFile(type)
            }
        }
    }

    const imageProduct = [{
        url: currentOrder.new_image,
    }]

    const imageReceipt = [{
        url: currentOrder.recipt,
    }]

    const viewImage = (type) => {
        if (type == "image") {
            if (order.new_image) {
                setShowProductPic(true)
            }
        }
        else {
            if (order.recipt) {
                setShowReceiptPic(true)
            }
        }
    }


    const selectID = (id) => {
        Clipboard.setString(id)
        Toast.show({
            type: 'success',
            text2: "Copied to clipboard",
        })
    }

    const onImageTap = (image) => {
        
        setImageVisible(true)
        setImageUrl(image)

    }

    return (
        <SafeAreaView style={{flex:1, marginLeft: 18, marginRight:18}}>
  <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
            <ViewImages
                showImageViewer={showProductPic}
                images={imageProduct}
                closeModal={() => setShowProductPic(false)}
            />
            <ViewImages
                showImageViewer={showReceiptPic}
                images={imageReceipt}
                closeModal={() => setShowReceiptPic(false)}
            />
            <ViewImages
                showImageViewer={showProduct}
                images={[{ url: currentOrder.product_image }]}
                closeModal={() => setSHowProduct(false)}
            />

             <ImageView
                images={[{uri: imageUrl}]}
                imageIndex={0}
                visible={imageVisible}
                onRequestClose={() =>  setImageVisible(false)}
            />
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../images/back.png')}
                    />
                </TouchableOpacity>
                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100,  textAlign:'left' }]}>
                    {currentOrder.status == "accepted" ? t('common.updateOrder') : t('common.orderCompleted')}
                </TextBold>

                <View style={[Styles.listView, {marginTop: 24}]}>
                    <View style={Styles.upperView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Image source={currentOrder.buyer_details[0].profile_image == "" ? require("../../images/manProfile.png") : { uri: currentOrder.buyer_details[0].profile_image }}
                                    style={Styles.userImage}
                                // resizeMode="contain"
                                />
                                <TextBold style={[Styles.userName, { marginLeft: '3%', flexWrap: 'wrap' }]}>
                                    {currentOrder.buyer_details[0].full_name}
                                </TextBold>
                            </View>
                            <View style={[Styles.dateView, { backgroundColor: getOrderStatusColor() }]}>
                                <TextBold style={Styles.dateText}>
                                    {/* {currentOrder.status == "accepted" ? t('track.pending') : t('track.completed')} */}
                                    {/* {currentOrder.status} */}
                                    {getOrderStatus()}
                                </TextBold>
                            </View>
                        </View>
                        <View style={[styles.travelerListInnerView, { paddingLeft: 0, paddingRight: 0, marginTop: 5 }]}>
                            <View>
                                <TextBold style={[styles.travelListTitle, { color: color.travelerButtonColor, textAlign:'left' }]}>{t('travelHome.from')}</TextBold>
                                <TextBold style={[styles.travelListValue, { color: 'black' }]}>{currentOrder.product_buy_city_name}</TextBold>
                                <TextRegular style={[styles.travelListTitle, { color: 'black' }]}>{currentOrder.product_buy_country_name}</TextRegular>
                            </View>
                            <Image source={require("../../images/travel1.png")}
                                resizeMode="contain"
                                style={{ height: 60, width: 60 }}
                            />
                            <View>
                                <TextBold style={[styles.travelListTitle, { color: color.travelerButtonColor, textAlign:'left' }]}>{t('travelHome.to')}</TextBold>
                                <TextBold style={[styles.travelListValue, { color: 'black' }]}>{currentOrder.product_dilivery_city_name}</TextBold>
                                <TextRegular style={[styles.travelListTitle, { color: 'black' }]}>{currentOrder.product_dilivery_country_name}</TextRegular>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'gray' }} />
                    <View style={Styles.bottomView}>
                        <TouchableOpacity onPress={() => {
                            onImageTap(currentOrder.product_image)
                        }} activeOpacity={1}>
                        <Image source={{ uri: currentOrder.product_image }}
                            style={Styles.productImage}
                        />
                        </TouchableOpacity>
                        <TextBold style={[Styles.userName, { marginLeft: 0, marginTop: 10 }]}>{currentOrder.name}</TextBold>
                        <TextRegular style={Styles.priceText}>
                            $ {currentOrder.Total}
                        </TextRegular>
                    </View>
                    {currentOrder.url != "" ?
                        <View style={[styles.productDesc, {marginLeft:18}]}>
                            <View style={styles.productDescInerFirst}>
                                <TextBold style={styles.productAtrributeHead}>{t('buyerHome.color')}</TextBold>
                                <TextBold style={styles.productAtrributeHead}>{t('buyerHome.weight')}</TextBold>
                                <TextBold style={styles.productAtrributeHead}>{t('buyerHome.condition')}</TextBold>
                            </View>
                            <View style={styles.productDescInerSecond}>
                                <TextRegular style={styles.productAtrribute}>Black/ Gray</TextRegular>
                                <TextRegular style={styles.productAtrribute}>1.5 Kg</TextRegular>
                                <TextRegular style={styles.productAtrribute}>Original, Brand New</TextRegular>
                            </View>
                        </View>
                        : null}
                    <View style={Styles.bottomView}>
                        {currentOrder.open_box_check_phisical_apperance == true && currentOrder.use_item_for_testing == true ?
                            <TextRegular style={styles.productAtrributeHead}>{t('common.travelerWereAllowed')}:</TextRegular>
                            : null}
                        {currentOrder.open_box_check_phisical_apperance == true ?
                            <TextRegular style={Styles.priceText}>
                                {t('common.openBoxCheck')}
                            </TextRegular>
                            : null}
                        {currentOrder.use_item_for_testing == true ?
                            <TextRegular style={Styles.priceText}>
                                {t('travelHome.useItemTesting')}
                            </TextRegular>
                            : null}
                        <TextBold style={[Styles.priceText, { marginTop: 10 }]}>
                            {currentOrder.product_discription}
                        </TextBold>
                    </View>

                </View>


                <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 1) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>
                   {t('common.uploadPicProd')}
                </TextBold>
                <TouchableOpacity
                    activeOpacity={currentOrder.status == "accepted" ? 0 : 1}
                    onPress={() => checkUploadedFile('product')} style={Styles.productImageContainer}>
                    {productPic ?
                        <Image
                            source={{ uri: productPic }}
                            style={Styles.productImageContainer}
                        />
                        :
                        <Image
                            source={require('../../images/cameraImg.png')}
                            style={Styles.innerImage}
                            resizeMode="contain"
                        />
                    }
                </TouchableOpacity>
                <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 5) / 100, marginBottom: (windowWidth * 2) / 100,  textAlign:'left' }]}>
                    {t('common.uploadReceipt')}
                </TextBold>
                <TouchableOpacity
                    activeOpacity={currentOrder.status == "accepted" ? 0 : 1}
                    onPress={() => checkUploadedFile('receipt')} style={Styles.productImageContainer}>
                    {receiptPic ?
                        <Image
                            source={{ uri: receiptPic }}
                            style={Styles.productImageContainer}
                        />
                        :
                        <Image
                            source={require('../../images/cameraImg.png')}
                            style={Styles.innerImage}
                            resizeMode="contain"
                        />
                    }
                </TouchableOpacity>
                {!showQrDetail && currentOrder.status == "accepted" ?
                    <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 5) / 100, marginBottom: (windowWidth * 2) / 100,  textAlign:'left' }]}>
                        {t('common.scanQR')}
                    </TextBold>
                    : null}
                {!showQrDetail && currentOrder.status == "accepted" ?
                    <TouchableOpacity disabled={currentOrder.status == "accepted" ? false : true} onPress={() => setShowQr(true)} style={Styles.productImageContainer}>
                        <Image
                            source={require('../../images/qrCode.png')}
                            style={Styles.innerImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    : null}
                {showQrDetail || currentOrder.status == "complete" ?
                    <View style={{ backgroundColor: color.inputBackColor, width: '90%', alignSelf: 'center', borderRadius: 12, marginVertical: 10 }}>
                        <View style={{ alignSelf: "center", marginTop: 50, }}>
                            <QRCode
                                value={currentOrder._id}
                            />
                        </View>

                        <View style={styles.ordernumberStyle}>

                            <View style={styles.orderNumberIst}>
                                <Text style={styles.loginInputHeading}>{t('track.orderNo')}.</Text>

                            </View>
                            <View style={styles.orderNumberSecond}>

                                <Text onLongPress={() => selectID(currentOrder._id)} style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {currentOrder._id}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.orderBillStyle}>

                            <View style={styles.billLeft}>
                                <Text style={styles.loginInputHeading}>{t('track.orderPrice')}</Text>
                            </View>

                            <View style={styles.billRight}>
                                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {formatAmount(currentOrder.product_price)}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.orderBillStyle}>

                            <View style={[styles.billLeft, { marginTop: 2 }]}>
                                <Text style={styles.loginInputHeading}>{t('track.estimatedDelFee')}</Text>
                            </View>

                            <View style={[styles.billRight, { marginTop: 2 }]}>
                                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {formatAmount(currentOrder.estimated_dilivery_fee)}
                                </Text>
                            </View>

                        </View>


                        <View style={styles.orderBillStyle}>

                            <View style={[styles.billLeft, { marginTop: 2 }]}>
                                <Text style={styles.loginInputHeading}>{t('track.vipServFee')}</Text>
                            </View>

                            <View style={[styles.billRight, { marginTop: 2 }]}>
                                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {formatAmount(currentOrder.vip_service_fee)}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.orderBillStyle}>

                            <View style={[styles.billLeft, { marginTop: 2 }]}>
                                <Text style={styles.loginInputHeading}>Flighteno {t('track.cost')}</Text>
                            </View>

                            <View style={[styles.billRight, { marginTop: 2 }]}>
                                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {formatAmount(currentOrder.flighteno_cost)}
                                </Text>
                            </View>

                        </View>


                        <View style={styles.orderBillStyle}>

                            <View style={[styles.billLeft, { marginTop: 2 }]}>
                                <Text style={styles.loginInputHeading}>Tax</Text>
                            </View>

                            <View style={[styles.billRight, { marginTop: 2 }]}>
                                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {formatAmount(currentOrder.tax)}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.orderBillStyle}>

                            <View style={[styles.billLeft, { marginTop: 2 }]}>
                                <Text style={styles.textLarge}>{t('track.total')}</Text>
                            </View>

                            <View style={[styles.billRight, { marginTop: 2 }]}>
                                <Text style={[styles.textLarge, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {formatAmount(currentOrder.Total)}
                                </Text>
                            </View>

                        </View>
                    </View>
                    : null}
                {showQr ?
                    <QRCodeScanner
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.torch.off}
                        cameraStyle={{ height: 300, width: '50%', alignSelf: 'center', borderRadius: 10 }}
                        topContent={
                            <Text style={[styles.loginInputHeading, { marginVertical: 10 }]}>
                                {t('common.scanCode')}
                            </Text>
                        }
                        bottomContent={
                            <TouchableOpacity onPress={() => setShowQr(false)} style={Styles.buttonTouchable}>
                                <Text style={Styles.buttonText}>{t('common.okGotIt')}!</Text>
                            </TouchableOpacity>
                        }
                    />
                    : null}
                    
                    <View style={{ marginVertical: 15 }}>                    
                        {
                            loading ? (
                                <UploadProgressBar
                                    uploadedCount={uploadedCount}
                                    images={images}
                                    videos={[]}
                                    containerStyle={{alignItems: 'center', marginTop: 20}}
                                    textStyle={{marginBottom: 10}}
                                    transferred={transferred}
                                    progressBarWidth={Dimensions.get('window'). width - 50} />
                            ) : null
                        }  
                    </View> 
                {currentOrder.status == "accepted" ?
                    <View style={{ marginVertical: 20 }}>
                        {!showQrDetail ?
                            <ButtonTraveller
                                loader={loading}
                                title={t('common.save')}
                                onPress={() => uploadImages()}
                            />
                            :
                            <ButtonLarge
                                title={t('common.completeOrder')}
                                loader={loading}
                                onPress={() => orderCompletion()}
                            />
                        }
                    </View>
                    : <View style={{ height: 20 }} />}
            </ScrollView>
        </View>
        </SafeAreaView>
      
    );
}

const Styles = StyleSheet.create({
    listView: {
        paddingVertical: 20,
        backgroundColor: color.inputBackColor,
        width: '100%',
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
        // fontWeight: 'bold',
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
        // fontWeight: '900',
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
        width: '100%',
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
    centerText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 20
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
})