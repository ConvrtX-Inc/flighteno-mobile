import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import { color } from '../../Utility/Color';
import moment from 'moment';
import CardOrderUser from '../../components/CardOrderUser';
import { useTranslation } from 'react-i18next';

var storeNamesList = [
    {
        id: '1',
        name: "Apple",
        checked: false
    },
]

export default function OrdersSpecificCountry({ route }) {
    const { flightBaseOrders, date } = route.params
    const navigation = useNavigation();
    const {t} = useTranslation()

    return (
        <View style={styles.ScreenCss}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={styles.backImg}
                    resizeMode='stretch'
                    source={require('../../images/back.png')}
                />
            </TouchableOpacity>

            <View style={Styles.header}>

                <Text style={[styles.HeadingText, { marginTop: 0 }]}>{t('track.orders')} - {moment(date.$date.$numberLong, "x").format("MMMM DD, YYYY")}</Text>

            </View>
            <FlatList
                data={flightBaseOrders}
                renderItem={({ item, index }) =>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("PendingOrderDetailT", { currentOrder: item.traveler_orders[0] })} style={Styles.listView}>
                        <CardOrderUser order={item.traveler_orders[0]} />
                    </TouchableOpacity>
                }
                keyExtractor={item => item.id}
            />
        </View>
    );

}

const Styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        alignItems: 'center',
        marginVertical: 20
    },
    listView: {
        paddingVertical: 20,
        backgroundColor: color.inputBackColor,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
})