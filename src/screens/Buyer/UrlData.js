import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/InputField';
import InputMultiline from '../../components/inputFieldMultiLine';
import Toast from 'react-native-toast-message';
import { Slider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonLarge from '../../components/ButtonLarge';
import { color } from '../../Utility/Color';
import { Switch } from 'react-native-switch';
import moment from 'moment'
import { CREATE_ORDER_DETAIL } from '../../redux/constants';
import TextBold from '../../components/atoms/TextBold';
import TextSemiBold from '../../components/atoms/TextSemiBold';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";

var windowWidth = Dimensions.get('window').width;

{/* Fix for FLIGHT-46 */}
export default function UrlData({ route }) {

    const navigation = useNavigation();
    const {t} = useTranslation()
    const { data } = route.params   
    const { loading, currentUser } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()
    const [filePath, setFilePath] = useState({});
    const [date, setDate] = useState(new Date());
    const [dateValue, setDateValue] = useState(moment());
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
            value: 'Cell phones',
            label: 'Cell phones'
        },
        {
            id: '1',
            value: 'Cell phones accessories',
            label:'Cell phones accessories'
        },
        {
            id: '2',
            value: 'Computers',
            label:'Computers'
        },
        {
            id: '3',
            value: 'Cameras',
            label:'Cameras'
        },
        {
            id: '4',
            value: 'Clothings',
            label:'Clothings'
        },
        {
            id: '5',
            value: 'Electronics',
            label:'Electronics'
        },
        {
            id: '6',
            value: 'Toys',
            label:'Toys'
        },
        {
            id: '7',
            value: 'Beauty and personal care',
            label:'Beauty and personal care'
        },
        {
            id: '8',
            value: 'Novelty Items',
            label:'Novelty Items'
        },
        {
            id: '9',
            value: 'Retro or Vintage Items',
            label:'Retro or Vintage Items'
        }, {
            id: '10',
            value: 'Perishable / Edible',
            label:'Perishable / Edible'
        }, {
            id: '11',
            value: 'Others',
            label:'Others'
        },
    ]);

    const [pickerShowVip, setPickerShowVip] = useState(false);
    const [pickerValueSelectedVip, setPickerValueSelectedVip] = useState(false);
    const [pickerValuesVip, setPickerValuesVip] = useState([
        {
            id: '0',
            value: 'Yes',
            label: 'Yes'
        },
        {
            id: '1',
            value: 'No',
            label:'No'
        },

    ]);
    useEffect(() => {
        setPickerValueSelected(pickerValues[0].option)
        setPickerValueSelectedVip(pickerValuesVip[0].option)

    }, []);
    const onChange = (event) => {
        const currentDate = event|| date;
        if (mode == 'date') {
            setShow(false);
            // setDateValue(moment(currentDate).format("YYYY/MM/DD"));
            setDateValue(currentDate);
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

    const onCancelTap = () => {
        setShow(false)
    }

    const handleSubmit = () => {
        if (pickerValueSelected == "") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please select product type", })
            return
        }
        if (pickerValueSelectedVip == "Yes" && vipServiceFee == "") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please enter vip service fee", })
            return
        }
        if (dateValue == "MM/DD/YYYY") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please select delivery date", })
            return
        }
        if (fromTime == "13:00 ") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please select start time", })
            return
        }
        if (toTime == "18:00 ") {
            Toast.show({ type: 'error', text1: 'Alert!', text2: "Please select end time", })
            return
        }
        var obj = {
            prodect_name: data.name,
            product_type: pickerValueSelected,
            product_price: data.price ? data.price : data.product_price,
            product_discription: data.name,
            preferred_dilivery_date: moment(dateValue).format("MM/DD/YYYY"),
            preferred_dilivery_date_db_format: dateValue.toString(),
            preferred_dilivery_start_time: fromTime,
            preferred_dilivery_end_time: toTime,
            vip_service_status: pickerValueSelectedVip,
            vip_service_fee: pickerValueSelectedVip == "Yes" ? vipServiceFee : 0,
            product_weight: "",
            quantity: quantity,
            box_status: switchBox,
            prodect_url: data.url,
            order_type: "url",
            admin_id: currentUser._id
        }
        global.productImage = {
            url: data.product_image
        }
        dispatch({ type: CREATE_ORDER_DETAIL, data: obj })
        navigation.navigate("SelectCountry")
    }
    return (
        <SafeAreaView style={{flex:1}}>
              <View style={[styles.ScreenCss, {marginLeft:18, marginRight:18}]}>
<ScrollView>

    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
            style={styles.backImg}
            resizeMode='stretch'
            source={require('../../images/back.png')}
        />
    </TouchableOpacity>
    <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100,textAlign:'left' }]}>{t('buyerHome.dataFromUrl')}</TextBold>


    <TextBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.yourUrl')}</TextBold>

    <Input
        placeholder={data.url}
        onChangeText={text => setPName(text)}
        value={data.url}
        secureTextEntry={false}
        editable={false}
        // numLines={2}
    />

    <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.productType')}</TextBold>

    {/* custom Picker */}

    <View>

        <View style={{ borderColor: '#00000011',borderWidth: 1 ,backgroundColor: '#F6F9FF',borderRadius: 35, padding:16}}>
            <RNPickerSelect
                onValueChange={(value) => {
                    setPickerValueSelected(value)
                }}
                items={pickerValues}
                // style={{
                //     inputIOS:{
                //         fontFamily:'Gilroy-Medium',
                //         color:'#656F85'
                //     },
                //     inputAndroid:{
                //         fontFamily:'GilroyMedium',
                //         color:'#656F85'
                //     },
                //     viewContainer:{
                //         padding:Platform.OS == 'ios' ?  16 : 0
                //     },
                //     placeholder:{
                //         fontFamily:'Gilroy-Medium',
                //         fontSize:14
                //     }
                // }
                // }
                // useNativeAndroidPickerStyle={true}
                value={pickerValueSelected}
            />
            </View>
        
        {/* <Pressable onPress={() => setPickerShow(!pickerShow)}>
            <View style={styles.pickerVIew}>

                <View style={styles.pickerLeftView}>
                    <TextMedium style={styles.textSelected}>{pickerValueSelected}</TextMedium>
                </View>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={styles.pickerIcon}
                        resizeMode='stretch'
                        source={require('../../images/pickerIcon.png')}
                    />
                </View>
            </View>
        </Pressable> */}
        {/* {pickerShow == true ?
            <View style={styles.pickerOptions}>
                <FlatList
                    data={pickerValues}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) =>
                        <View style={{ marginLeft: 10, paddingVertical: 5, borderBottomColor: '#ddd', borderBottomWidth: 1, }}>
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
            : null} */}
    </View>
    {/* custom Picker end */}
    <Image
        style={styles.productImg}
        resizeMode='contain'
        source={{uri: data.product_image}}
    />
    <TextBold style={styles.subHeading}>{data.name}</TextBold>
    <TextMedium style={[styles.termText, { color: color.countrtTextColor, opacity: 10, textAlign: 'justify', marginTop: 20 }]}>
    {data.name}
    </TextMedium>
    <View style={styles.productDesc}>
        <View style={styles.productDescInerFirst}>
            <TextBold style={styles.productAtrributeHead}>{t('buyerHome.color')}</TextBold>
            <TextBold style={styles.productAtrributeHead}>{t('buyerHome.weight')}</TextBold>
            <TextBold style={styles.productAtrributeHead}>{t('buyerHome.condition')}</TextBold>
        </View>
        <View style={styles.productDescInerSecond}>
            <TextMedium style={styles.productAtrribute}>{t('buyerHome.notAvail')}</TextMedium>
            <TextMedium style={styles.productAtrribute}>{t('buyerHome.notAvail')}</TextMedium>
            <TextMedium style={styles.productAtrribute}>{t('buyerHome.notAvail')}</TextMedium>
        </View>
    </View>
    <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.prefDelDate')}</TextBold>
    <Pressable onPress={() => showMode('date', 'date')}>
        <View style={[styles.pickerVIew, {padding:16}]}>
            <View style={styles.pickerLeftView}>
                <TextMedium style={styles.textSelected}>{moment(dateValue).format('MM/DD/YYYY')}</TextMedium>
            </View>
            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <Image  
                    style={styles.datePickerIcon}
                    resizeMode='stretch'
                    source={require('../../images/calendar.png')}
                />
            </View>
        </View>
    </Pressable>
    <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.prefDelTime')}</TextBold>
    <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={styles.timePickerVIew} onPress={() => showMode('time', 'from')}>
            <TextMedium style={{ color: color.verifyPhoneTextColor, }}>{fromTime}</TextMedium>
        </TouchableOpacity>
        <TextMedium>{t('travelHome.to')}</TextMedium>
        <TouchableOpacity style={styles.timePickerVIew} onPress={() => showMode('time', 'to')}>
            <TextMedium style={{ color: color.verifyPhoneTextColor, }}>{toTime}</TextMedium>
        </TouchableOpacity>
    </View>
    <View style={{ height: 1, width: '100%', marginVertical: 25, backgroundColor: '#656F8588', }}></View>
    <View style={styles.quantityContainer}>
        <View style={styles.leftQuantityStyle}>
            <TextBold style={[styles.loginInputHeading, {textAlign:'left'}]}>{t('buyerHome.quantity')}</TextBold>
            <TextMedium style={[styles.loginInputHeading, { color: color.verifyPhoneTextColor, fontWeight: '500' }]}>{quantity}</TextMedium>
        </View>
        <View style={styles.rightQuantityStyle}>
            <TouchableOpacity onPress={() => decreaseQuantity()}>
                <View style={styles.quantityChange}>
                    <Image
                        style={{ height: 2, width: 12 }}
                        resizeMode='stretch'
                        source={require('../../images/minus.png')}
                    />
                </View>
            </TouchableOpacity>
            <TextBold style={[styles.loginInputHeading, { fontSize: 18, marginHorizontal: 10, }]}>{quantity}</TextBold>
            <TouchableOpacity onPress={() => increaseQuantity()}>
                <View style={styles.quantityChange}>
                    <Image
                        style={{ height: 12, width: 12 }}
                        resizeMode='stretch'
                        source={require('../../images/plus.png')}
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
                style={{ marginLeft: 20 }}
            />
        </View>
    </View>

    <View style={{ height: 1, width: '100%', marginVertical: 25, backgroundColor: '#656F8588' }}></View>

    <TextMedium style={[styles.loginInputHeading, { color: color.verifyPhoneTextColor, fontWeight: '500', marginBottom: 35 }]}>Note: The box mentioned above was the box from the manufacturer</TextMedium>

    <TextMedium style={[styles.fasterItemTxt, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100 }]}>Do you want to get your item faster?</TextMedium>

    <TextSemiBold style={[styles.loginInputHeading, { marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.tryVipServ')}</TextSemiBold>

    {/* custom Picker */}

    <View>
        {/* <Pressable onPress={() => setPickerShowVip(!pickerShowVip)}>
            <View style={styles.pickerVIew}>
                <View style={styles.pickerLeftView}>
                    <TextMedium style={styles.textSelected}>{pickerValueSelectedVip}</TextMedium>
                </View>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={styles.pickerIcon}
                        resizeMode='stretch'
                        source={require('../../images/pickerIcon.png')}
                    />
                </View>
            </View>
        </Pressable> */}
        <View  style={{borderColor: '#00000011',borderWidth: 1 ,backgroundColor: '#F6F9FF',borderRadius: 35}}>
                <RNPickerSelect
            onValueChange={(value) => {
                // setPickerValueSelected(value)
                setPickerValueSelectedVip(value)
            }}
            items={pickerValuesVip}
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
          value={pickerValueSelectedVip}
          />
        </View>

    </View>

    {
        pickerValueSelectedVip == "Yes" ? (
            <View>
                <TextBold style={[styles.loginInputHeading, {  marginTop: (windowWidth * 8) / 100, marginBottom: (windowWidth * 2) / 100, textAlign:'left' }]}>{t('buyerHome.vipServFee')}</TextBold>
                    <Input
                        placeholder="$50.00"
                        onChangeText={text => setVipServiceFee(text.replace(/[^0-9]/g, ''))}
                        value={vipServiceFee}
                        secureTextEntry={false}
                        editable={pickerValueSelectedVip == "No" ? false : true}
                        keyboardType="number"
                    />
            </View>
        ) : null
    }                

    <View style={{ height: 50 }} />

    <ButtonLarge
        title={t('buyerHome.continue')}
        loader={loading}
        onPress={() => handleSubmit()}
    />
    {/* {show && (
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
        />
    )} */}
</ScrollView>

        {show && (
            <DateTimePickerModal
                isVisible={show}
                mode={mode}
                onConfirm={onChange}
                onCancel={onCancelTap}
            />
        )}


</View>
        </SafeAreaView>
    );

}