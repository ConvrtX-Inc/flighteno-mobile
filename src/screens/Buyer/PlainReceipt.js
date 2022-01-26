import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import QRCode from 'react-native-qrcode-svg';
var windowWidth = Dimensions.get('window').width;

export default function PlainReceipt({ route }) {
    const navigation = useNavigation()

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
                
                <View style={[styles.monoBarSplash, { justifyContent: 'center', marginLeft: '0%', marginTop: (windowWidth * 7) / 100 }]}>
                    <Image
                        style={styles.monoImg}
                        resizeMode='stretch'
                        source={require('../../images/mono.png')}
                    />
                </View>
                <View style={{ alignSelf: "center", marginVertical: 20, }}>
                    <QRCode
                        value="Zaka"
                        size={140}
                    />
                </View>
                <View style={styles.ordernumberStyle}>

                    <View style={styles.orderNumberIst}>
                        <Text style={styles.loginInputHeading}>Order No.</Text>

                    </View>
                    <View style={styles.orderNumberSecond}>

                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            12547893251
                        </Text>
                    </View>

                </View>
                <View style={styles.orderBillStyle}>

                    <View style={styles.billLeft}>
                        <Text style={styles.loginInputHeading}>Order price</Text>
                    </View>

                    <View style={styles.billRight}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            $ 200
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Estimated Delivery Fee</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            $ 20
                        </Text>
                    </View>

                </View>


                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>VIP Service Fee</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            $ 15
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Flightneno cost</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            $ 20
                        </Text>
                    </View>

                </View>


                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Tax</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            $ 20
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Total</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            $ 1200
                        </Text>
                    </View>

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