import React, { useState } from 'react';
import { color } from '../Utility/Color';
import { TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { styles } from '../Utility/Styles';
import { formatAmount } from '../Utility/Utils';
import ViewImages from './ViewImages';

const CardOrder = ({ order }) => {
    const [showProductPic, setShowProductPic] = useState(false)
    function getOrderStatus() {
        return order.status == "new" ? "Pending" : order.status == "complete" ? "Completed" : order.status == "accepted" ? "In Progress" : "Cancelled"
    }
    function getOrderStatusColor() {
        return order.status == "new" ? "#ECB22E" : order.status == "complete" ? "#36C5F0" : order.status == "accepted" ? "#36C5F0" : "#E01E82"
    }

    return (
        <View
            activeOpacity={0.5}
            style={styles.buttonStyle}>
            <ViewImages
                showImageViewer={showProductPic}
                images={[{ url: order.product_image }]}
                closeModal={() => setShowProductPic(false)}
            />
            <View style={Styles.listView}>
                <View style={Styles.upperView}>
                    <View style={{ flexDirection: 'row', }}>

                        <Text style={Styles.userName}>Order No.</Text>
                        <Text numberOfLines={1} style={[Styles.priceText, { marginLeft: '3%', width: '38%' }]}>
                            {order._id}
                        </Text>
                        <View style={[Styles.dateView, { backgroundColor: getOrderStatusColor() }]}>
                            <Text style={Styles.dateText}>{getOrderStatus()}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.userName}>Date Placed</Text>
                        <Text style={[Styles.priceText, { marginLeft: '3%', width: '38%' }]}>
                            {moment(order.preferred_date.$date.$numberLong, 'x').format("DD/MM/YYYY")}
                        </Text>
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

        </View>
    );
}

const Styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#D4D4D4",
        height: 55,
        width: '89%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        // elevation: 10
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: "#fff"
    },
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
    },
    boxView: {
        flexDirection: 'row',
        marginLeft: '5%'
    },
    crossButton: {
        marginLeft: -35,
        marginTop: -5,
    }
})

export default CardOrder;