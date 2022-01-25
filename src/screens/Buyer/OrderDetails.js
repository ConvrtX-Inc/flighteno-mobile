import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import { useSelector, useDispatch } from 'react-redux'
import { AirbnbRating } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import ButtonLarge from '../../components/ButtonLarge';
var windowWidth = Dimensions.get('window').width;
import CardOrder from '../../components/CardOrder';
import { formatAmount } from '../../Utility/Utils';
import { CancelOrder, GetProfile } from '../../redux/actions/Trips';
import ReviewList from '../../components/ReviewList';
import ViewImages from '../../components/ViewImages';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';

export default function OrderDetails({ route }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [userRating, setUserRating] = useState('4.8')
    const [traveler, setTraveler] = useState()
    const [rated, setRated] = useState("")
    const [showProductPic, setShowProductPic] = useState(false)
    const [showReceiptPic, setShowReceiptPic] = useState(false)
    const { order } = route.params
    let isCancellable = order.status != 'cancelled' && order.status == 'new'
    let isStarted = order.status == 'accepted'
    let isComplete = order.status == 'complete'

    function check(id) {
        return id == currentUser._id
    }

    useEffect(() => {
        if (order.rated_admin_id) {
            setRated(order.rated_admin_id.find(check))
        }
        
        console.log(order?.traveler_id)

        // const profileRequest = new FormData()
        // profileRequest.append('admin_id', order?.admin_id)
        // dispatch(GetProfile(profileRequest, token, (data) => {
        //     console.log(data)
        // }))

        // if(true) {
        // if ((order.status == 'accepted' || order.status == 'complete') && order.traveler_id && order.traveler_id.length > 0) {
        //     var obj = {
        //         admin_id: order.traveler_id[0].traveler_id
        //     }
        //     dispatch(GetProfile(obj, token, (data) => {
        //         setTraveler(data)
        //         console.log(data)
        //     }))
        // }

    }, [])


    function cancelOrder() {
        var obj = {
            admin_id: currentUser._id,
            order_id: order._id
        }
        dispatch(CancelOrder(obj, token, navigation))
    }

    const imageProduct = [{
        url: order.new_image,
    }]

    const imageReceipt = [{
        url: order.recipt,
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

    return (
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
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../images/back.png')}
                    />
                </TouchableOpacity>
                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Order Details</TextBold>
                {!traveler ?
                    <TouchableOpacity onPress={() => navigation.navigate("TravelerProfile", { traveler: traveler, orderId: order._id })} style={Styles.userView}>
                        <Image
                            source={traveler?.profile_image ? { uri: traveler?.profile_image } : require('../../images/manProfile.png')}
                            style={styles.profileImage}
                        />
                        <View style={{ marginLeft: '3%' }}>
                            <Text style={Styles.userName}>{traveler?.full_name}</Text>
                            <View>
                                <View style={{}}>
                                    <AirbnbRating
                                        defaultRating={traveler?.traveler_ratting.length != 0 ? traveler?.traveler_ratting[0]?.avg_rating : 0}
                                        type='star'
                                        ratingCount={5}
                                        size={15}
                                        showRating={false}
                                        isDisabled={true}
                                    />
                                </View>
                                <TextBold style={styles.ratingText}>{traveler?.traveler_ratting.length != 0 ? traveler?.traveler_ratting[0].avg_rating : 0} Out of 5.0</TextBold>
                            </View>
                        </View>
                    </TouchableOpacity>
                 : null}
                <CardOrder
                    order={order}>
                </CardOrder>
                <View style={{ alignSelf: "center", marginVertical: 20, }}>
                    <QRCode
                        value={order._id}
                    />
                </View>
                <View style={styles.ordernumberStyle}>

                    <View style={styles.orderNumberIst}>
                        <TextBold style={styles.loginInputHeading}>Order No.</TextBold>
                    </View>
                    <View style={styles.orderNumberSecond}>
                        <TextMedium onLongPress={() => selectID(order._id)}
                         style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {order._id}
                        </TextMedium>
                    </View>

                </View>
                <View style={styles.orderBillStyle}>

                    <View style={styles.billLeft}>
                        <TextBold style={styles.loginInputHeading}>Order price</TextBold>
                    </View>

                    <View style={styles.billRight}>
                        <TextMedium style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(order.product_price)}
                        </TextMedium>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <TextBold style={styles.loginInputHeading}>Estimated Delivery Fee</TextBold>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <TextMedium style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(order.estimated_dilivery_fee)}
                        </TextMedium>
                    </View>

                </View>


                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <TextBold style={styles.loginInputHeading}>VIP Service Fee</TextBold>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <TextMedium style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(order.vip_service_fee)}
                        </TextMedium>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <TextBold style={styles.loginInputHeading}>Flightneno cost</TextBold>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <TextMedium style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(order.flighteno_cost)}
                        </TextMedium>
                    </View>

                </View>


                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <TextBold style={styles.loginInputHeading}>Tax</TextBold>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <TextMedium style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(order.tax)}
                        </TextMedium>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <TextBold style={styles.textLarge}>Total</TextBold>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <TextMedium style={[styles.textLarge, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(order.Total)}
                        </TextMedium>
                    </View>

                </View>
                <View>
                    <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 5) / 100, marginBottom: (windowWidth * 2) / 100 }]}>
                        Picture of product
                    </TextBold>
                    <TouchableOpacity activeOpacity={1} disabled={!order.new_image ? true : false}
                        onPress={() => viewImage('image')} style={Styles.productImageContainer}>
                        {order.new_image ?
                            <Image
                                source={{ uri: order.new_image }}
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
                    <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 5) / 100, marginBottom: (windowWidth * 2) / 100 }]}>
                        Product Receipt
                    </TextBold>
                    <TouchableOpacity activeOpacity={1} disabled={!order.recipt ? true : false}
                        onPress={() => viewImage('receipt')} style={Styles.productImageContainer}>
                        {order.recipt ?
                            <Image
                                source={{ uri: order.recipt }}
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
                    {!isComplete && order.status == "accepted" ?
                        <Text style={Styles.bottomText}>
                            PLEASE COORDINATE WITH THE{'\n'}TRAVELER TO RECEIVE THE PRODUCT
                        </Text>
                        : null}
                </View>
                {isComplete && !rated ?
                    <View style={{ marginVertical: 20 }}>
                        <ButtonLarge
                            title="Rate Transaction"
                            loader={loading}
                            onPress={() => navigation.navigate("RateTransaction", { order: order })}
                        />
                    </View>
                    : null}
                {isCancellable ?
                    <View style={{ marginVertical: 20 }}>
                        <ButtonLarge
                            title="Cancel Order"
                            loader={loading}
                            color='#E01E82'
                            onPress={() => cancelOrder()}
                        />
                    </View> : null}
                {order.review_details ?
                    order.review_details.length > 0 ?
                        <ReviewList review={order.review_details[0]}
                            onPressUser={() => navigation.navigate("TravelerProfile", { traveler: traveler, orderId: order._id })}
                        />
                        : null : null}
                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
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
    }
})