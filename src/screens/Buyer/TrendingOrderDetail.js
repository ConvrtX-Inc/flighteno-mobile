import React, { useState } from 'react';
import { color } from '../../Utility/Color';
import { ScrollView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../Utility/Styles'
import { formatAmount } from '../../Utility/Utils';
import ViewImages from '../../components/ViewImages'
import ButtonLarge from "../../components/ButtonLarge";
import { useSelector } from 'react-redux'

var windowWidth = Dimensions.get('window').width;
const TrendingOrderDetail = ({ route }) => {
    const { order } = route.params
    const navigation = useNavigation()
    const { loading } = useSelector(({ authRed }) => authRed)
    const [showProductPic, setShowProductPic] = useState(false)

    const imageProduct = [{
        url: order.product_image,
    }]
    return (
        <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
            <ViewImages
                showImageViewer={showProductPic}
                images={imageProduct}
                closeModal={() => setShowProductPic(false)}
            />
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../images/back.png')}
                    />
                </TouchableOpacity>
                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>{order.name}</Text>
                <View style={Styles.bottomView}>
                    <TouchableHighlight underlayColor="transparent" onPress={() => setShowProductPic(true)}>
                        <Image source={{ uri: order.product_image }}
                            style={Styles.productImage}
                        />
                    </TouchableHighlight>
                    <Text style={Styles.priceText}>
                        {formatAmount(order.product_price)}
                    </Text>
                </View>
                <View style={{ marginVertical: 20 }}>
                    <ButtonLarge
                        title="Create Order"
                        loader={loading}
                        onPress={() => navigation.navigate("UrlData", { data: order })}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    bottomView: {
        paddingHorizontal: '5%',
        marginTop: 20,
    },
    productImage: {
        height: 300,
        width: '100%',
        borderRadius: 10
    },
    priceText: {
        fontSize: 16,
        fontWeight: '900',
        color: color.skipTextColor,
        marginTop: 20
    },
})

export default TrendingOrderDetail;