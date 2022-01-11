import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ScrollView, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../../Utility/Color';
import ButtonLarge from '../../../components/ButtonLarge';
import QRCode from 'react-native-qrcode-svg';
import { formatAmount } from '../../../Utility/Utils';

var windowWidth = Dimensions.get('window').width;
export default function Congratulation({ route }) {

    const navigation = useNavigation();
    const { data } = route.params
    const { loading } = useSelector(({ authRed }) => authRed)

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("BottomTab", {screen: "Home"})
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>

                <TouchableOpacity onPress={() => navigation.navigate("BottomTab", {screen: "Home"})}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../../images/back.png')}
                    />
                </TouchableOpacity>

                <View style={[styles.monoBarSplash, { justifyContent: 'center', marginLeft: '0%', marginTop: (windowWidth * 7) / 100 }]}>
                    <Image
                        style={styles.monoImg}
                        resizeMode='stretch'
                        source={require('../../../images/mono.png')}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.HeadingText, { marginTop: (windowWidth * 6) / 100, marginLeft: '0%' }]}>Your order
                    </Text>
                    <Text style={[styles.HeadingText, { marginTop: (windowWidth * 0) / 100, marginLeft: '0%' }]}>
                        has been placed</Text>
                </View>

                <View style={{ alignSelf: "center", marginTop: 50, }}>
                    <QRCode
                        value={'data'}
                    />
                </View>

                <View style={styles.ordernumberStyle}>

                    <View style={styles.orderNumberIst}>
                        <Text style={styles.loginInputHeading}>Order No.</Text>

                    </View>
                    <View style={styles.orderNumberSecond}>

                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {data.order_number}
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={styles.billLeft}>
                        <Text style={styles.loginInputHeading}>Order price</Text>
                    </View>

                    <View style={styles.billRight}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(data.order_price)}
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Estimated Delivery Fee</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(data.estimated_dilivery_fee)}
                        </Text>
                    </View>

                </View>


                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>VIP Service Fee</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(data.vip_service_fee)}
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Flightneno cost</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(data.flighteno_cost)}
                        </Text>
                    </View>

                </View>


                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Tax</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(data.tax)}
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.textLarge}>Total</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.textLarge, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(data.Total)}
                        </Text>
                    </View>

                </View>
                
                <Text style={[styles.termText, { fontSize: 16, color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'center', marginTop: 70 }]}>
                    Please wait for a traveler to gather your order and contact you for further discussion and prepare for your payment.
                </Text>



                <View style={{ marginBottom: 35, marginTop: 26 }}>
                    <ButtonLarge
                        title="Place a new order"
                        loader={loading}
                        onPress={() => navigation.navigate("BottomTab", {screen: "Home"})}
                    />
                </View>


            </ScrollView>






        </View>
    );

}