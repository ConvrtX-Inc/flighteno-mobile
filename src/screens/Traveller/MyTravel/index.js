import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Button, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import countries from '../../../Utility/countries.json';
import { color } from '../../../Utility/Color';
import ButtonTraveller from '../../../components/ButtonTraveller';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'
import { AddTrip, UserTrips } from '../../../redux/actions/Trips';
import TextBold from '../../../components/atoms/TextBold'
import Toast from 'react-native-toast-message';
import TextSemiBold from '../../../components/atoms/TextSemiBold';


var windowWidth = Dimensions.get('window').width;
var originCities = ""
var destinationCities = ""

{/* Fix for FLIGHT-46 */}
export default function MyTravel({ route }) {

    const navigation = useNavigation();
    const { loading, currentCountry, currentUser, token } = useSelector(({ authRed }) => authRed)
    const { tripsData } = useSelector(({ tripsRed }) => tripsRed)
    const dispatch = useDispatch()

    const [mode, setMode] = useState('date');

    useFocusEffect(
        React.useCallback(() => {
            var obj = {
                admin_id: currentUser._id
            }
            dispatch(UserTrips(token, obj))
        }, [])
    )

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
    const [date, setDate] = useState(new Date());
    const [depDate, setDepDate] = useState(moment().format("DD/MM/YY"));
    const [depDateApi, setDepDateApi] = useState(moment().format("MM/DD/YYYY"));
    const [retDate, setRetDate] = useState("00/00/00");
    const [retDateApi, setRetDateApi] = useState("00/00/0000");
    const [country1, setCountry1] = useState(false)
    const [country2, setCountry2] = useState(false)

    const [modalCity, setModalCity] = useState("")
    const [modalCityDeliver, setModalCityDeliver] = useState("")

    const [modalVisibleCity, setModalVisibleCity] = useState("")
    const [modalVisibleCityDeliver, setModalVisibleCityDeliver] = useState("")

    const [withCountryNameButton, setWithCountryNameButton] = useState("")
    const [withCountryNameButtonDeliver, setWithCountryNameButtonDeliver] = useState("")

    const [country, setCountryOrigin] = useState(currentCountry)
    const [countryDeliver, setCountryDestination] = useState(currentCountry)

    
    const [pickerValuesCity, setPickerValuesCity] = useState([...new Set(countries[country.country_name])]);
    const [pickerValuesCityDeliver, setPickerValuesCityDeliver] = useState([...new Set(countries[country.country_name])]);

    const [pickerShowCity, setPickerShowCity] = useState(false);
    const [pickerValueSelectedCity, setPickerValueSelectedCity] = useState(currentCountry.city);
    const [pickerValueSelectedCityDeliver, setPickerValueSelectedCityDeliver] = useState(currentCountry.city);

    originCities = countries[country.country_name ? country.country_name : country.name];
    destinationCities = countries[countryDeliver.country_name ? countryDeliver.country_name : countryDeliver.name];

    const [show, setShow] = useState(false);

    const onSelect = (selectedCountry) => {
        setCountryCode(selectedCountry.cca2)
        setCountryOrigin(selectedCountry)
        originCities = countries[selectedCountry.name]
        if (originCities == undefined) {
            setPickerValueSelectedCity(selectedCountry.name)
        }
        else {
            // fix for FLIGHT-19
            setPickerValuesCity(originCities)
            setPickerValuesCity([...new Set(originCities)])
            setPickerValueSelectedCity(originCities.length > 0 ? originCities[0] : '')
        }

    }

    function getUniqueValues(value, index, self) {
        return self.indexOf(value) === index;
    }

    const onSelectDestinationCountry = (selectedCountry) => {
        setCountryCodeDeliver(selectedCountry.cca2)
        setCountryDestination(selectedCountry)
        destinationCities = countries[selectedCountry.name]

        if (destinationCities == undefined) {
            setPickerValueSelectedCityDeliver(selectedCountry.name)
        }
        else {
            setPickerValuesCityDeliver([...new Set(destinationCities)] )
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
                 /*Fix for FLIGHT-19*/
                setPickerValuesCity([...new Set(originCities)])
            }
            else {
                 /*Fix for FLIGHT-19*/
                setPickerValuesCity([...new Set(seachedCity)])
            }
        }
    }

    const searchCitiesDestination = (text) => {
        if (destinationCities != undefined) {
            var seachedCity = destinationCities.filter(function search(city) { return city.toUpperCase().includes(text.toUpperCase()) })
            if (text == "") {
                /*Fix for FLIGHT-19*/
                setPickerValuesCityDeliver([...new Set(destinationCities)])
            }
            else {
                 /*Fix for FLIGHT-19*/
                setPickerValuesCityDeliver([...new Set(seachedCity)])
            }
        }
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (mode == 'dep') {
            setShow(false);
            setDepDate(moment(currentDate).format("DD/MM/YY"));
            setDepDateApi(moment(currentDate).format("MM/DD/YYYY"));
        }
        else {
            setShow(false);
            setRetDate(moment(currentDate).format("DD/MM/YY"));
            setRetDateApi(moment(currentDate).format("MM/DD/YYYY"));
        }

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const addNewTrip = () => {
        if (retDate == "00/00/00") {
            Toast.show({
                type: 'error',
                text2: "Please select a return date",
            })
            return
        }
        var departureDate = moment(depDateApi, "MM/DD/YYYY");
        var returnDate = moment(retDateApi, "MM/DD/YYYY");
        if (departureDate.diff(returnDate, 'days') > 0) {
            Toast.show({
                type: 'error',
                text2: "Return date cannot less than departure date!",
            })
            return
        }

        const obj = {
            Traveling_from: country.country_name ? country.country_name : country.name,
            admin_id: currentUser._id,
            city_from: pickerValueSelectedCity,
            Traveling_to: countryDeliver.country_name ? countryDeliver.country_name : countryDeliver.name,
            city_to: pickerValueSelectedCityDeliver,
            depart_date: depDateApi,
            return_date: retDateApi
        }

        dispatch(AddTrip(token, obj))
    }

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>
                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Traveling From</TextBold>


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
                        <TextMedium style={styles.countryNameCSS}>{country.country_name ? country.country_name : country.name}</TextMedium>
                    </View>
                </TouchableOpacity>



                <View style={[styles.pickerVIew, { alignItems: 'center', marginTop: 30 }]}>

                    <TouchableOpacity style={styles.citySelect} onPress={() => setModalVisibleCity(!modalVisibleCity)}>
                        <TextMedium style={styles.countryNameCSS}>City</TextMedium>

                        <Image
                            style={[styles.countryDropImg, { marginLeft: 16 }]}
                            resizeMode='stretch'
                            source={require('../../../images/dropDpwnCountry.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.vertyicalLine}></View>

                    <View style={styles.countryNameCSSContainer}>
                        <TextMedium style={styles.countryNameCSS}>{pickerValueSelectedCity}</TextMedium>
                    </View>

                </View>




                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 10) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Traveling To</TextBold>


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
                        <TextMedium style={styles.countryNameCSS}>{countryDeliver.country_name ? countryDeliver.country_name : countryDeliver.name}</TextMedium>
                    </View>
                </TouchableOpacity>



                <View style={[styles.pickerVIew, { alignItems: 'center', marginTop: 30 }]}>

                    <TouchableOpacity style={styles.citySelect} onPress={() => setModalVisibleCityDeliver(!modalVisibleCityDeliver)}>
                        <TextMedium style={styles.countryNameCSS}>City</TextMedium>

                        <Image
                            style={[styles.countryDropImg, { marginLeft: 16 }]}
                            resizeMode='stretch'
                            source={require('../../../images/dropDpwnCountry.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.vertyicalLine}></View>

                    <View style={styles.countryNameCSSContainer}>
                        <TextMedium style={styles.countryNameCSS}>{pickerValueSelectedCityDeliver}</TextMedium>
                    </View>

                </View>



                <View style={styles.travelDateContainer}>

                    <View style={[styles.travelDateInner, { alignItems: 'flex-start' }]}>
                        <TextBold style={styles.travelDateTitle}>Depart</TextBold>

                        <TouchableOpacity onPress={() => showMode('dep')}>
                            <View style={{
                                flexDirection: 'row',
                                borderBottomColor: color.travelDateBorderColor,
                                borderBottomWidth: 1,
                                paddingBottom: 3,
                            }}>
                                <View>
                                    <Image
                                        style={styles.travelClandericon}
                                        resizeMode='stretch'
                                        source={require('../../../images/calendar.png')}
                                    />
                                </View>
                                <TextBold style={styles.travelDateText}>{depDate}</TextBold>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View style={[styles.travelDateInner, { alignItems: 'flex-end' }]}>
                        <TextBold style={[styles.travelDateTitle, { marginRight: 37 }]}>Return</TextBold>
                        <TouchableOpacity onPress={() => showMode('ret')}>

                            <View style={{
                                flexDirection: 'row',
                                borderBottomColor: color.travelDateBorderColor,
                                borderBottomWidth: 1,
                                paddingBottom: 3,
                            }}>
                                <View>
                                    <Image
                                        style={styles.travelClandericon}
                                        resizeMode='stretch'
                                        source={require('../../../images/calendar.png')}
                                    />
                                </View>
                                <Text style={[styles.travelDateText, { color: retDate == "00/00/00" ? 'gray' : 'black' }]}>{retDate}</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                </View>


                <View style={{ marginBottom: 30, marginTop: 10 }}>
                    <ButtonTraveller
                        title="Add trip"
                        loader={loading}
                        onPress={() => addNewTrip()}
                    />
                </View>


                {/* Travel List */}
                {tripsData.length > 0 ?
                    <FlatList
                        data={tripsData}
                        nestedScrollEnabled
                        renderItem={({ item, index }) =>
                            <View style={{}}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={index % 2 == 0 ? ['#36C5F0', '#368CF0'] : ['#2C5EBE', '#2C5EBE']}
                                    style={styles.travelList}
                                >
                                    <View style={styles.travelerListInnerView}>
                                        <View>
                                            <TextSemiBold style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>From</TextSemiBold>
                                            <TextBold style={styles.travelListValue}>{item.city}</TextBold>
                                            <TextRegular style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>{item.Traveling_from}</TextRegular>
                                        </View>
                                        <Image source={require("../../../images/travel.png")}
                                            resizeMode="contain"
                                            style={{ height: 60, width: 60 }}
                                        />
                                        <View>
                                            <TextSemiBold style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>To</TextSemiBold>
                                            <TextBold style={styles.travelListValue}>{item.cityTo}</TextBold>
                                            <TextRegular style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>{item.Traveling_to}</TextRegular>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, backgroundColor: color.travelerListBorderColor, }} />
                                    <View style={styles.travelerListInnerView}>
                                        <View>
                                            <TextSemiBold style={[styles.travelListTitle, { color: index % 2 == 0 ? color.travelerListTitle : "white" }]}>Date</TextSemiBold>
                                            <TextBold style={styles.travelListValue}>{moment(item.depart_date.$date.$numberLong, "x").format("MMMM DD, YYYY")}</TextBold>
                                        </View>
                                    </View>
                                    <View style={{ height: 15 }} />
                                </LinearGradient>
                            </View>

                        }
                        keyExtractor={item => item._id}
                        style={{ marginTop: 3 }}
                    />
                    : null}

                {/* Depart Date Calender */}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                    />
                )}



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
                            keyExtractor={(item, index) => item.key}
                            style={{ borderRadius: 100, marginTop: 3 }}
                        />
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
                            keyExtractor={(item, index) => item.key}
                            style={{ borderRadius: 100, marginTop: 3 }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );

}