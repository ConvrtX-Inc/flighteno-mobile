import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Button, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import countries from '../../../Utility/countries.json';
import { color } from '../../../Utility/Color';
import ButtonLarge from '../../../components/ButtonLarge';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { CREATE_ORDER_DETAIL } from '../../../redux/constants';
import { formatAmount } from '../../../Utility/Utils';


var windowWidth = Dimensions.get('window').width;
var originCities = ""
var destinationCities = ""
export default function SelectCountry({ route }) {

    const navigation = useNavigation();
    const { loading, currentCountry } = useSelector(({ authRed }) => authRed)
    const { buyerOrderData } = useSelector(({ buyerOrderRed }) => buyerOrderRed)
    const dispatch = useDispatch()
    const [withFlag, setWithFlag] = useState(true)
    const [withFlagDeliver, setWithFlagDeliver] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withEmojiDeliver, setWithEmojiDeliver] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withFilterDeliver, setWithFilterDeliver] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withAlphaFilterDeliver, setWithAlphaFilterDeliver] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const [withCallingCodeDeliver, setWithCallingCodeDeliver] = useState(false)
    const [countryCodeDeliver, setCountryCodeDeliver] = useState(currentCountry.country_code)
    const [countryCode, setCountryCode] = useState(currentCountry.country_code)
    const [modalCity, setModalCity] = useState("")
    const [modalVisibleCity, setModalVisibleCity] = useState("")
    const [modalVisibleCityDeliver, setModalVisibleCityDeliver] = useState("")
    const [withCountryNameButton, setWithCountryNameButton] = useState("")
    const [withCountryNameButtonDeliver, setWithCountryNameButtonDeliver] = useState("")
    const [deliveryDate, setDeliveryDate] = useState(moment(moment(buyerOrderData.preferred_dilivery_date).format("MM/DD/YYYY")).add(14, 'days'))
    const [deliveryDay, setDeliveryDay] = useState(moment(deliveryDate).format('dddd'))
    const [deliveryDateFormat, setDeliveryDateFormat] = useState(moment(deliveryDate).format("MM/DD/YYYY"))
    const [country1, setCountry1] = useState(false)
    const [country2, setCountry2] = useState(false)

    const [country, setCountryOrigin] = useState(currentCountry)
    const [countryDeliver, setCountryDestination] = useState(currentCountry)

    const [pickerValuesCity, setPickerValuesCity] = useState(countries[country.country_name]);
    const [pickerValuesCityDeliver, setPickerValuesCityDeliver] = useState(countries[country.country_name]);

    const [pickerValueSelectedCity, setPickerValueSelectedCity] = useState(currentCountry.city);
    const [pickerValueSelectedCityDeliver, setPickerValueSelectedCityDeliver] = useState(currentCountry.city);

    originCities = countries[country.country_name ? country.country_name : country.name];
    destinationCities = countries[countryDeliver.country_name ? countryDeliver.country_name : countryDeliver.name];

    const onSelect = (selectedCountry) => {
        setCountryCode(selectedCountry.cca2)
        setCountryOrigin(selectedCountry)
        originCities = countries[selectedCountry.name]
        if (originCities == undefined) {
            setPickerValueSelectedCity(selectedCountry.name)
        }
        else {
            setPickerValuesCity(originCities)
            setPickerValueSelectedCity(originCities.length > 0 ? originCities[0] : '')
        }

    }


    const onSelectDestinationCountry = (selectedCountry) => {
        setCountryCodeDeliver(selectedCountry.cca2)
        setCountryDestination(selectedCountry)
        destinationCities = countries[selectedCountry.name]
        if (destinationCities == undefined) {
            setPickerValueSelectedCityDeliver(selectedCountry.name)
        }
        else {
            setPickerValuesCityDeliver(destinationCities)
            setPickerValueSelectedCityDeliver(destinationCities.length > 0 ? destinationCities[0] : '')
        }

    }

    const selectPickerValueCityFN = (index) => {
        setModalVisibleCity(!modalVisibleCity)
        setPickerValueSelectedCity(pickerValuesCity[index])
    }

    const selectPickerValueCityDeliverFN = (index) => {
        setModalVisibleCityDeliver(!modalVisibleCityDeliver)
        setPickerValueSelectedCityDeliver(pickerValuesCityDeliver[index])
    }

    const searchCitiesOrigin = (text) => {
        if (originCities != undefined) {
            var seachedCity = originCities.filter(function search(city) { return city.toUpperCase().includes(text.toUpperCase()) })
            if (text == "") {
                setPickerValuesCity(originCities)
            }
            else {
                setPickerValuesCity(seachedCity)
            }
        }
    }

    const searchCitiesDestination = (text) => {
        if (destinationCities != undefined) {
            var seachedCity = destinationCities.filter(function search(city) { return city.toUpperCase().includes(text.toUpperCase()) })
            if (text == "") {
                setPickerValuesCityDeliver(destinationCities)
            }
            else {
                setPickerValuesCityDeliver(seachedCity)
            }
        }
    }

    const handleSubmit = () => {

        let deliveryFee = buyerOrderData.product_price / 100 * 10;
        deliveryFee = deliveryFee > 50 ? deliveryFee : 50;

        buyerOrderData["product_buy_country_name"] = country.country_name ? country.country_name : country.name
        buyerOrderData["product_buy_city_name"] = pickerValueSelectedCity
        buyerOrderData["product_dilivery_country_name"] = countryDeliver.country_name ? countryDeliver.country_name : countryDeliver.name
        buyerOrderData["product_dilivery_city_name"] = pickerValueSelectedCityDeliver
        buyerOrderData["flighteno_cost"] = Math.round((buyerOrderData.product_price / 100) * 7)
        buyerOrderData["product_dilivery_date"] = deliveryDateFormat
        buyerOrderData["estimated_dilivery_fee"] = deliveryFee
        buyerOrderData["tax"] = Math.round((buyerOrderData.product_price / 100) * 5)
        dispatch({ type: CREATE_ORDER_DETAIL, data: buyerOrderData })
        navigation.navigate("OrderDetail")
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
                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Select country</Text>


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Buy Product From</Text>


                <TouchableOpacity activeOpacity={1} disabled={country1 ? true : false} style={[styles.pickerVIew, { alignItems: 'center' }]}>
                    <TouchableOpacity onPress={() => setCountry1(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CountryPicker
                            countryCode={countryCode}
                            withFilter
                            withFlag
                            withAlphaFilter
                            withCallingCode
                            withEmoji
                            onSelect={(country) => onSelect(country)}
                            modalProps={{
                                visible: country1
                            }}
                            onClose={() => setCountry1(false)}
                            onOpen={() => setCountry1(true)}
                        />
                        <Image
                            style={styles.countryDropImg}
                            resizeMode='stretch'
                            source={require('../../../images/dropDpwnCountry.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.vertyicalLine}></View>

                    <View style={styles.countryNameCSSContainer}>
                        <Text style={styles.countryNameCSS}>{country.country_name ? country.country_name : country.name}</Text>
                    </View>
                </TouchableOpacity>



                <View style={[styles.pickerVIew, { alignItems: 'center', marginTop: 30 }]}>

                    <TouchableOpacity style={styles.citySelect} onPress={() => setModalVisibleCity(!modalVisibleCity)}>
                        <Text style={styles.countryNameCSS}>City</Text>

                        <Image
                            style={[styles.countryDropImg, { marginLeft: 16 }]}
                            resizeMode='stretch'
                            source={require('../../../images/dropDpwnCountry.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.vertyicalLine}></View>

                    <View style={styles.countryNameCSSContainer}>
                        <Text style={styles.countryNameCSS}>{pickerValueSelectedCity}</Text>
                    </View>

                </View>




                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 10) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Deliver Product To</Text>


                <TouchableOpacity activeOpacity={1} disabled={country2 ? true : false} style={[styles.pickerVIew, { alignItems: 'center' }]}>
                    <TouchableOpacity onPress={() => setCountry2(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CountryPicker
                            countryCode={countryCodeDeliver}
                            withFilter={withFilterDeliver}
                            withFlag={withFlagDeliver}
                            withCountryNameButton={withCountryNameButtonDeliver}
                            withAlphaFilter={withAlphaFilterDeliver}
                            withCallingCode={withCallingCodeDeliver}
                            withEmoji={withEmojiDeliver}
                            onSelect={(country) => onSelectDestinationCountry(country)}
                            modalProps={{
                                visible: country2
                            }}
                            onClose={() => setCountry2(false)}
                            onOpen={() => setCountry2(true)}
                        />
                        <Image
                            style={styles.countryDropImg}
                            resizeMode='stretch'
                            source={require('../../../images/dropDpwnCountry.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.vertyicalLine}></View>

                    <View style={styles.countryNameCSSContainer}>
                        <Text style={styles.countryNameCSS}>{countryDeliver.country_name ? countryDeliver.country_name : countryDeliver.name}</Text>
                    </View>
                </TouchableOpacity>



                <View style={[styles.pickerVIew, { alignItems: 'center', marginTop: 30 }]}>

                    <TouchableOpacity style={styles.citySelect} onPress={() => setModalVisibleCityDeliver(!modalVisibleCityDeliver)}>
                        <Text style={styles.countryNameCSS}>City</Text>

                        <Image
                            style={[styles.countryDropImg, { marginLeft: 16 }]}
                            resizeMode='stretch'
                            source={require('../../../images/dropDpwnCountry.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.vertyicalLine}></View>

                    <View style={styles.countryNameCSSContainer}>
                        <Text style={styles.countryNameCSS}>{pickerValueSelectedCityDeliver}</Text>
                    </View>

                </View>



                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 17) / 100, marginLeft: '5%' }]}>Delivery date</Text>


                <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', marginTop: 20 }]}>
                    Based on country selection we estimate this should be delivered by
                </Text>


                <Text style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 4) / 100, marginBottom: (windowWidth * 2) / 100 }]}>
                    {deliveryDay + " " + deliveryDateFormat}
                </Text>


                {/* <View style={styles.ordernumberStyle}>

                    <View style={styles.orderNumberIst}>
                        <Text style={styles.loginInputHeading}>Order No.</Text>

                    </View>
                    <View style={styles.orderNumberSecond}>

                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            121232264
                        </Text>
                    </View>

                </View> */}

                <View style={styles.orderBillStyle}>

                    <View style={styles.billLeft}>
                        <Text style={styles.loginInputHeading}>Order price</Text>
                    </View>

                    <View style={styles.billRight}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(buyerOrderData.product_price)}
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Estimated Delivery Fee</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(Math.round((buyerOrderData.product_price / 100) * 10) < 50 ? 50 : Math.round((buyerOrderData.product_price / 100) * 10))}
                        </Text>
                    </View>

                </View>

                {buyerOrderData.vip_service_status == "Yes" ?
                    <View style={styles.orderBillStyle}>

                        <View style={[styles.billLeft, { marginTop: 2 }]}>
                            <Text style={styles.loginInputHeading}>VIP Service Fee</Text>
                        </View>

                        <View style={[styles.billRight, { marginTop: 2 }]}>
                            <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                                {formatAmount(buyerOrderData.vip_service_fee)}
                            </Text>
                        </View>

                    </View>
                    : null}

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Flightneno cost</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(Math.round((buyerOrderData.product_price / 100) * 7))}
                        </Text>
                    </View>

                </View>


                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.loginInputHeading}>Tax</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.termText, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(Math.round((buyerOrderData.product_price / 100) * 5))}
                        </Text>
                    </View>

                </View>

                <View style={styles.orderBillStyle}>

                    <View style={[styles.billLeft, { marginTop: 2 }]}>
                        <Text style={styles.textLarge}>Total</Text>
                    </View>

                    <View style={[styles.billRight, { marginTop: 2 }]}>
                        <Text style={[styles.textLarge, { color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'justify', }]}>
                            {formatAmount(Math.round(buyerOrderData.product_price) + Math.round((buyerOrderData.product_price / 100) * 10) + Math.round((buyerOrderData.product_price / 100) * 7) + Math.round((buyerOrderData.product_price / 100) * 5) + Math.round(buyerOrderData.vip_service_fee))}
                        </Text>
                    </View>

                </View>

                <View style={{ marginTop: 40, marginBottom: 20 }}>
                    <ButtonLarge
                        title="Continue"
                        loader={loading}
                        onPress={() => handleSubmit()}
                    />
                </View>


            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleCity}
                onRequestClose={() => {
                    setModalCity(!modalCity);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text style={styles.modalText}>Hello World!</Text> */}

                        <View style={styles.modalCitySearchContainer}>
                            <TouchableOpacity onPress={() => setModalVisibleCity(!modalVisibleCity)}>
                                <Image
                                    style={styles.cityModalClose}
                                    resizeMode='stretch'
                                    source={require('../../../images/cross.png')}
                                />

                            </TouchableOpacity>

                            <TextInput style={styles.inputCityModal}
                                placeholder="Enter city name"
                                placeholderTextColor="#656F85"
                                onChangeText={text => searchCitiesOrigin(text)}
                                secureTextEntry={false}

                            />
                        </View>

                        <FlatList
                            data={pickerValuesCity}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) =>
                                <View style={{ marginLeft: 10, paddingVertical: 5, borderBottomColor: '#ddd', borderBottomWidth: 1, }}>
                                    <TouchableOpacity onPress={() => selectPickerValueCityFN(index)}>
                                        <View>
                                            <Text style={styles.textSelectedCity}>{item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            }
                            keyExtractor={item => item.id}
                            style={{ borderRadius: 100, marginTop: 3 }}
                        />
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisibleCity(!modalVisibleCity)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
                    </View>
                </View>
            </Modal>


            {/* /////////////Deliver */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleCityDeliver}
                onRequestClose={() => {
                    setModalVisibleCityDeliver(!modalVisibleCityDeliver);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text style={styles.modalText}>Hello World!</Text> */}

                        <View style={styles.modalCitySearchContainer}>
                            <TouchableOpacity onPress={() => setModalVisibleCityDeliver(!modalVisibleCityDeliver)}>
                                <Image
                                    style={styles.cityModalClose}
                                    resizeMode='stretch'
                                    source={require('../../../images/cross.png')}
                                />

                            </TouchableOpacity>

                            <TextInput style={styles.inputCityModal}
                                placeholder="Enter city name"
                                placeholderTextColor="#656F85"
                                onChangeText={text => searchCitiesDestination(text)}
                                secureTextEntry={false}

                            />
                        </View>

                        <FlatList
                            data={pickerValuesCityDeliver}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) =>
                                <View style={{ marginLeft: 10, paddingVertical: 5, borderBottomColor: '#ddd', borderBottomWidth: 1, }}>
                                    <TouchableOpacity onPress={() => selectPickerValueCityDeliverFN(index)}>
                                        <View>
                                            <Text style={styles.textSelectedCity}>{item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            }
                            keyExtractor={item => item.id}
                            style={{ borderRadius: 100, marginTop: 3 }}
                        />
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisibleCity(!modalVisibleCity)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
                    </View>
                </View>
            </Modal>




        </View>
    );

}