import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/InputField';
import InputMultiline from '../../../components/inputFieldMultiLine';
import Toast from 'react-native-toast-message';
import { Slider } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonLarge from '../../../components/ButtonLarge';
import { color } from '../../../Utility/Color';
import { Switch } from 'react-native-switch';
import moment from 'moment'
import { CREATE_ORDER_DETAIL, IS_LOADING } from '../../../redux/constants';
import TextBold from '../../../components/atoms/TextBold';
import TextRegular from '../../../components/atoms/TextRegular';
import TextMedium from '../../../components/atoms/TextMedium';
import { useTranslation } from 'react-i18next';
import RNPickerSelect from 'react-native-picker-select';


var windowWidth = Dimensions.get('window').width;
{/* Fix for FLIGHT-46 */}
export default function ManualProductInfo({ route }) {

    const navigation = useNavigation();
    const { name } = route.params
    const { loading, currentUser } = useSelector(({ authRed }) => authRed)
    const { buyerOrderData } = useSelector(({ buyerOrderRed }) => buyerOrderRed)
    const dispatch = useDispatch()
    const [filePath, setFilePath] = useState({});
    const [date, setDate] = useState(new Date());
    const [dateValue, setDateValue] = useState("MM/DD/YYYY");
    const [fromTime, setFromTime] = useState("13:00 ");
    const [toTime, setToTime] = useState("18:00 ")
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [valueType, setValueType] = useState("")
    const [switchBox, setSwitchBox] = useState(false);
    const [sliderValue, setSliderValue] = useState('');
    const [pName, setPName] = useState('');
    const [vipServiceFee, setVipServiceFee] = useState('');
    const [description, setDescription] = useState('');
    const [pickerShow, setPickerShow] = useState(false);
    const [pickerValueSelected, setPickerValueSelected] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const [pickerValues, setPickerValues] = useState([
        {
            id: '0',
            option: 'Cell phones'
        },
        {
            id: '1',
            option: 'Cell phones accessories'
        },
        {
            id: '2',
            option: 'Computers'
        },
        {
            id: '3',
            option: 'Cameras'
        },
        {
            id: '4',
            option: 'Clothings'
        },
        {
            id: '5',
            option: 'Electronics'
        },
        {
            id: '6',
            option: 'Toys'
        },
        {
            id: '7',
            option: 'Beauty and personal care'
        },
        {
            id: '8',
            option: 'Novelty Items'
        },
        {
            id: '9',
            option: 'Retro or Vintage Items'
        }, {
            id: '10',
            option: 'Perishable / Edible'
        }, {
            id: '11',
            option: 'Others'
        },
    ]);
    const [pickerShowVip, setPickerShowVip] = useState(false);
    const {t} = useTranslation()
    const [pickerValueSelectedVip, setPickerValueSelectedVip] = useState(false);
    const [pickerValuesVip, setPickerValuesVip] = useState([
        {
            id: '0',
            option: 'Yes'
        },
        {
            id: '1',
            option: 'No'
        },

    ]);
    useEffect(() => {
        setPickerValueSelected(pickerValues[0].option)
        setPickerValueSelectedVip(pickerValuesVip[0].option)
    }, []);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (mode == 'date') {
            setShow(false);
            setDateValue(moment(currentDate).format("MM/DD/YYYY"));
        }
        else {
            if (valueType == 'from') {
                setShow(false);
                setFromTime(moment(currentDate).format("HH:mm"));
            }
            else {
                setShow(false);
                setToTime(moment(currentDate).format("HH:mm"));
            }
        }

    };

    const showMode = (currentMode, type) => {
        setShow(true);
        setMode(currentMode);
        setValueType(type)
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    // Picker selection
    const selectPickerValueFN = (index) => {

        setPickerShow(!pickerShow)
        setPickerValueSelected(pickerValues[index].option)
    }

    const selectPickerValueVipFN = (index) => {

        setPickerShowVip(!pickerShowVip)
        setPickerValueSelectedVip(pickerValuesVip[index].option)
    }


    // Image Picker
    const chooseFile = () => {
        let options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                let source = response.assets[0];
                global.productImage = source
                setFilePath(source);
            }
        });
    };


    const toggleSwitch = () => setSwitchBox(previousState => !previousState);

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity == 1) {
            return
        }
        else {
            setQuantity(quantity - 1)
        }
    }

    const handleSubmit = () => {
        if (pickerValueSelected == "") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please select product type", })
            return
        }
        if (pName == "") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please enter price", })
            return
        }
        if (pickerValueSelectedVip == "Yes" && vipServiceFee == "") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please enter vip service fee", })
            return
        }
        if (description == "") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please write down description", })
            return
        }
        if (filePath.uri == null || filePath.uri == undefined) {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please select image", })
            return
        }
        if (dateValue == "MM/DD/YYYY") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please select a delivery date", })
            return
        }
        var obj = {
            prodect_name: name,
            product_type: pickerValueSelected,
            product_price: pName,
            product_discription: description,
            preferred_dilivery_date: dateValue,
            preferred_dilivery_start_time: fromTime,
            preferred_dilivery_end_time: toTime,
            vip_service_status: pickerValueSelectedVip,
            vip_service_fee: pickerValueSelectedVip == "Yes" ? vipServiceFee : 0,
            product_weight: sliderValue,
            quantity: quantity,
            box_status: switchBox,
            prodect_url: "",
            order_type: "manual",
            admin_id: currentUser._id
        }
        dispatch({ type: CREATE_ORDER_DETAIL, data: obj })
        navigation.navigate("SelectCountry")
    }
    return (
        <View style={[styles.ScreenCss, { marginLeft:18, marginRight: 18 }]}>

            <ScrollView>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../../../images/back.png')}
                    />
                </TouchableOpacity>
                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', textAlign:'left' }]}>{t('buyerHome.manualInfo')}</TextBold>


                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.productName')}</TextBold>

                <Input
                    placeholder={name}
                    onChangeText={text => setPName(text)}
                    value={name}
                    secureTextEntry={false}
                    editable={false}
                />

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.productType')}</TextBold>

                {/* custom Picker */}

                <View style={[ Platform.OS == 'ios' ? styles.pickerVIew : styles.pickerAndroidView, {marginTop:16}]}>
                    <RNPickerSelect
                        onValueChange={setPickerValueSelected}
                        items={pickerValues}
                        style={{
                            inputIOS:{
                                fontFamily:'Gilroy-Medium',
                                color:'#656F85'
                            },
                            inputAndroid:{
                                fontFamily:'GilroyMedium',
                                color:'#656F85'
                            },
                            viewContainer:{
                                padding:Platform.OS == 'ios' ?  16 : 0
                            },
                            placeholder:{
                                fontFamily:'Gilroy-Medium',
                                fontSize:14
                            }
                        }
                        }
                        value={pickerValueSelected}     
                    />
                </View>

                {/* <View>
                    <Pressable onPress={() => setPickerShow(!pickerShow)}>
                        <View style={styles.pickerVIew}>

                            <View style={styles.pickerLeftView}>
                                <TextBold style={styles.textSelected}>{pickerValueSelected}</TextBold>
                            </View>
                            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={styles.pickerIcon}
                                    resizeMode='stretch'
                                    source={require('../../../images/pickerIcon.png')}
                                />
                            </View>

                        </View>
                    </Pressable>

                    {pickerShow == true ?
                        <View style={styles.pickerOptions}>
                            <FlatList
                                data={pickerValues}
                                nestedScrollEnabled={true}
                                renderItem={({ item, index }) =>
                                    <View style={{ marginLeft: 10, paddingVertical: 5, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
                                        <TouchableOpacity style={{height: 30, justifyContent: 'center'}} onPress={() => selectPickerValueFN(index)}>
                                            <View>
                                                <Text style={styles.textSelected}>{item.option}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                }
                                keyExtractor={item => item.id}
                                style={{ borderRadius: 100, marginTop: 3 }}
                            />
                        </View>
                        : null}
                </View> */}
                {/* custom Picker end */}

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.price')}</TextBold>

                <Input
                    placeholder="Enter price (for eg: $10.00)"
                    onChangeText={text => setPName(text.replace(/[^0-9]/g, ''))}
                    value={pName}
                    secureTextEntry={false}
                    keyboardType="number"
                />

                <TextRegular style={[styles.fasterItemTxt, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Do you want to get your item faster?</TextRegular>

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 2) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.tryVipServ')}</TextBold>

                {/* custom Picker */}

                <View>
                    <Pressable onPress={() => setPickerShowVip(!pickerShowVip)}>
                        <View style={styles.pickerVIew}>

                            <View style={styles.pickerLeftView}>
                                <TextMedium style={styles.textSelected}>{pickerValueSelectedVip}</TextMedium>
                            </View>
                            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={styles.pickerIcon}
                                    resizeMode='stretch'
                                    source={require('../../../images/pickerIcon.png')}
                                />
                            </View>

                        </View>
                    </Pressable>

                    {/* {pickerShowVip == true ?
                        <View style={styles.pickerOptions}>


                            <FlatList
                                data={pickerValuesVip}
                                renderItem={({ item, index }) =>
                                    <View style={{ marginLeft: 10, paddingVertical: 5, borderBottomColor: '#ddd', borderBottomWidth: 1, }}>
                                        <TouchableOpacity style={{height: 30, justifyContent: 'center'}} onPress={() => selectPickerValueVipFN(index)}>
                                            <View>
                                                <Text style={styles.textSelected}>{item.option}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                }
                                keyExtractor={item => item.id}
                                style={{ borderRadius: 100, marginTop: 3 }}
                            />


                        </View>
                        : null} */}
                </View>
                {/* custom Picker end */}

                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.vipServFee')}</TextBold>

                <Input
                    placeholder="$50.00"
                    onChangeText={text => setVipServiceFee(text.replace(/[^0-9]/g, ''))}
                    value={vipServiceFee}
                    secureTextEntry={false}
                    keyboardType="number"
                    editable={pickerValueSelectedVip == "No" ? false : true}
                />


                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.enterDesc')}</TextBold>

                <InputMultiline
                    placeholder="Description"
                    onChangeText={text => setDescription(text)}
                    value={description}
                    secureTextEntry={false}
                />

                <Slider
                    value={sliderValue}
                    onValueChange={(value) => setSliderValue(value)}
                    maximumValue={10}
                    minimumValue={0}
                    style={styles.sliderStyle}
                    step={1}
                    maximumTrackTintColor='#F6F9FF'
                    minimumTrackTintColor='#E76F51'
                    trackStyle={styles.sliderTrackStyle}
                    thumbStyle={styles.sliderThumbStyle}
                    thumbProps={{
                        children: (
                            <Image
                                style={styles.sliderImg}
                                resizeMode='stretch'
                                source={require('../../../images/sliderCircle.png')}
                            />
                        ),
                    }}
                />
                <View style={styles.sliderTxtContainer}>

                    <View style={styles.sliderTxtContainerFirst}>
                        <TextMedium style={styles.sliderTxt}>Less than 1kg</TextMedium>
                    </View>

                    <View style={styles.sliderTxtContainerSecond}>
                        <TextMedium style={styles.sliderTxt}>2-5kg</TextMedium>
                    </View>

                    <View style={styles.sliderTxtContainerOther}>
                        <TextMedium style={styles.sliderTxt}>5-8kg</TextMedium>
                    </View>

                    <View style={styles.sliderTxtContainerOther}>
                        <TextMedium style={styles.sliderTxt}>8-10kg</TextMedium>
                    </View>

                </View>


                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.uploadPic')}</TextBold>

                <TouchableOpacity style={{marginLeft: '5%', width: 100}} onPress={() => chooseFile()}>

                    {filePath.uri == undefined ?
                        <View style={styles.imgPickView}>

                            <Image
                                style={styles.cameraImgStyle}
                                resizeMode='stretch'
                                source={require('../../../images/cameraImg.png')}
                            />
                        </View>
                        :
                        <View style={styles.imgPickView}>
                            <Image
                                source={{ uri: filePath.uri }}
                                style={styles.imgPickShowStyle}
                            // resizeMode='stretch'
                            />
                        </View>
                    }
                </TouchableOpacity>



                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.prefDelDate')}</TextBold>


                <Pressable onPress={() => showMode('date', 'date')}>
                    <View style={styles.pickerVIew}>
                        <View style={styles.pickerLeftView}>
                            <TextMedium style={styles.textSelected}>{dateValue}</TextMedium>
                        </View>
                        <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={styles.datePickerIcon}
                                resizeMode='stretch'
                                source={require('../../../images/calendar.png')}
                            />
                        </View>
                    </View>
                </Pressable>


                <TextBold style={[styles.loginInputHeading, { marginLeft: '5%', marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.prefDelTime')}</TextBold>

                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <View style={styles.timePickerVIew}> */}
                    <TouchableOpacity style={styles.timePickerVIew} onPress={() => showMode('time', 'from')}>
                        <TextMedium style={{ color: color.verifyPhoneTextColor, }}>{fromTime}</TextMedium>
                    </TouchableOpacity>
                    {/* </View> */}

                    <TextMedium>{t('travelHome.to')}</TextMedium>

                    <TouchableOpacity style={styles.timePickerVIew} onPress={() => showMode('time', 'to')}>
                        {/* <View style={[styles.timePickerVIew, {width: '100%', paddingHorizontal: 0}]}> */}
                        <TextMedium style={{ color: color.verifyPhoneTextColor, }}>{toTime}</TextMedium>
                        {/* </View> */}
                    </TouchableOpacity>
                </View>


                <View style={{ height: 1, width: '100%', marginVertical: 25, backgroundColor: '#656F8588', }}></View>

                <View style={styles.quantityContainer}>

                    <View style={styles.leftQuantityStyle}>

                        <TextBold style={styles.loginInputHeading}>{t('buyerHome.quantity')}</TextBold>
                        <Text style={[styles.loginInputHeading, { color: color.verifyPhoneTextColor, fontWeight: '500' }]}>{quantity}</Text>

                    </View>


                    <View style={styles.rightQuantityStyle}>
                        <TouchableOpacity onPress={() => decreaseQuantity()}>
                            <View style={styles.quantityChange}>
                                <Image
                                    style={{ height: 2, width: 12 }}
                                    resizeMode='stretch'
                                    source={require('../../../images/minus.png')}
                                />
                            </View>
                        </TouchableOpacity>

                        <TextMedium style={[styles.loginInputHeading, { fontSize: 18, marginHorizontal: 10, }]}>{quantity}</TextMedium>

                        <TouchableOpacity onPress={() => increaseQuantity()}>
                            <View style={styles.quantityChange}>
                                <Image
                                    style={{ height: 12, width: 12 }}
                                    resizeMode='stretch'
                                    source={require('../../../images/plus.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ height: 1, width: '100%', marginVertical: 25, backgroundColor: '#656F8588', }}></View>
                <View style={styles.quantityContainer}>
                    <View style={styles.leftQuantityStyle}>

                        <TextBold style={[styles.loginInputHeading, {textAlign:'left'}]}>{t('buyerHome.doYouNeedBox')}?</TextBold>
                        <TextMedium style={[styles.loginInputHeading, { fontWeight: '500', color: color.verifyPhoneTextColor, }]}>{switchBox == false ? "No" : "Yes"}</TextMedium>
                    </View>
                    <View style={styles.rightQuantityStyle}>

                        {/* <Switch value={switchBox}
                            onPress={() => setSwitchBox(!switchBox)}
                        /> */}

                        {/* <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={switchBox ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={switchBox}
                        /> */}

                        <Switch
                            value={switchBox}
                            onValueChange={(val) => setSwitchBox(val)}
                            disabled={false}
                            activeText={'Yes'}
                            inActiveText={'No'}
                            circleSize={30}
                            barHeight={40}
                            circleBorderWidth={0}
                            backgroundActive={'#fff'}
                            backgroundInactive={'#fff'}
                            circleActiveColor={'#36C5F0'}
                            circleInActiveColor={'#36C5F0'}
                            changeValueImmediately={true}
                            renderInsideCircle={() => <Text></Text>} // custom component to render inside the Switch circle (Text, Image, etc.)
                            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                            outerCircleStyle={{ borderWidth: 2, backgroundColor: '#F6F9FF', borderColor: '#36C5F0', borderRadius: 30, width: 80 }} // style for outer animated circle
                            renderActiveText={true}
                            renderInActiveText={true}
                            activeTextStyle={{ color: '#36C5F0' }}
                            inactiveTextStyle={{ color: '#36C5F0' }}
                            switchLeftPx={-90} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                            switchRightPx={-90} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                            switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
                            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                            style={{ marginLeft: 20}}
                        />

                    </View>

                </View>

                <View style={{ height: 1, width: '100%', marginTop: 25, marginBottom: 15, backgroundColor: '#656F8588', }}></View>


                <TextMedium style={[styles.loginInputHeading, { color: color.verifyPhoneTextColor, fontWeight: '500', paddingHorizontal: '5%', marginBottom: 35 }]}>Note: The box mentioned above was the box from the manufacturer</TextMedium>

                <ButtonLarge
                    title={t('buyerHome.continue')}
                    loader={loading}
                    onPress={() => handleSubmit()}
                />

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
                <Text></Text>
            </ScrollView>

        </View>
    );

}