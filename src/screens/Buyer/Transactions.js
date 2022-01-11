import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../Utility/Color';
import { useSelector, useDispatch } from 'react-redux';
import { GetMyOrders } from '../../redux/actions/Trips';

var windowWidth = Dimensions.get('window').width;
export default function Transactions() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const { myOrders } = useSelector(({ tripsRed }) => tripsRed)


    useFocusEffect(
        React.useCallback(() => {
            var obj = {
                admin_id: currentUser._id
            }
            dispatch(GetMyOrders(obj, token))
            return () => {
            };
        }, [])
    );


    function filterOrders(statuses) {
        return myOrders.filter(function search(order) { return statuses.includes(order.status) })
    }

    return (
        <View style={styles.ScreenCss}>
            {currentUser ?
                <ScrollView>

                    <View style={styles.selectProfileHeader}>

                        <View style={[styles.SelectProfileHeaderFirst, { flexDirection: 'row' }]}>

                            <TouchableOpacity disabled={true}>
                                <Image
                                    style={[styles.menueImg, { tintColor: null }]}
                                    resizeMode='stretch'
                                    source={require('../../images/menu.png')}
                                />
                            </TouchableOpacity>

                        </View>


                        <View style={styles.SelectProfileHeaderSecond}>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                <Image
                                    style={styles.homeProfileImg}
                                    source={currentUser.profile_image ? { uri: currentUser.profile_image } : require('../../images/manProfile.png')}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{ marginLeft: '5%' }}>

                        <Text style={[styles.HeadingText, { marginTop: 0 }]}>Transactions</Text>

                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate("MyOrdersList", { orderStatus: "Pending", orders: filterOrders(["new", "accepted"]) }) }} activeOpacity={0.5}>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#F2BA39', '#ECB22E']}
                            style={[styles.buyerBGImg, { marginTop: (windowWidth * 10) / 100, }]}
                        >

                            <Text style={styles.buyerTxtTop}>Pending Order</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={[styles.bagImgBig, { marginLeft: 0 }]}
                                    resizeMode='stretch'
                                    source={require('../../images/bagBig.png')}
                                />
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("MyOrdersList", { orderStatus: "Completed", orders: filterOrders(["complete"]) }) }} activeOpacity={0.5}>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#36C5F0', '#368CF0']}
                            style={[styles.buyerBGImg, { marginTop: (windowWidth * 10) / 100, }]}
                        >

                            <Text style={styles.buyerTxtTop}>Completed</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={[styles.bagImgBig, { marginLeft: 0 }]}
                                    resizeMode='contain'
                                    source={require('../../images/completed.png')}
                                />
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("MyOrdersList", { orderStatus: "Cancelled", orders: filterOrders(["cancelled"]) }) }} activeOpacity={0.5}>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#BA2E5A', '#E01E82']}
                            style={[styles.buyerBGImg, { marginTop: (windowWidth * 10) / 100, }]}
                        >

                            <Text style={styles.buyerTxtTop}>Cancelled</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={[styles.bagImgBig, { marginLeft: 0 }]}
                                    resizeMode='contain'
                                    source={require('../../images/cancelled.png')}
                                />
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ height: 20 }} />
                </ScrollView>
                : null}
        </View>
    );

}