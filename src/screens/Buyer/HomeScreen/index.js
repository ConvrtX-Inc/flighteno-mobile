import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, FlatList, Platform, PermissionsAndroid } from 'react-native';
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
import TextBold from '../../../components/atoms/TextBold'
import { GetLanguages } from '../../../redux/actions/Translation';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

var windowWidth = Dimensions.get('window').width;
{/* Fix for FLIGHT-46 */ }
export default function HomeScreen({navigation}) {

    // const navigation = useNavigation();
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const { currentCountry, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [url, setUrl] = useState('');
    const [productName, setProductName] = useState('');
    const [urlLoading, setUrlLoading] = useState(false)
    const { myRecentOrders, trendingOrders } = useSelector(({ tripsRed }) => tripsRed)
    const [currentAddress, setCurrentAddress] = useState();
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

            // dispatch(GetLanguages())

            return () => {
            };


        }, [])
    );


    async function getCurrentAddress() {
        if (Platform.OS === 'android') {
            try {
                 const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                console.log("granted", granted)
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                    Geolocation.getCurrentPosition(
                        (position) => {
                            const coordinates = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            }
                            console.log("COORS", coordinates)
                            Geocoder.geocodePosition(coordinates).then(res => {
                                setCurrentAddress(res[0]);
                            })
                        },
                        (error) => {
                            console.log("error:", error)
                            Toast.show({
                                type: 'error',
                                text2: "Please enable your device's location",
                            })
                            return
                        },
                        {
                            enableHighAccuracy: false,
                            timeout: 2000,
                        }
                    )
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }

    function getFlag(name) {
        return countriesFlags.find(element => element.name == name)?.flag
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
        <SafeAreaView style={{flex:1}}>

       
        <View style={styles.ScreenCss}>
            {currentUser ?
                <ScrollView>

                    {/* Home Screen Header */}
                    <View style={styles.selectProfileHeader}>

                        <View style={[styles.SelectProfileHeaderFirst, { flexDirection: 'row' }]}>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Profile')
                            }}>
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
                                <TextMedium style={styles.dubaiTxt}> {currentCountry?.city}, </TextMedium>
                                <TextMedium style={[styles.dubaiTxt, { opacity: 0.3 }]}>{currentCountry?.country_name}</TextMedium>
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

                        <TextBold style={[styles.dubaiTxt, { color: color.userNameHomeColor, marginTop: (windowWidth * 10) / 100, textAlign:'left' }]}>{t('common.hello')}, {currentUser?.full_name}</TextBold>
                        <TextBold style={[styles.HeadingText, { marginTop: 0, textAlign:'left' }]}>{t('buyerHome.createOrder')}</TextBold>

                    </View>



                    <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 10) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.enterUrl')}</TextBold>

                    <InputImag
                        placeholder="https://www.amazon.com/s?bbn"
                        onChangeText={text => setUrl(text)}
                        value={url}
                        onPress={() => goToUrl()}
                        secureTextEntry={false}
                        loader={urlLoading}
                    />

                    <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 2) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.enterManual')}</TextBold>

                    <InputImag
                        placeholder={t('buyerHome.productName')}
                        onChangeText={text => setProductName(text)}
                        value={productName}
                        onPress={() => goToManual()}
                        secureTextEntry={false}
                    />

                    <TextBold style={[styles.HeadingText, { marginLeft: '5%', marginTop: 10, marginBottom: 15, textAlign:'left' }]}>{t('buyerHome.trendingOrders')}</TextBold>

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
                        style={{  marginTop: 3, paddingLeft: '5%', }}
                    />


                    <TextBold style={[styles.HeadingText, { marginLeft: '5%', marginTop: 10, marginBottom: 15, textAlign:'left' }]}>{t('buyerHome.recentOrders')}</TextBold>

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

                                        <TextBold numberOfLines={3} style={{ fontSize: 15, marginTop: 5, width: (windowWidth * 28) / 100 }}>{item.name}</TextBold>

                                        <View style={{ flexDirection: 'row' }}>
                                            <TextMedium style={styles.countryFlag}>{getFlag(item.product_buy_country_name)}</TextMedium>
                                            <TextMedium style={styles.countryName}>{' ' + item.product_buy_country_name}</TextMedium>
                                        </View>

                                        <TextBold style={{ fontSize: 14 }}>{formatAmount(item.Total)}</TextBold>
                                    </View>

                                </TouchableOpacity>
                            </View>

                        }
                        keyExtractor={item => item._id}
                        style={{ marginTop: 3, marginBottom: 15, paddingLeft: '5%' }}
                    />

                </ScrollView>
                : null}
        </View>
        </SafeAreaView>
    );

}