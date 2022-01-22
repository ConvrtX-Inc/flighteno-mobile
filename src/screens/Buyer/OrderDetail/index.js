import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../../Utility/Color';
import { CheckBox } from 'react-native-elements';
import ButtonLarge from '../../../components/ButtonLarge';
import ButtonDisable from '../../../components/ButtonDisable';
import ButtonVerify from '../../../components/ButtonVerify';
import { CREATE_ORDER_DETAIL } from '../../../redux/constants';
import { createOrder } from '../../../redux/actions/BuyerOrder';
import { generateUID } from '../../../Utility/Utils';
import { RNS3 } from 'react-native-aws3';
import { IS_LOADING } from '../../../redux/constants';
import TextBold from '../../../components/atoms/TextBold';

var windowWidth = Dimensions.get('window').width;
export default function OrderDetail() {

    const navigation = useNavigation();
    const { loading, token } = useSelector(({ authRed }) => authRed)
    const { buyerOrderData } = useSelector(({ buyerOrderRed }) => buyerOrderRed)
    const dispatch = useDispatch()


    const [filePath, setFilePath] = useState();
    const [checked, setChecked] = useState(false);
    const [useForTesting, setUseForTesting] = useState(false);

    const navigate = (routeName, data) => {
        navigation.navigate(routeName, data);
    };

    const handleSubmit = () => {
        dispatch({ type: IS_LOADING, isloading: true })
        if (global.productImage.uri) {
            const file = {
                uri: global.productImage.uri,
                name: generateUID() + ".jpg",
                type: 'image/jpeg'
            }
            const options = {
                keyPrefix: "flighteno/orders/",
                bucket: "memee-bucket",
                region: "eu-central-1",
                accessKey: "AKIA2YJH3TLHCODGDKFV",
                secretKey: "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",
                successActionStatus: 201
            }
            RNS3.put(file, options).then(response => {
                if (response.status !== 201)
                    throw new Error("Failed to upload image to S3");

                buyerOrderData["open_box_check_phisical_apperance"] = checked
                buyerOrderData["use_item_for_testing"] = useForTesting
                buyerOrderData["product_image"] = response.body.postResponse.location
                dispatch({ type: CREATE_ORDER_DETAIL, data: buyerOrderData })
                dispatch(createOrder(buyerOrderData, navigate, token))

            });
        }
        else {
            buyerOrderData["open_box_check_phisical_apperance"] = checked
            buyerOrderData["use_item_for_testing"] = useForTesting
            buyerOrderData["product_image"] = global.productImage.url
            dispatch({ type: CREATE_ORDER_DETAIL, data: buyerOrderData })
            dispatch(createOrder(buyerOrderData, navigate, token))
        }

    }

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../../images/back.png')}
                    />
                </TouchableOpacity>
                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Order details</TextBold>

                {global.productImage.url ?
                    <Image
                        style={styles.productImg}
                        source={{ uri: global.productImage.url }}
                    />
                    :
                    <Image
                        style={styles.productImg}
                        source={{ uri: global.productImage.uri }}
                    />

                }

                <Text style={styles.subHeading}>{buyerOrderData.prodect_name}</Text>

                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', marginTop: 20 }]}>
                    {buyerOrderData.product_discription}
                </Text>


                <View style={styles.productDesc}>

                    <View style={styles.productDescInerFirst}>

                        <Text style={styles.productAtrributeHead}>Product Type</Text>
                        <Text style={styles.productAtrributeHead}>Weight</Text>
                        <Text style={styles.productAtrributeHead}>Quantity</Text>

                    </View>
                    <View style={styles.productDescInerSecond}>
                        <Text style={styles.productAtrribute}>{buyerOrderData.product_type}</Text>
                        <Text style={styles.productAtrribute}>{buyerOrderData.product_weight ? buyerOrderData.product_weight : "Not available"} {buyerOrderData.product_weight ? "kg" : ""}</Text>
                        <Text style={styles.productAtrribute}>{buyerOrderData.quantity}</Text>
                    </View>

                </View>


                <Text style={[styles.productAtrributeHead, { alignSelf: 'center', marginTop: 20 }]}>Allow Traveler to:</Text>
                <Text style={[styles.productAtrribute, { alignSelf: 'center' }]}>(If Applicable)</Text>


                <View style={styles.agreeTermContainer}>
                    <CheckBox
                        checkedIcon={<Image source={require('../../../images/checked.png')}
                            style={{ height: 25, width: 25, tintColor: '#ECB22E', borderRadius: 7 }}
                        />}
                        uncheckedIcon={<Image source={require('../../../images/unchecked.png')}
                            style={{ height: 25, width: 25, tintColor: '#EFF1F5' }}
                        />}
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                    />

                    <Text style={[styles.termAgreeText, { marginTop: 17, marginLeft: -10, fontWeight: 'normal', color: color.countrtTextColor, }]}>Open box and check physical Apperance</Text>
                </View>

                <View style={[styles.agreeTermContainer, { marginTop: -10 }]}>
                    <CheckBox
                        checkedIcon={<Image source={require('../../../images/checked.png')}
                            style={{ height: 25, width: 25, tintColor: '#ECB22E', borderRadius: 7 }}
                        />}
                        uncheckedIcon={<Image source={require('../../../images/unchecked.png')}
                            style={{ height: 25, width: 25, tintColor: '#EFF1F5' }}
                        />}
                        checked={useForTesting}
                        onPress={() => setUseForTesting(!useForTesting)}
                    />

                    <Text style={[styles.termAgreeText, { marginTop: 17, marginLeft: -10, fontWeight: 'normal', color: color.countrtTextColor, }]}>Use item for testing</Text>
                </View>


                <View style={{ marginBottom: 30, marginTop: 26 }}>
                    <ButtonLarge
                        title="Continue"
                        loader={loading}
                        onPress={() => handleSubmit()}
                    />
                </View>

                {/* <View style={{ marginBottom: 30, }}>
                    <ButtonDisable
                        title="Continue"
                        loader={loading}
                        onPress={() => navigation.navigate("OrderDetail")}
                    />
                </View>
                <View style={{ marginBottom: 30, }}>
                    <ButtonVerify
                        title="Verify Account"
                        loader={loading}
                        onPress={() => navigation.navigate("OrderDetail")}
                    />
                </View> */}
            </ScrollView>






        </View>
    );

}