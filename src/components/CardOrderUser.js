import React, { useState } from 'react';
import { color } from '../Utility/Color';
import { TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { styles } from '../Utility/Styles';
import { formatAmount } from '../Utility/Utils';
import ViewImages from './ViewImages';

const CardOrderUser = ({ order }) => {
    const [showProductPic, setShowProductPic] = useState(false)
    function getOrderStatus() {
        return order.status == "new" ? "Pending" : order.status == "complete" ? "Completed" : order.status == "accepted" ? "In Progress" : "Cancelled"
    }
    function getOrderStatusColor() {
        return order.status == "new" ? "#ECB22E" : order.status == "complete" ? "#36C5F0" : order.status == "accepted" ? "#36C5F0" : "#E01E82"
    }

    return (
        <View>
            <View style={Styles.upperView}>
                <ViewImages
                    showImageViewer={showProductPic}
                    images={[{ url: order.product_image }]}
                    closeModal={() => setShowProductPic(false)}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Image source={order.buyer_details[0].profile_image == "" ? require("../images/manProfile.png") : { uri: order.buyer_details[0].profile_image }}
                            style={Styles.userImage}
                        />
                        <Text style={[Styles.userName, { marginLeft: '3%', flexWrap: 'wrap' }]}>
                            {order.buyer_details[0].full_name}
                        </Text>
                    </View>
                    <View style={[Styles.dateView, { backgroundColor: getOrderStatusColor() }]}>
                        <Text style={Styles.dateText}>
                            {getOrderStatus()}
                        </Text>
                    </View>
                </View>

                <View style={[styles.travelerListInnerView, { paddingLeft: 0, paddingRight: 0, marginTop: 5 }]}>
                    <View>
                        <Text style={[styles.travelListTitle, { color: color.travelerButtonColor }]}>From</Text>
                        <Text style={[styles.travelListValue, { color: 'black' }]}>{order.product_buy_city_name}</Text>
                        <Text style={[styles.travelListTitle, { color: 'black' }]}>{order.product_buy_country_name}</Text>
                    </View>
                    <Image source={require("../images/travel1.png")}
                        resizeMode="contain"
                        style={{ height: 60, width: 60 }}
                    />
                    <View>
                        <Text style={[styles.travelListTitle, { color: color.travelerButtonColor }]}>To</Text>
                        <Text style={[styles.travelListValue, { color: 'black' }]}>{order.product_dilivery_city_name}</Text>
                        <Text style={[styles.travelListTitle, { color: 'black' }]}>{order.product_dilivery_country_name}</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: 'gray' }} />
            <View style={Styles.bottomView}>
                <TouchableOpacity onPress={() => setShowProductPic(true)} activeOpacity={1}>
                    <Image source={{ uri: order.product_image }}
                        style={Styles.productImage}
                    />
                </TouchableOpacity>
                <Text style={[Styles.userName, { marginLeft: 0, marginTop: 10 }]}>{order.name}</Text>
                <Text style={Styles.priceText}>
                    {formatAmount(order.Total)}
                </Text>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    upperView: {
        paddingHorizontal: '5%',
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
    storeNamesList: {
        maxHeight: 200,
        width: '90%',
        alignSelf: 'center',
        marginLeft: '2%'
    },
})

export default CardOrderUser;