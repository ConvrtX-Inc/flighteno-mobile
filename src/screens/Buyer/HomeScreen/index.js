import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../../Utility/Styles';
import InputImag from '../../../components/InputFieldWithImage';
import { color } from '../../../Utility/Color';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { GetMyRecentOrders, GetTrendingOrders } from '../../../redux/actions/Trips';
import countriesFlags from '../../../Utility/countries_flags.json';
import { formatAmount } from '../../../Utility/Utils';
import { GetDataFromUrl } from '../../../redux/actions/BuyerOrder'
import { UrlTile } from 'react-native-maps';
import { IS_LOADING } from '../../../redux/constants';

var windowWidth = Dimensions.get('window').width;
export default function HomeScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentCountry, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [url, setUrl] = useState('');
    const [productName, setProductName] = useState('');
    const [urlLoading, setUrlLoading] = useState(false)
    const { myRecentOrders, trendingOrders } = useSelector(({ tripsRed }) => tripsRed)

    const goToDetails = (order) => {
        navigation.navigate("OrderDetails", { order: order })
    }

    useFocusEffect(
        React.useCallback(() => {
        dispatch({type: IS_LOADING, isloading: false})
            dispatch(GetTrendingOrders(token))
            var obj = {
                admin_id: currentUser._id
            }
            dispatch(GetMyRecentOrders(obj, token))
            return () => {
            };
        }, [])
    );

    function getFlag(name) {
        return countriesFlags.find(element => element.name == name).flag
    }

    const goToUrl = () => {
        if (url == "") {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Please enter url",
            })
            return
        }
        else {
            setUrlLoading(true)
            var data = {
                url: url
            }
            dispatch(GetDataFromUrl(data, token, () => {
                setUrlLoading(false)
            },
                () => {
                    Toast.show({
                        type: 'error',
                        text1: 'Alert!',
                        text2: "This url is not supported!",
                    })
                },
                (screenName, data) => {
                    navigation.navigate(screenName, { data: data })
                },
                () => {
                    Toast.show({
                        type: 'error',
                        text1: 'Alert!',
                        text2: "Url is only allowed from eBay Website!",
                    })
                },
            ))
        }
    }

    const goToManual = () => {
        if (productName == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter a product name",
            })
            return
        }
        else {
            navigation.navigate('ManualProductInfo', { name: productName })
        }
    }

    return (
        <View style={styles.ScreenCss}>
            {currentUser ?
                <ScrollView>

                    {/* Home Screen Header */}
                    <View style={styles.selectProfileHeader}>

                        <View style={[styles.SelectProfileHeaderFirst, { flexDirection: 'row' }]}>

                            <TouchableOpacity disabled={true}>
                                <Image
                                    style={[styles.menueImg, { tintColor: null }]}
                                    resizeMode='stretch'
                                    source={require('../../../images/menu.png')}
                                />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginLeft: (windowWidth * 15) / 100, }}>
                                <Image
                                    style={styles.locationImg}
                                    resizeMode='stretch'
                                    source={require('../../../images/location.png')}
                                />
                                <Text style={styles.dubaiTxt}> {currentCountry.city}, </Text>
                                <Text style={[styles.dubaiTxt, { opacity: 0.3 }]}>{currentCountry.country_name}</Text>
                            </View>

                        </View>


                        <View style={styles.SelectProfileHeaderSecond}>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                <Image
                                    style={styles.homeProfileImg}
                                    source={!currentUser.profile_image ? require('../../../images/manProfile.png') : { uri: currentUser.profile_image }}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{ marginLeft: '5%' }}>

                        <Text style={[styles.dubaiTxt, { color: color.userNameHomeColor, marginTop: (windowWidth * 10) / 100 }]}>Hello, {currentUser.full_name}</Text>
                        <Text style={[styles.HeadingText, { marginTop: 0 }]}>Create order</Text>

                    </View>



                    <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 10) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Enter URL</Text>

                    <InputImag
                        placeholder="https://www.amazon.com/s?bbn"
                        onChangeText={text => setUrl(text)}
                        value={url}
                        onPress={() => goToUrl()}
                        secureTextEntry={false}
                        loader={urlLoading}
                    />

                    <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 2) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Enter manual info</Text>

                    <InputImag
                        placeholder="Product name"
                        onChangeText={text => setProductName(text)}
                        value={productName}
                        onPress={() => goToManual()}
                        secureTextEntry={false}
                    />

                    <Text style={[styles.HeadingText, { marginLeft: '5%', marginTop: 10, marginBottom: 15 }]}>Trending orders</Text>

                    <FlatList
                        horizontal={true}
                        data={trendingOrders}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("TrendingOrderDetail", { order: item })} >
                                    <View>
                                        <Image
                                            style={styles.trendingListimg}
                                            source={{ uri: item.product_image }}
                                            resizeMode='contain'

                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        }
                        keyExtractor={item => item._id}
                        style={{ borderRadius: 100, marginTop: 3, paddingLeft: '5%', }}
                    />


                    <Text style={[styles.HeadingText, { marginLeft: '5%', marginTop: 10, marginBottom: 15 }]}>Recent orders</Text>

                    <FlatList
                        horizontal={true}
                        data={myRecentOrders}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity onPress={() => goToDetails(item)}>
                                    <View>
                                        <Image
                                            style={styles.trendingListimg}
                                            source={{ uri: item.product_image }}
                                        />
                                    </View>
                                    <View style={{ marginLeft: index == 0 ? '1%' : 0 }}>

                                        <Text numberOfLines={3} style={{ fontSize: 15, fontWeight: 'bold', marginTop: 5, width: (windowWidth * 28) / 100 }}>{item.name}</Text>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.countryFlag}>{getFlag(item.product_buy_country_name)}</Text>
                                            <Text style={styles.countryName}>{' ' + item.product_buy_country_name}</Text>
                                        </View>

                                        <Text style={{ fontSize: 14, fontWeight:'bold' }}>{formatAmount(item.Total)}</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>

                        }
                        keyExtractor={item => item._id}
                        style={{ borderRadius: 100, marginTop: 3, marginBottom: 15, paddingLeft: '5%' }}
                    />

                </ScrollView>
                : null}
        </View>
    );

}