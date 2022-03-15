import React, { useState } from 'react';
import { color } from '../Utility/Color';
import { TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { styles } from '../Utility/Styles';
import { formatAmount } from '../Utility/Utils';
import ViewImages from './ViewImages';
import { useTranslation } from 'react-i18next';
import TextBold from './atoms/TextBold';
import TextRegular from './atoms/TextRegular';

const CardOrderUser = ({ order }) => {
    
    const [showProductPic, setShowProductPic] = useState(false)
    const {t} = useTranslation()


    function getOrderStatus() {
        return order.status == "new" ? t('track.pending') : order.status == "complete" ? t('track.completed'): order.status == "accepted" ? t('track.inProgress') : t('track.cancelled')
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
                        <TextBold style={[Styles.userName, { marginLeft: '3%', flexWrap: 'wrap' }]}>
                            {order.buyer_details[0].full_name}
                        </TextBold>
                    </View>
                    <View style={[Styles.dateView, { backgroundColor: getOrderStatusColor() }]}>
                        <TextBold style={Styles.dateText}>
                            {getOrderStatus()}
                        </TextBold>
                    </View>
                </View>

                <View style={[styles.travelerListInnerView, { paddingLeft: 0, paddingRight: 0, marginTop: 5 }]}>
                    <View>
                        <TextBold style={[styles.travelListTitle, { color: color.travelerButtonColor, textAlign:'left' }]}>{t('travelHome.from')}</TextBold>
                        <TextBold style={[styles.travelListValue, { color: 'black' }]}>{order.product_buy_city_name}</TextBold>
                        <TextRegular style={[styles.travelListTitle, { color: 'black' }]}>{order.product_buy_country_name}</TextRegular>
                    </View>
                    <Image source={require("../images/travel1.png")}
                        resizeMode="contain"
                        style={{ height: 60, width: 60 }}
                    />
                    <View>
                        <TextBold style={[styles.travelListTitle, { color: color.travelerButtonColor, textAlign:'left' }]}>{t('travelHome.to')}</TextBold>
                        <TextBold style={[styles.travelListValue, { color: 'black' }]}>{order.product_dilivery_city_name}</TextBold>
                        <TextRegular style={[styles.travelListTitle, { color: 'black' }]}>{order.product_dilivery_country_name}</TextRegular>
                    </View>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#6A6585'}} />
            <View style={Styles.bottomView}>
                <TouchableOpacity onPress={() => setShowProductPic(true)} activeOpacity={1}>
                    <Image source={{ uri: order.product_image }}
                        style={Styles.productImage}
                    />
                </TouchableOpacity>
                <TextBold style={[Styles.userName, { marginLeft: 0, marginTop: 10 }]}>{order.name}</TextBold>
                <TextBold style={Styles.priceText}>
                    {formatAmount(order.Total)}
                </TextBold>
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
        // fontWeight: 'bold',
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
        // fontWeight: '900',
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