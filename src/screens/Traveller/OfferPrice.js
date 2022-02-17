import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import TextBold from '../../components/atoms/TextBold';

var windowWidth = Dimensions.get('window').width;

export default function OfferPrice({ route }) {
    const { orderDetail } = route.params
    const { loading, currentProfile, currentUser, token } = useSelector(({ authRed }) => authRed)
    const { latestTripId } = useSelector(({ tripsRed }) => tripsRed)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [offerPrice, setOfferPrice] = useState("")
    const [date, setDate] = useState(new Date());
    const [dateValue, setDateValue] = useState("MM/DD/YYYY");
    const [show, setShow] = useState(false);
    const [notes, setNotes] = useState("")
    const {t} = useTranslation()

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

        if (parseFloat(offerPrice) < 50) {
            Toast.show({ type: 'error', text2: "Minimum delivery fee is $50.00", })
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
        navigation.navigate("ChatTraveler", { orderDetail: orderDetail, offer: offer, currentStatus: 'offer' })
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
                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%',textAlign:'left' }]}>{t('travelHome.offerDetails')}</TextBold>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', marginTop: 20 }}>
                    <Text style={[Styles.userName, { marginLeft: 0, minWidth: '24%', marginRight: 5 }]}>{t('track.estimatedDelFee')}</Text>
                    <Text style={Styles.priceText}>{formatAmount(Math.round((orderDetail.product_price / 100) * 10) < 50 ? 50 : Math.round((orderDetail.product_price / 100) * 10))}</Text>
                </View>
                <View style={{ alignSelf: 'center', width: '90%' }}>
                    <Text style={[styles.loginInputHeading, { marginVertical: 20,textAlign:'left' }]}>{t('travelHome.yourDelFeeOffer')}</Text>
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
                        <Text style={[styles.loginInputHeading, {textAlign:'left'}]}>{t('track.orderNo')}.</Text>

                    </View>
                    <View style={styles.orderNumberSecond}>

                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {orderDetail._id}
                        </Text>
                    </View>

                </View>
                <View style={Styles.upperView}>

                    <View style={styles.orderBillStyle}>

                        <View style={styles.billLeft}>
                            <Text style={[styles.loginInputHeading,{textAlign:'left'}]}>{t('track.orderPrice')}</Text>
                        </View>

                        <View style={styles.billRight}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(orderDetail.product_price)}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={[styles.loginInputHeading, {textAlign:'left'}]}>{t('track.estimatedDelFee')}</Text>
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
                                <Text style={[styles.loginInputHeading, {textAlign:'left'}]}>{t('track.vipServFee')}</Text>
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
                            <Text style={[styles.loginInputHeading, {textAlign:'left'}]}>Flightneno {t('track.cost')}</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(Math.round((orderDetail.product_price / 100) * 7))}
                            </Text>
                        </View>

                    </View>


                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={[styles.loginInputHeading, {textAlign:'left'}]}>{t('track.tax')}</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(orderDetail.tax)}
                            </Text>
                        </View>

                    </View>

                    <View style={[styles.orderBillStyle, { marginTop: 20 }]}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={[styles.textLarge, {textAlign:'left'}]}>{t('track.total')}</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.textLarge, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(parseInt(orderDetail.product_price) + parseInt(orderDetail.tax) + parseInt(orderDetail.vip_service_fee) + parseInt(Math.round((orderDetail.product_price / 100) * 7)) + parseInt(Math.round((orderDetail.product_price / 100) * 10) < 50 ? 50 : Math.round((orderDetail.product_price / 100) * 10)))}
                            </Text>
                        </View>

                    </View>
                    <View style={{ alignSelf: 'center', width: '90%', marginTop: 30 }}>
                        <Text style={[styles.loginInputHeading, { marginVertical: 20,textAlign:'left' }]}>{t('buyerHome.prefDelDate')}</Text>
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
                        <Text style={[styles.loginInputHeading, { marginVertical: 20, textAlign:'left' }]}>{t('travelHome.notes')}</Text>
                    </View>
                    <InputMulti
                        placeholder="Let's meet in the morning"
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                    />
                    <View style={{ marginTop: 80, marginBottom: 20 }}>
                        <ButtonTraveller
                            loader={loading}
                            title={t('travelHome.sendToBuyer')}
                            onPress={() => sendOffer()}
                        />
                    </View>
                </View>
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