import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Pressable, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import ButtonTraveller from '../../components/ButtonTraveller';
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'
import Input from '../../components/InputField';
import { Slider, CheckBox } from 'react-native-elements';
import { TextInput } from 'react-native';
import Icon1 from 'react-native-vector-icons/Feather'
import { UserOrders, FilterOrders } from '../../redux/actions/Trips';
import { formatAmount } from '../../Utility/Utils';
import ViewImages from '../../components/ViewImages';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';

var storeNamesList = [
    {
        id: '1',
        name: "Apple",
        checked: false
    },
    {
        id: '2',
        name: "Amazone",
        checked: false
    },
    {
        id: '3',
        name: "Walmart",
        checked: false
    },
    {
        id: '4',
        name: "Hyerstar",
        checked: false
    },
]

export default function OrderDestination({ route }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const { ordersToDestination } = useSelector(({ tripsRed }) => tripsRed)
    const [showFilter, setShowFilter] = useState(false)
    const [pickerShow, setPickerShow] = useState(false);
    const [showImageView, setShowImageView] = useState(false)
    const [images, setImages] = useState([])
    const [pName, setPName] = useState('');
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(500000)
    const [selectedRange, setSelectedRange] = useState(0)
    const [filterOrderData, setFilterOrderData] = useState(ordersToDestination)
    const [rangeValue, setRangeValue] = useState("order_created_date")
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
    const [pickerValueSelected, setPickerValueSelected] = useState(pickerValues[0].option);
    const [storeValue, setStoreValue] = useState("")
    const [storeName, setNameOfStore] = useState("")
    const [sortMethod, setSortMethod] = useState(-1)
    const [storeNames, setStoreName] = useState([
        {
            id: 1,
            name: "Apple",
            checked: false
        },
        {
            id: 2,
            name: "Amazone",
            checked: false
        },
        {
            id: 3,
            name: "Walmart",
            checked: false
        },
        {
            id: 4,
            name: "Hyerstar",
            checked: false
        },
    ])

    useFocusEffect(
        React.useCallback(() => {
            setShowFilter(false)
            var obj = {
                admin_id: currentUser._id
            }
            dispatch(UserOrders(token, obj))

            return
        }, [])
    );

    useEffect(() => {
        var obj = {
            admin_id: currentUser._id
        }
        dispatch(UserOrders(token, obj))
    }, []);

    useEffect(() => {
        setFilterOrderData(ordersToDestination)
    }, [ordersToDestination]);

    const selectPickerValueFN = (index) => {
        setPickerShow(!pickerShow)
        setPickerValueSelected(pickerValues[index].option)
    }

    const searchStore = (text) => {
        setStoreValue(text)
        var searchedStore = storeNames.filter(function (e) {
            return e.name.toLowerCase().includes(text.toLowerCase());
        });
        if (text == "") {
            setStoreName(storeNamesList)
        }
        else {
            setStoreName(searchedStore)
        }
    }

    const selectStore = (index) => {
        setNameOfStore(storeNames[index].name)
        storeNames.forEach(element => {
            element.checked = false
        });
        storeNames[index].checked = true
        setStoreName([...storeNames])
    }

    const selectRange = (range, value, sort) => {
        setSelectedRange(range)
        setRangeValue(value)
        setSortMethod(sort)
    }

    const applyFilter = () => {

        

        // console.log(ordersToDestination[0]?.name)

    //    const filteredArray =  ordersToDestination.filter(function(data) {
    //         // return data?.name === pName
    //     })

  

        // ordersToDestination.forEach(el => {
        //     console.log(el.name === pName.toLowerCase())
        // });


        //name filtering
        const nameData = ordersToDestination.filter((item) => {
            const itemData = item?.name.toLowerCase();
            const textData = pName.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        
        //price filtering
        const priceArray = ordersToDestination.filter(function (el) {
            return el.product_price >= minPrice
        });


        //sort by price high to low
        
        var newArr = ordersToDestination
     

        for(var i = 0; i < newArr.length; i++){
            var item = newArr[i]?.product_price
            for(var j = i-1; j>=0 && (newArr[j] < item); j--){
                newArr[j+1] = newArr[j]
            }

            newArr[j+1] = item
        }

        console.log(newArr)
     
        // console.log(newArr)


        // var filteredArray = []
        // if (pName != "") {
        //     filteredArray = ordersToDestination.filter(function (el) {
        //         return el.product_type == pickerValueSelected &&
        //             el.name == pName &&
        //             el.product_price >= minPrice
        //     });
        // } else {
        //     filteredArray = ordersToDestination.filter(function (el) {
        //         return el.product_type == pickerValueSelected &&
        //             el.product_price >= minPrice
        //     });
        // }
        // function compare(a) {
        //     if (a[rangeValue] == rangeValue) {
        //         return sortMethod;
        //     }
        //     return 0;
        // }
        // var sortedData = filteredArray.sort(compare)
        // setFilterOrderData([...sortedData])
        // setShowFilter(false)
    }

    const showGallery = (data) => {
        images.length = 0
        images.push({ url: data })
        setShowImageView(true)
    }

    return (
        <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
            <ViewImages
                showImageViewer={showImageView}
                images={images}
                closeModal={() => setShowImageView(false)}
            />
            {showFilter ?
                <ScrollView>
                    <View style={{ marginTop: 20, }}>
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            <TouchableOpacity onPress={() => setShowFilter(false)} style={{ marginLeft: '-1.5%' }}>
                                <Icon name="cross" size={35} style={{ margin: 0 }} />
                            </TouchableOpacity>
                            <Text style={[styles.HeadingText, { marginTop: 10 }]}>Filter</Text>
                            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 20 }} />
                            <Text style={[styles.loginInputHeading, { marginTop: 5 }]}>Product Type</Text>
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <Pressable onPress={() => setPickerShow(!pickerShow)}>
                                <View style={styles.pickerVIew}>

                                    <View style={styles.pickerLeftView}>
                                        <Text style={styles.textSelected}>{pickerValueSelected}</Text>
                                    </View>
                                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={styles.pickerIcon}
                                            resizeMode='stretch'
                                            source={require('../../images/pickerIcon.png')}
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
                                            <View style={{ marginLeft: 10, paddingVertical: 5, borderBottomColor: '#ddd', borderBottomWidth: 1, }}>
                                                <TouchableOpacity onPress={() => selectPickerValueFN(index)}>
                                                    <View>
                                                        <Text style={styles.textSelected}>{item.option}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        }
                                        keyExtractor={item => item._id}
                                        style={{ borderRadius: 100, marginTop: 3 }}
                                    />


                                </View>
                                : null}
                        </View>
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            <Text style={[styles.loginInputHeading, { marginVertical: 20 }]}>Product name</Text>
                        </View>
                        <Input
                            placeholder="Enter product name"
                            onChangeText={text => setPName(text)}
                            value={pName}
                            secureTextEntry={false}
                        />
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            <Text style={[styles.loginInputHeading, { marginVertical: 20 }]}>Price</Text>
                        </View>

                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Input
                                    placeholder="0"
                                    onChangeText={(value) =>{
                                      if(value == ''){
                                        setMinPrice(0)
                                      }else{
                                        setMinPrice(parseInt(value))
                                      }
                                      
                                    }}
                                    value={minPrice?.toString() ?? 0}
                                    keyboardType='numeric'
                                    secureTextEntry={false}
                                />
                            </View>
                            <View style={{justifyContent:'center'}}>
                                <TextMedium>to</TextMedium>
                            </View>
                            <View style={{flex:1}}>
                                <Input
                                    placeholder="5000"
                                 
                                    secureTextEntry={false}
                                    editable={false}
                                />
                            </View>
                        </View>
                        {/* <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> */}
                            {/* <TouchableOpacity disabled={true} style={styles.timePickerVIew}>
                                <Text style={{ color: color.verifyPhoneTextColor, }}>{minPrice} </Text>

                            </TouchableOpacity> */}
{/* 
                            <Input
                            placeholder="0"
                            // onChangeText={text => setPName(text)}
                            value={minPrice}
                            secureTextEntry={false}
                                />

                            <Text>to</Text>

                            <Input
                            placeholder="6"
                            // onChangeText={text => setPName(text)}
                            value={minPrice}
                            secureTextEntry={false}
                            /> */}

                            {/* <TouchableOpacity disabled={true} style={styles.timePickerVIew}>
                                <Text style={{ color: color.verifyPhoneTextColor, }}>{maxPrice}</Text>
                            </TouchableOpacity> */}
                        {/* </View> */}


                        <Slider
                            value={minPrice}
                            onValueChange={(value) => setMinPrice(value)}
                            maximumValue={500000}
                            minimumValue={0}
                            style={[styles.sliderStyle, {}]}
                            step={10}
                            maximumTrackTintColor='#F6F9FF'
                            minimumTrackTintColor='#E76F51'
                            trackStyle={styles.sliderTrackStyle}
                            thumbStyle={styles.sliderThumbStyle}
                            thumbProps={{
                                children: (
                                    <Image
                                        style={styles.sliderImg}
                                        resizeMode='stretch'
                                        source={require('../../images/sliderCircle.png')}
                                    />
                                ),
                            }}
                        />
                        <View style={styles.sliderTxtContainer}>

                            <View style={styles.sliderTxtContainerFirst}>
                                <Text style={styles.sliderTxt}>0</Text>
                            </View>

                            <View style={[styles.sliderTxtContainerOther, { marginLeft: 'auto' }]}>
                                <Text style={styles.sliderTxt}>500000</Text>
                            </View>

                        </View>
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            <Text style={[styles.loginInputHeading, { marginVertical: 20 }]}>Store name</Text>
                        </View>
                        <View style={{ alignSelf: 'center', width: '90%', flexDirection: 'row' }}>
                            <TextInput
                                style={Styles.searchInput}
                                placeholder="Search Store Name"
                                value={storeValue}
                                onChangeText={(text) => searchStore(text)}
                            />
                            <View style={Styles.searchIcon}>
                                <Icon1 name="search" size={26} color={color.skipTextColor} />
                            </View>
                        </View>

                        <View>
                            <FlatList
                                data={storeNames}
                                style={Styles.storeNamesList}
                                nestedScrollEnabled
                                renderItem={({ item, index }) =>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <Text style={Styles.storeNameListText}>{item.name}</Text>
                                        <CheckBox
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle'
                                            checkedColor={color.blueColor}
                                            uncheckedColor={color.inputBackColor}
                                            containerStyle={{ padding: 0, margin: 0 }}
                                            checked={item.checked}
                                            onPress={() => selectStore(index)}
                                        />
                                    </View>

                                }
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            <Text style={[styles.HeadingText, { marginTop: 10 }]}>Sort</Text>
                            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 20 }} />
                            <TouchableOpacity onPress={() => selectRange(1, 'vip_service_fee', 1)}
                                style={Styles.rangeButton}>
                                <Text style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 1 ? color.blueColor : color.loginTextHeadingColor }]}>
                                    Vip Service Fee (High - Low)
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(2, 'order_created_date', -1)}
                                style={Styles.rangeButton}>
                                <Text style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 2 ? color.blueColor : color.loginTextHeadingColor }]}>
                                    Recent added
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(3, 'Total', -1)}
                                style={Styles.rangeButton}>
                                <Text style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 3 ? color.blueColor : color.loginTextHeadingColor }]}>
                                    Price (Low - High)
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(4, 'Total', 1)}
                                style={Styles.rangeButton}>
                                <Text style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 4 ? color.blueColor : color.loginTextHeadingColor }]}>
                                    Price (High - Low)
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(5, 'estimated_dilivery_fee', -1)}
                                style={Styles.rangeButton}>
                                <Text style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 5 ? color.blueColor : color.loginTextHeadingColor }]}>
                                    Delivery Fee (Low - High)
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(6, 'estimated_dilivery_fee', +1)}
                                style={Styles.rangeButton}>
                                <Text style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 6 ? color.blueColor : color.loginTextHeadingColor }]}>
                                    Delivery Fee (High - Low)
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <ButtonTraveller
                                onPress={() => applyFilter()}
                                loader={loading}
                                title="Apply filter"
                            />
                        </View>
                    </View>
                </ScrollView>
                : null}
            {!showFilter ?
                <View style={styles.orderDestinationHeader}>
                    <TextBold style={styles.HeadingText}>Recent orders</TextBold>
                    <TouchableOpacity onPress={() => { setShowFilter(!showFilter), setSelectedRange(0) }} style={styles.filterButton}>
                        <Image source={require('../../images/filter.png')}
                            style={styles.filterImage} />
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: color.userNameHomeColor }}>Filter</Text>
                    </TouchableOpacity>
                </View>
                : null}
            {filterOrderData && filterOrderData.length > 0 && !showFilter ?
                <FlatList
                    data={filterOrderData}
                    renderItem={({ item }) =>
                        <View style={Styles.listView}>
                            <View style={Styles.upperView}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {item?.profile_data[0]?.profile_image != "" ?
                                        <Image source={{ uri: item.profile_data[0].profile_image }}
                                            style={Styles.userImage}
                                        />
                                        :
                                        <Image source={require("../../images/manProfile.png")}
                                            style={Styles.userImage}
                                        />
                                    }
                                    <TextBold style={Styles.userName}>{item.profile_data[0].full_name}</TextBold>
                                </View> */}
                                <View style={[styles.travelerListInnerView, { paddingLeft: 0, paddingRight: 0, marginTop: 5 }]}>
                                    <View>
                                        <TextBold style={[styles.travelListTitle, { color: color.travelerButtonColor }]}>From</TextBold>
                                        <TextBold style={[styles.travelListValue, { color: 'black' }]}>{item.product_buy_city_name}</TextBold>
                                        <TextRegular style={[styles.travelListTitle, { color: 'black' }]}>{item.product_buy_country_name}</TextRegular>
                                    </View>
                                    <Image source={require("../../images/travel1.png")}
                                        resizeMode="contain"
                                        style={{ height: 60, width: 60 }}
                                    />
                                    <View>
                                        <TextBold style={[styles.travelListTitle, { color: color.travelerButtonColor }]}>To</TextBold>
                                        <TextBold style={[styles.travelListValue, { color: 'black' }]}>{item.product_dilivery_city_name}</TextBold>
                                        <TextRegular style={[styles.travelListTitle, { color: 'black' }]}>{item.product_dilivery_country_name}</TextRegular>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 1, backgroundColor: 'gray' }} />
                            <View style={Styles.bottomView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableHighlight underlayColor="transparent" onPress={() => showGallery(item.product_image)}>
                                        <Image source={{ uri: item.product_image }}
                                            style={Styles.productImage}
                                        />
                                    </TouchableHighlight>
                                    <View style={{ marginLeft: '5%', flexGrow: 1, flex: 1 }}>
                                        <TextBold style={[Styles.userName, { marginLeft: 0, }]}>{item.name}</TextBold>
                                        <TextMedium style={Styles.priceText}>{formatAmount(item.product_price)}</TextMedium>
                                        <TextBold style={[Styles.userName, { marginLeft: 0, marginTop: 10 }]}>Estimated Delivery fee</TextBold>
                                        <TextMedium style={Styles.priceText}>
                                            {formatAmount(Math.round((item.product_price / 100) * 10) < 50 ? 50 : Math.round((item.product_price / 100) * 10))}
                                        </TextMedium>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <ButtonTraveller
                                    loader={loading}
                                    title="View Details"
                                    onPress={() => navigation.navigate("OrderDetailT", { orderDetail: item })}
                                />
                            </View>
                        </View>
                    }
                    keyExtractor={item => item._id}
                /> : null}
        </View>
    );
}

const Styles = StyleSheet.create({
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
        borderRadius: 30
    },
    userName: {
        fontSize: 16,
        // fontWeight: 'bold',
        marginLeft: '5%'
    },
    bottomView: {
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,

    },
    productImage: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    priceText: {
        fontSize: 16,
        // fontWeight: '900',
        color: color.skipTextColor,
    },
    searchInput: {
        height: 50,
        width: '85%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
        paddingLeft: 20,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'OpenSans-Regular',
        backgroundColor: color.inputBackColor,
        borderRightWidth: 0
    },
    searchIcon: {
        height: 50,
        width: '15%',
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.inputBackColor,
        borderColor: '#00000011',
        borderWidth: 1,
        borderLeftWidth: 0
    },
    storeNamesList: {
        maxHeight: 200,
        width: '90%',
        alignSelf: 'center',
        marginLeft: '2%'
    },
    storeNameListText: {
        fontSize: 16,
        color: color.storeNamesListColor
    },
    rangeButton: {
        height: 50, justifyContent: 'center'
    }
})