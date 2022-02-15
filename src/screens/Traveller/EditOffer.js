import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import ButtonTraveller from '../../components/ButtonTraveller';
import { useSelector, useDispatch } from 'react-redux'
import BottomTab from '../../components/BottomTab';
import Input from '../../components/InputField';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import InputMulti from '../../components/inputFieldMultiLine';
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { sendEditOffer } from '../../redux/actions/Chat';
import { formatAmount } from '../../Utility/Utils';

var windowWidth = Dimensions.get('window').width;

export default function EditOffer({ route }) {
    const { loading, currentProfile, currentUser, token } = useSelector(({ authRed }) => authRed)
    const { ordersToDestination, latestTripId } = useSelector(({ tripsRed }) => tripsRed)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [offerPrice, setOfferPrice] = useState("")
    const [date, setDate] = useState(new Date());
    const [dateValue, setDateValue] = useState("MM/DD/YYYY");
    const [show, setShow] = useState(false);
    const [notes, setNotes] = useState("")
    const [orderDetail, setOrderDetail] = useState({})
    const [orderDetailId, setOrderDetailId] = useState("")
    useEffect(() => {
        ordersToDestination.forEach(element => {
            if (element._id == route.params.ID) {
                setOrderDetailId(element._id)
                setOrderDetail(element)
                return
            }
        });
    }, [])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDateValue(moment(currentDate).format("MM/DD/YYYY"));
    };

    const sendOffer = () => {
        if (offerPrice == "") {
            Toast.show({ type: 'error', text2: "Please enter a delivery fee", })
            return
        }
        if (dateValue == "MM/DD/YYYY") {
            Toast.show({ type: 'error', text2: "Please select a delivery date", })
            return
        }
        var offer = {
            offerPrice: offerPrice,
            deliveryDate: dateValue,
            notes: notes
        }

        navigation.navigate("ChatTraveler", { orderDetail: orderDetail, offer: offer, currentStatus: "edit", chatID: route.params.CHATID })
        var data = {
            order_id: orderDetail._id,
            order_price: orderDetail.product_price,
            estimateDelivery: offerPrice,
            vipServiceFee: orderDetail.vip_service_status == "Yes" ? orderDetail.vip_service_fee : 0,
            flighteno_cost: orderDetail.flighteno_cost,
            tax: orderDetail.tax,
            buyer_id: orderDetail.admin_id,
            traveler_id: currentUser._id,
            tirpId: latestTripId,
            total: parseInt(orderDetail.product_price) + parseInt(offerPrice) + parseInt(orderDetail.vip_service_status == "Yes" ? orderDetail.vip_service_fee : 0) + parseInt(orderDetail.flighteno_cost) + parseInt(orderDetail.tax)
        }
        dispatch(sendEditOffer(data, token))
    }

    return (
        <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../images/back.png')}
                    />
                </TouchableOpacity>
                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Edit offer</Text>
                {orderDetail == {} ? null
                    :
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', marginTop: 20 }}>
                            <Text style={[Styles.userName, { marginLeft: 0, minWidth: '24%', marginRight: 5 }]}>Estimated Delivery Fee</Text>
                            <Text style={Styles.priceText}>{formatAmount(Math.round((orderDetail.product_price / 100) * 10) < 50 ? 50 : Math.round((orderDetail.product_price / 100) * 10))}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            <Text style={[styles.loginInputHeading, { marginVertical: 20 }]}>Your Delivery Fee Offer</Text>
                        </View>
                        <Input
                            placeholder="$90.00"
                            keyboardType="decimal-pad"
                            onChangeText={text => setOfferPrice(text.replace(/[^0-9.]/g, ''))}
                            value={offerPrice}
                            secureTextEntry={false}
                        />
                        <View style={styles.ordernumberStyle}>

                            <View style={[styles.orderNumberIst, { paddingLeft: '5%' }]}>
                                <Text style={styles.loginInputHeading}>Order No.</Text>

                            </View>
                            <View style={styles.orderNumberSecond}>

                                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                    {orderDetailId}
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
                                    <Text style={[styles.termText, { color: 'white', opacity: 10, marginHorizontal: '5%', textAlign: 'justify', backgroundColor: color.lightBlue, width: '50%' }]}>
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
                                    <Text style={styles.loginInputHeading}>Flighteno cost</Text>
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
                            <View style={{ alignSelf: 'center', width: '90%', marginTop: 30 }}>
                                <Text style={[styles.loginInputHeading, { marginVertical: 20 }]}>Preferred Delivery Date</Text>
                            </View>
                            <Pressable style={{ marginTop: 5 }} onPress={() => setShow(!show)}>
                                <View style={styles.pickerVIew}>
                                    <View style={styles.pickerLeftView}>
                                        <Text style={styles.textSelected}>{dateValue}</Text>
                                    </View>
                                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={styles.datePickerIcon}
                                            resizeMode='stretch'
                                            source={require('../../images/calendar.png')}
                                        />
                                    </View>

                                </View>
                            </Pressable>
                            <View style={{ alignSelf: 'center', width: '90%', }}>
                                <Text style={[styles.loginInputHeading, { marginVertical: 20 }]}>Notes</Text>
                            </View>
                            <InputMulti
                                placeholder="Let's meet in the morning"
                                value={notes}
                                onChangeText={(text) => setNotes(text)}
                            />
                            <View style={{ marginTop: 80, marginBottom: 20 }}>
                                <ButtonTraveller
                                    loader={loading}
                                    title="Edit Offer"
                                    onPress={() => sendOffer()}
                                />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
}

const Styles = StyleSheet.create({
    upperView: {
        paddingHorizontal: '5%'
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '5%',
        color: 'black'
    },
    priceText: {
        fontSize: 16,
        fontWeight: '900',
        color: color.skipTextColor
    },
})