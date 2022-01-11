import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import ButtonTraveller from '../../components/ButtonTraveller';
import { useSelector } from 'react-redux'
import ButtonDisable from '../../components/ButtonDisable';
import ButtonVerifyT from '../../components/ButtonVerifyT';
import BottomTab from '../../components/BottomTab';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { formatAmount } from '../../Utility/Utils';
import ViewImages from '../../components/ViewImages';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';


var windowWidth = Dimensions.get('window').width;

export default function OrderDetailT({ route }) {
    const { orderDetail } = route.params
    const { loading, currentUser } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation()
    const [offerSent, setOfferSent] = useState("")
    const [showImageView, setShowImageView] = useState(false)
    const [images, setImages] = useState([])


    function check(id) {
        return id == currentUser._id
    }

    useEffect(() => {
        if (orderDetail.offer_sender_account_ids) {
            setOfferSent(orderDetail.offer_sender_account_ids.find(check))
        }
    }, [])

    const showGallery = (data) => {
        images.length = 0
        images.push({ url: data })
        setShowImageView(true)
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
                showImageViewer={showImageView}
                images={images}
                closeModal={() => setShowImageView(false)}
            />
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../images/back.png')}
                    />
                </TouchableOpacity>
                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Order details</Text>
                <View style={Styles.listView}>
                    <View style={Styles.upperView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {orderDetail.profile_data[0].profile_image ?
                                <Image source={{ uri: orderDetail.profile_data[0].profile_image }}
                                    style={Styles.userImage}
                                />
                                :
                                <Image source={require("../../images/manProfile.png")}
                                    style={Styles.userImage}
                                />
                            }
                            <View style={{ flex: 1, flexGrow: 1 }}>
                                <Text style={Styles.userName}>{orderDetail.profile_data[0].full_name}</Text>
                            </View>
                            <View style={Styles.dateView}>
                                <Text style={Styles.dateText}>{moment(orderDetail.preferred_date.$date.$numberLong, 'x').format("MMM DD, YYYY")}</Text>
                            </View>
                        </View>
                        <View style={[styles.travelerListInnerView, { paddingLeft: 0, paddingRight: 0, marginTop: 5 }]}>
                            <View>
                                <Text style={[styles.travelListTitle, { color: color.travelerButtonColor }]}>From</Text>
                                <Text style={[styles.travelListValue, { color: 'black' }]}>{orderDetail.product_buy_city_name}</Text>
                                <Text style={[styles.travelListTitle, { color: 'black' }]}>{orderDetail.product_buy_country_name}</Text>
                            </View>
                            <Image source={require("../../images/travel1.png")}
                                resizeMode="contain"
                                style={{ height: 60, width: 60 }}
                            />
                            <View>
                                <Text style={[styles.travelListTitle, { color: color.travelerButtonColor }]}>To</Text>
                                <Text style={[styles.travelListValue, { color: 'black' }]}>{orderDetail.product_dilivery_city_name}</Text>
                                <Text style={[styles.travelListTitle, { color: 'black' }]}>{orderDetail.product_dilivery_country_name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'gray' }} />

                    <View style={Styles.bottomView}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => showGallery(orderDetail.product_image)}>
                            <Image source={{ uri: orderDetail.product_image }}
                                style={Styles.productImage}
                            />
                        </TouchableHighlight>
                        <Text style={[Styles.userName, { marginLeft: 0, marginTop: 10 }]}>{orderDetail.product_discription}</Text>
                        <Text style={Styles.priceText}>
                            {formatAmount(parseInt(orderDetail.product_price) + parseInt(orderDetail.tax) + parseInt(orderDetail.vip_service_fee) + parseInt(Math.round((orderDetail.product_price / 100) * 7)) + parseInt(Math.round((orderDetail.product_price / 100) * 10) < 50 ? 50 : Math.round((orderDetail.product_price / 100) * 10)))}
                        </Text>
                        <View style={{ height: 20 }} />
                        <View style={Styles.propertView}>
                            <Text style={[Styles.userName, { marginLeft: 0, minWidth: '24%', marginRight: 5 }]}>Color</Text>
                            <Text style={Styles.priceText}>Black/gray</Text>
                        </View>
                        <View style={Styles.propertView}>
                            <Text style={[Styles.userName, { marginLeft: 0, minWidth: '24%', marginRight: 5 }]}>Weight</Text>
                            <Text style={Styles.priceText}>{orderDetail.product_weight} Kg</Text>
                        </View>
                        <View style={Styles.propertView}>
                            <Text style={[Styles.userName, { marginLeft: 0, minWidth: '24%', marginRight: 5 }]}>Quantity</Text>
                            <Text style={Styles.priceText}>{orderDetail.quantity}</Text>
                        </View>
                        <View style={Styles.propertView}>
                            <Text style={[Styles.userName, { marginLeft: 0, color: 'black', minWidth: '24%', marginRight: 5 }]}>Estimated Delivery Fee</Text>
                            <Text style={Styles.priceText}>
                                {formatAmount(Math.round((orderDetail.product_price / 100) * 10) < 50 ? 50 : Math.round((orderDetail.product_price / 100) * 10))}
                            </Text>
                        </View>
                        {orderDetail.open_box_check_phisical_apperance || orderDetail.use_item_for_testing ?
                            <Text style={[Styles.userName, { marginLeft: 0, marginTop: 20 }]}>Traveler is allowed to:</Text>
                            : null}
                        {orderDetail.open_box_check_phisical_apperance ?
                            <Text style={[Styles.priceText, { marginTop: 5 }]}>Open box and check physical Apperance</Text>
                            : null}
                        {orderDetail.use_item_for_testing ?
                            <Text style={[Styles.priceText, { marginTop: 5, marginBottom: 15 }]}>Use item for testing</Text>
                            : null}
                    </View>
                </View>
                <View style={styles.ordernumberStyle}>

                    <View style={[styles.orderNumberIst, { paddingLeft: '5%' }]}>
                        <Text style={styles.loginInputHeading}>Order No.</Text>

                    </View>
                    <View style={styles.orderNumberSecond}>

                        <Text onLongPress={() => selectID(orderDetail._id)} style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {orderDetail._id}
                        </Text>
                    </View>

                </View>
                <View style={Styles.upperView}>

                    <View style={styles.orderBillStyle}>

                        <View style={styles.billLeft}>
                            <Text style={styles.loginInputHeading}>Order price</Text>
                        </View>

                        <View style={styles.billRight}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(orderDetail.product_price)}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.loginInputHeading}>Estimated Delivery Fee</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(Math.round((orderDetail.product_price / 100) * 10) < 50 ? 50 : Math.round((orderDetail.product_price / 100) * 10))}
                            </Text>
                        </View>

                    </View>

                    {orderDetail.vip_service_status == "Yes" ?
                        <View style={styles.orderBillStyle}>

                            <View style={[styles.billLeft, { marginTop: 2 }]}>
                                <Text style={styles.loginInputHeading}>VIP Service Fee</Text>
                            </View>

                            <View style={[styles.billRight, { marginTop: 2 }]}>
                                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {formatAmount(orderDetail.vip_service_fee)}
                                </Text>
                            </View>

                        </View>
                        : null}

                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.loginInputHeading}>Flightneno cost</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(Math.round((orderDetail.product_price / 100) * 7))}
                            </Text>
                        </View>

                    </View>


                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.loginInputHeading}>Tax</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(orderDetail.tax)}
                            </Text>
                        </View>

                    </View>

                    <View style={[styles.orderBillStyle, { marginTop: 20 }]}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.textLarge}>Total</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.textLarge, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(parseInt(orderDetail.product_price) + parseInt(orderDetail.tax) + parseInt(orderDetail.vip_service_fee) + parseInt(Math.round((orderDetail.product_price / 100) * 7)) + parseInt(Math.round((orderDetail.product_price / 100) * 10) < 50 ? 50 : Math.round((orderDetail.product_price / 100) * 10)))}
                            </Text>
                        </View>

                    </View>
                    <View style={{ marginVertical: 50 }}>
                        {offerSent == "" || offerSent == undefined ?
                            <ButtonTraveller
                                loader={loading}
                                onPress={() => navigation.navigate("OfferPrice", { orderDetail: orderDetail })}
                                title="Offer a delivery"
                            />
                            :
                            <Text style={Styles.userName}>You have already sent offer against this order!</Text>
                        }
                    </View>
                    {/* <View style={{ marginVertical: 50 }}>
                        <ButtonDisable
                            title="Offer a delivery"
                            loader={loading}
                        />
                    </View>
                    <View style={{ marginBottom: 30, }}>
                        <ButtonVerifyT
                            title="Verify Account"
                            loader={loading}
                            onPress={() => console.log("OK")}
                        />
                    </View> */}
                </View>
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
        marginTop: 25
    },
    upperView: {
        paddingHorizontal: '5%'
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 30
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '5%',
        color: 'black'
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
        width: 100,
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
    propertView: {
        flexDirection: 'row',
        marginTop: 8
    }
})