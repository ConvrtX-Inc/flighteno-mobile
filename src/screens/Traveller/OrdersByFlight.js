import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../Utility/Color';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { UserTrips } from '../../redux/actions/Trips';

var windowWidth = Dimensions.get('window').width;

var storeNamesList = [
    {
        id: '1',
        name: "Apple",
        checked: false
    },
]
export default function OrdersByFlight() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentUser, token } = useSelector(({ authRed }) => authRed)
    const { tripsData } = useSelector(({ tripsRed }) => tripsRed)

    useFocusEffect(
        React.useCallback(() => {
            var obj = {
                admin_id: currentUser._id
            }
            dispatch(UserTrips(token, obj))
        }, [])
    )

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

                <Text style={[styles.HeadingText, { marginTop: 0 }]}>Orders By Flight</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AllOrders")}>
                    <Text style={Styles.viewAll}>View All</Text>
                </TouchableOpacity>

            </View>

            <View style={{ height: 20 }} />
            {tripsData.length > 0 ?
                <FlatList
                    data={tripsData}
                    nestedScrollEnabled
                    renderItem={({ item, index }) =>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("OrdersSpecificCountry", { flightBaseOrders: item.offers, date: item.depart_date })}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={index % 2 == 0 ? ['#36C5F0', '#368CF0'] : ['#2C5EBE', '#2C5EBE']}
                                style={styles.travelList}
                            >
                                <View style={styles.travelerListInnerView}>
                                    <View>
                                        <Text style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>From</Text>
                                        <Text style={styles.travelListValue}>{item.city}</Text>
                                        <Text style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>{item.Traveling_from}</Text>
                                    </View>
                                    <Image source={require("../../images/travel.png")}
                                        resizeMode="contain"
                                        style={{ height: 60, width: 60 }}
                                    />
                                    <View>
                                        <Text style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>To</Text>
                                        <Text style={styles.travelListValue}>{item.cityTo}</Text>
                                        <Text style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>{item.Traveling_to}</Text>
                                    </View>
                                </View>
                                <View style={{ height: 1, backgroundColor: color.travelerListBorderColor, }} />
                                <View style={styles.travelerListInnerView}>
                                    <View>
                                        <Text style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>Date</Text>
                                        <Text style={styles.travelListValue}>{moment(item.depart_date.$date.$numberLong, "x").format("MMMM DD, YYYY")}</Text>
                                    </View>
                                </View>
                                <View style={{ height: 15 }} />
                            </LinearGradient>
                        </TouchableOpacity>

                    }
                    keyExtractor={item => item._id.$oid}
                    style={{ marginTop: 3 }}
                />
                : null}
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
    viewAll: {
        fontSize: 16,
        color: color.travelerListTitle
    }
})