import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from '../Utility/Color';
import { styles } from '../Utility/Styles';
import { useSelector, useDispatch } from 'react-redux'
import QRCode from 'react-native-qrcode-svg';
var windowWidth = Dimensions.get('window').width;
import CardOrder from '../components/CardOrder';
import { formatAmount } from '../Utility/Utils';
import ViewImages from '../components/ViewImages';
import { getCurrentOrder } from '../redux/actions/BuyerOrder';
import ScreenLoader from '../components/ScreenLoader';

export default function OrderDetailBaseOnOrderId({ route }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [showProductPic, setShowProductPic] = useState(false)
    const [showReceiptPic, setShowReceiptPic] = useState(false)
    const [currentOrder, setCurrentOrder] = useState("")

    useEffect(() => {
        var data = {
            order_id: route.params.orderId
        }
        dispatch(getCurrentOrder(data, token, (data) => setCurrentOrder(data)))

        console.log(currentOrder)

    }, [])

    const viewImage = (type) => {
        if (type == "image") {
            if (currentOrder.new_image) {
                setShowProductPic(true)
            }
        }
        else {
            if (currentOrder.recipt) {
                setShowReceiptPic(true)
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
            {currentOrder ?
                <ViewImages
                    showImageViewer={showProductPic}
                    images={[{ url: currentOrder.new_image }]}
                    closeModal={() => setShowProductPic(false)}
                />
                : null}
            {currentOrder ?
                <ViewImages
                    showImageViewer={showReceiptPic}
                    images={[{ url: currentOrder.recipt }]}
                    closeModal={() => setShowReceiptPic(false)}
                />
                : null}
            {currentOrder ?
                <ScrollView>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backImg}
                            resizeMode='stretch'
                            source={require('../images/back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Order Details</Text>

                    <CardOrder
                        order={currentOrder}>
                    </CardOrder>
                    <View style={{ alignSelf: "center", marginVertical: 20, }}>
                        <QRCode
                            value={currentOrder._id}
                        />
                    </View>
                    <View style={styles.ordernumberStyle}>

                        <View style={styles.orderNumberIst}>
                            <Text style={styles.loginInputHeading}>Order No.</Text>

                        </View>
                        <View style={styles.orderNumberSecond}>

                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {currentOrder._id}
                            </Text>
                        </View>

                    </View>
                    <View style={styles.orderBillStyle}>

                        <View style={styles.billLeft}>
                            <Text style={styles.loginInputHeading}>Order price</Text>
                        </View>

                        <View style={styles.billRight}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(currentOrder.product_price)}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.loginInputHeading}>Estimated Delivery Fee</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(currentOrder.estimated_dilivery_fee)}
                            </Text>
                        </View>

                    </View>


                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.loginInputHeading}>VIP Service Fee</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(currentOrder.vip_service_fee)}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.loginInputHeading}>Flighteno cost</Text>
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
                            <Text style={styles.textLarge}>Total</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.textLarge, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(currentOrder.Total)}
                            </Text>
                        </View>

                    </View>
                    <View>
                        <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 5) / 100, marginBottom: (windowWidth * 2) / 100 }]}>
                            Picture of product
                        </Text>
                        <TouchableOpacity activeOpacity={1} disabled={!currentOrder.new_image ? true : false}
                            onPress={() => viewImage('image')} style={Styles.productImageContainer}>
                            {currentOrder.new_image ?
                                <Image
                                    source={{ uri: currentOrder.new_image }}
                                    style={Styles.productImageContainer}
                                />
                                :
                                <Image
                                    source={require('../images/cameraImg.png')}
                                    style={Styles.innerImage}
                                    resizeMode="contain"
                                />
                            }
                        </TouchableOpacity>
                        <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 5) / 100, marginBottom: (windowWidth * 2) / 100 }]}>
                            Product Receipt
                        </Text>
                        <TouchableOpacity activeOpacity={1} disabled={!currentOrder.recipt ? true : false}
                            onPress={() => viewImage('receipt')} style={Styles.productImageContainer}>
                            {currentOrder.recipt ?
                                <Image
                                    source={{ uri: currentOrder.recipt }}
                                    style={Styles.productImageContainer}
                                />
                                :
                                <Image
                                    source={require('../images/cameraImg.png')}
                                    style={Styles.innerImage}
                                    resizeMode="contain"
                                />
                            }
                        </TouchableOpacity>

                        {currentOrder.status != "complete" && currentOrder.status == "accepted" ?
                            <Text style={Styles.bottomText}>
                                PLEASE COORDINATE WITH THE{'\n'}TRAVELER TO RECEIVE THE PRODUCT
                            </Text>
                            : null}

                    </View>
                    <View style={{ height: 20 }} />
                </ScrollView>
                :
                <ScreenLoader loader={loading} />
            }
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