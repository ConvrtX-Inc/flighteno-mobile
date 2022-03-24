import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {color} from '../../Utility/Color';
import {styles} from '../../Utility/Styles';
import ButtonTraveller from '../../components/ButtonTraveller';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Input from '../../components/InputField';
import {Slider, CheckBox} from 'react-native-elements';
import {
  UserOrders,
  FilterOrders,
  getStoreNames,
  FilterResetOrders,
} from '../../redux/actions/Trips';
import {formatAmount} from '../../Utility/Utils';
import ViewImages from '../../components/ViewImages';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import TextSemiBold from '../../components/atoms/TextSemiBold';
import {useTranslation} from 'react-i18next';
import ButtonLarge from '../../components/ButtonLarge';
import {FILTERED_ORDERS_DATA, IS_LOADING_RESET_FILTER} from '../../redux/constants';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { DefaultTheme } from 'react-native-paper';
import { DropdownList } from 'react-native-ultimate-modal-picker';
// import ModalDropdown from 'react-native-modal-dropdown';

export default function OrderDestination({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {loading, currentUser, token} = useSelector(({authRed}) => authRed);
  const {ordersToDestination} = useSelector(
    ({tripsRed}) => tripsRed,
  );
  const [showFilter, setShowFilter] = useState(false);
  const [pickerShow, setPickerShow] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [images, setImages] = useState([]);
  const [pName, setPName] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [selectedRange, setSelectedRange] = useState(0);

  const [rangeValue, setRangeValue] = useState('order_created_date');
  const [resetLoading, setResetLoading] = useState(false)



  const [pickerValues, setPickerValues] = useState([
    {
      id: '1',
      value: 'cell phones',
      label: 'Cell phones',
     
    },
    {
      id: '2',    
      value: 'cell phones accessories',
      label: 'Cell phones accessories',
    },
    {
      id: '3',
      value: 'computers',
      label: 'Computers',
    },
    {
      id: '4',
      value: 'cameras',
      label: 'Cameras',
    },
    {
      id: '5',
      value: 'clothings',
      label: 'Clothings',
    },
    {
      id: '6',
      value: 'electronics',
      label: 'Electronics',
    },
    {
      id: '7',
      value: 'toys',
      label: 'Toys',
    },
    {
      id: '8',
      value: 'beauty and personal care',
      label: 'Beauty and personal care',
    },
    {
      id: '9',
      value: 'novelty items',
      label: 'Novelty Items',
    },
    {
      id: '10',
      value: 'retro or vintage items',
      label: 'Retro or Vintage Items',
    },
    {
      id: '11',
      value: 'perishable / edible',
      label: 'Perishable / Edible',
    },
    {
      id: '12',
      value: 'others',
      label: 'Others',
    },
  ]);
  const [pickerValueSelected, setPickerValueSelected] = useState();
  const [storeValue, setStoreValue] = useState('');
  const [storeName, setNameOfStore] = useState('');
  const [sortMethod, setSortMethod] = useState(-1);
  const [storeData, setStoreData] = useState([]);
  const [productSelectedType, setProductType] = useState('')

  useEffect(() => {
    var obj = {
      admin_id: currentUser._id,
    };

    var stores = [];

    // dispatch(UserOrders(token, obj,() => {

    // }))
    dispatch(UserOrders(token, obj, () => {}));

    dispatch(
      getStoreNames(token, data => {
        // console.log(data)
        // setSortData(data)
        // setStoreData(data)
        const storeNames = data?.store_names;
        // console.log(data?.store_names)
        storeNames.forEach(item => {
          stores.push({name: item, checked: false});
        });
      }),
    );
    setStoreData(stores);
  }, []);

  const selectPickerValueFN = index => {
    setPickerShow(!pickerShow);
    setPickerValueSelected(pickerValues[index].value);
  };

  const selectStore = index => {
    // console.log(index)
    // console.log(storeData)
    storeData.forEach(item => {
      item.checked = false;
    });
    storeData[index].checked = true;

    setNameOfStore(storeData[index].name);
    setStoreData([...storeData]);
  };

  const selectRange = (range, value, sort) => {
    setSelectedRange(range);
    setRangeValue(value);
    setSortMethod(sort);
  };

  const applyFilter = () => {
    // var filteredArr = []
    // setFiltered(true)
    const productType = pickerValueSelected?.toLowerCase();
    const productName = pName;
    const startingPrice = minPrice;
    const endingPrice = '500000';
    const sortedBy = rangeValue.toLowerCase();
    const sort = sortMethod;

    const filterData = {
      product_type: productType,
      product_name: productName,
      starting_price: startingPrice,
      ending_price: endingPrice,
      sorted_by: sortedBy,
      sort: sort,
      store_name: storeName,
    };

   

    dispatch(FilterOrders(filterData, token, () => {
      setShowFilter(false);
    }))


  };

  const resetFilter = () => {
    var obj = {
        admin_id: currentUser._id,
    };

    // IS_LOADING_RESET_FILTER

    setResetLoading(true)

    dispatch(FilterResetOrders(token,obj,() => {
      setResetLoading(false)
      setPName('');
      setMinPrice(0);
      setShowFilter(false);

      setNameOfStore('');
      storeData.forEach(item => {
        item.checked = false;
      });
      setPickerValueSelected('')
      selectPickerValueFN(0);
    }))
    // dispatch(
    //   UserOrders(token, obj, () => {
    //     // dispatch({type:IS_LOADING_RESET_FILTER,isLoading:false})
    //     setPName('');
    //     setMinPrice(0);
    //     setShowFilter(false);

    //     setNameOfStore('');
    //     storeData.forEach(item => {
    //       item.checked = false;
    //     });
    //     selectPickerValueFN(0);
    //     setPickerShow(false);
    //   }),
    // );
  };

  const showGallery = data => {
    images.length = 0;
    images.push({url: data});
    setShowImageView(true);
  };


  return (
    <View style={{flex: 1, backgroundColor: color.backgroundColor}}>
      <ViewImages
        showImageViewer={showImageView}
        images={images}
        closeModal={() => setShowImageView(false)}
      />
      {showFilter ? (
        <>
          <ScrollView style={{marginLeft: 18, marginRight: 18}}>
            <TouchableOpacity
              onPress={() => setShowFilter(false)}
              style={{marginLeft: '-1.5%', marginTop:24}}
            >
              <Icon name="cross" size={35} style={{margin: 0}} />
            </TouchableOpacity>
            <TextBold
              style={[styles.HeadingText, {marginTop: 16, textAlign: 'left'}]}
            >
              {t('travelHome.filter')}
            </TextBold>
            <TextSemiBold
              style={[
                styles.loginInputHeading,
                {marginTop: 16, textAlign: 'left'},  
              ]}
            >
              {t('buyerHome.productType')}
            </TextSemiBold>



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
            


            <TextSemiBold
              style={[
                styles.loginInputHeading,
                {marginVertical: 20, textAlign: 'left'},
              ]}
            >
              {t('buyerHome.productName')}
            </TextSemiBold>
            <Input
              placeholder="Enter product name"
              onChangeText={text => setPName(text)}
              value={pName}
              secureTextEntry={false}
            />

            <TextSemiBold
              style={[
                styles.loginInputHeading,
                {marginVertical: 20, textAlign: 'left'},
              ]}
            >
              {t('buyerHome.price')}
            </TextSemiBold>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Input
                  placeholder="0"
                  onChangeText={value => {
                    if (value == '') {
                      setMinPrice(0);
                    } else {
                      setMinPrice(parseInt(value));
                    }
                  }}
                  value={minPrice?.toString() ?? 0}
                  keyboardType="numeric"
                  secureTextEntry={false}
                />
              </View>

              <View style={{justifyContent: 'center'}}>
                <TextMedium>{t('travelHome.to')}</TextMedium>
              </View>

              <View style={{flex: 1}}>
                <Input
                  placeholder="500000"
                  secureTextEntry={false}
                  editable={false}
                />
              </View>
            </View>

            <Slider
              value={minPrice}
              onValueChange={value => setMinPrice(value)}
              maximumValue={500000}
              minimumValue={0}
              style={[styles.sliderStyle, {}]}
              step={10}
              maximumTrackTintColor="#F6F9FF"
              minimumTrackTintColor="#E76F51"
              trackStyle={styles.sliderTrackStyle}
              thumbStyle={styles.sliderThumbStyle}
              thumbProps={{
                children: (
                  <Image
                    style={styles.sliderImg}
                    resizeMode="stretch"
                    source={require('../../images/sliderCircle.png')}
                  />
                ),
              }}
            />

            <View style={styles.sliderTxtContainer}>
              <View style={styles.sliderTxtContainerFirst}>
                <TextMedium style={styles.sliderTxt}>0</TextMedium>
              </View>

              <View
                style={[styles.sliderTxtContainerOther, {marginLeft: 'auto'}]}
              >
                <TextMedium style={styles.sliderTxt}>500000</TextMedium>
              </View>
            </View>

            {/* STORE NAMES */}
            <TextBold style={{fontSize:16, marginTop:24}}>Store name</TextBold>

            {storeData.map((item,index)=> {
                return (
                <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', marginTop:20}}>
                    <TextMedium style={{fontSize:16}}>{item?.name}</TextMedium>
                    <CheckBox
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle"
                        checkedColor={color.blueColor}
                        containerStyle={{padding: 0, margin: 0}}
                        checked={item?.checked}
                        onPress={() => {
                            selectStore(index)
                        }}
                    />
                </View>
                )
            })}
            

            {/* SORT */}


            <View style={{ alignSelf: 'center', width:'100%', marginTop:24 }}>
                            <TextBold style={[styles.HeadingText, { marginTop: 10, textAlign:'left' }]}>{t('travelHome.sort')}</TextBold>
                            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 20 }} />
                            <TouchableOpacity onPress={() => selectRange(1, 'vip_service_fee', 1)}
                                style={Styles.rangeButton}>
                                <TextSemiBold style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 1 ? color.blueColor : color.loginTextHeadingColor, textAlign:'left' }]}>
                                    {t('track.vipServFee')} ({t('travelHome.high')} - {t('travelHome.low')})
                                </TextSemiBold>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(2, 'order_created_date', -1)}
                                style={Styles.rangeButton}>
                                <TextSemiBold style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 2 ? color.blueColor : color.loginTextHeadingColor, textAlign:'left' }]}>
                                    {t('travelHome.recentAdded')}
                                </TextSemiBold>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(3, 'product_price', 1)}
                                style={Styles.rangeButton}>
                                <TextSemiBold style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 3 ? color.blueColor : color.loginTextHeadingColor,  textAlign:'left' }]}>
                                   {t('buyerHome.price')} ({t('travelHome.low')} - {t('travelHome.high')})
                                </TextSemiBold>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(4, 'product_price', -1)}
                                style={Styles.rangeButton}>
                                <TextSemiBold style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 4 ? color.blueColor : color.loginTextHeadingColor,  textAlign:'left' }]}>
                                    {t('buyerHome.price')} ({t('travelHome.high')} - {t('travelHome.low')})
                                </TextSemiBold>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(5, 'estimated_dilivery_fee', -1)}
                                style={Styles.rangeButton}>
                                <TextSemiBold style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 5 ? color.blueColor : color.loginTextHeadingColor,  textAlign:'left' }]}>
                                   {t('travelHome.delFee')} ({t('travelHome.low')} - {t('travelHome.high')})
                                </TextSemiBold>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectRange(6, 'estimated_dilivery_fee', 1)}
                                style={Styles.rangeButton}>
                                <TextSemiBold style={[styles.loginInputHeading,
                                { fontSize: 18, color: selectedRange == 6 ? color.blueColor : color.loginTextHeadingColor,  textAlign:'left' }]}>
                                      {t('travelHome.delFee')} ({t('travelHome.high')} - {t('travelHome.low')})
                                </TextSemiBold>
                            </TouchableOpacity>
                        </View>

            <View style={{marginTop:32}}>
              <ButtonLarge title='Reset' onPress={resetFilter} loader={resetLoading} />
            </View>
              

            <View style={{marginTop:16, marginBottom: 40}}>
              <ButtonTraveller
                onPress={applyFilter}
                loader={loading}
                title={t('travelHome.applyFilter')}
              />
            </View>                  


           
           
          </ScrollView>
        </>
      ) : null}
      {!showFilter ? (
        <View style={styles.orderDestinationHeader}>
          <TextBold style={styles.HeadingText}>
            {t('travelHome.recentOrders')}
          </TextBold>
          <TouchableOpacity
            onPress={() => {
              setShowFilter(!showFilter), setSelectedRange(0);
            }}
            style={styles.filterButton}
          >
            <Image
              source={require('../../images/filter.png')}
              style={styles.filterImage}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: color.userNameHomeColor,
              }}
            >
              {t('travelHome.filter')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {!showFilter ? (
        <FlatList
          data={ordersToDestination}
          //    extraData={loading}
          // refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {
          //     var obj = {
          //         admin_id: currentUser._id
          //     }
          //     dispatch(UserOrders(token, obj))
          // }}/>}
          nestedScrollEnabled
          ListEmptyComponent={() => (
            <View style={{marginLeft: 18}}>
              <TextMedium>Order list is empty</TextMedium>
            </View>
          )}
          renderItem={({item}) => (
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
                <View
                  style={[
                    styles.travelerListInnerView,
                    {paddingLeft: 0, paddingRight: 0, marginTop: 5},
                  ]}
                >
                  <View>
                    <TextBold
                      style={[
                        styles.travelListTitle,
                        {color: color.travelerButtonColor, textAlign: 'left'},
                      ]}
                    >
                      {t('travelHome.from')}
                    </TextBold>
                    <TextBold
                      style={[styles.travelListValue, {color: 'black'}]}
                    >
                      {item.product_buy_city_name}
                    </TextBold>
                    <TextRegular
                      style={[styles.travelListTitle, {color: 'black'}]}
                    >
                      {item.product_buy_country_name}
                    </TextRegular>
                  </View>
                  <Image
                    source={require('../../images/travel1.png')}
                    resizeMode="contain"
                    style={{height: 60, width: 60}}
                  />
                  <View>
                    <TextBold
                      style={[
                        styles.travelListTitle,
                        {color: color.travelerButtonColor, textAlign: 'left'},
                      ]}
                    >
                      {t('travelHome.to')}
                    </TextBold>
                    <TextBold
                      style={[styles.travelListValue, {color: 'black'}]}
                    >
                      {item.product_dilivery_city_name}
                    </TextBold>
                    <TextRegular
                      style={[styles.travelListTitle, {color: 'black'}]}
                    >
                      {item.product_dilivery_country_name}
                    </TextRegular>
                  </View>
                </View>
              </View>
              <View style={{height: 1, backgroundColor: 'gray'}} />
              <View style={Styles.bottomView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => showGallery(item.product_image)}
                  >
                    <Image
                      source={{uri: item.product_image}}
                      style={Styles.productImage}
                    />
                  </TouchableHighlight>
                  <View style={{marginLeft: '5%', flexGrow: 1, flex: 1}}>
                    <TextBold style={[Styles.userName, {marginLeft: 0}]}>
                      {item.name}
                    </TextBold>
                    <TextMedium style={Styles.priceText}>
                      {formatAmount(item.product_price)}
                    </TextMedium>
                    <TextBold
                      style={[
                        Styles.userName,
                        {marginLeft: 0, marginTop: 10, textAlign: 'left'},
                      ]}
                    >
                      {t('track.estimatedDelFee')}
                    </TextBold>
                    <TextMedium style={Styles.priceText}>
                      {formatAmount(
                        Math.round((item.product_price / 100) * 10) < 50
                          ? 50
                          : Math.round((item.product_price / 100) * 10),
                      )}
                    </TextMedium>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <ButtonTraveller
                  loader={loading}
                  title={t('travelHome.viewDetails')}
                  onPress={() =>
                    navigation.navigate('OrderDetailT', {orderDetail: item})
                  }
                />
              </View>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      ) : null}
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
    marginBottom: 20,
  },
  upperView: {
    paddingHorizontal: '5%',
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  userName: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginLeft: '5%',
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
    borderRadius: 10,
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
    fontFamily: 'Gilroy-Regular',
    backgroundColor: color.inputBackColor,
    borderRightWidth: 0,
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
    borderLeftWidth: 0,
  },
  storeNamesList: {
    maxHeight: 200,
    width: '90%',
    alignSelf: 'center',
    marginLeft: '2%',
  },
  storeNameListText: {
    fontSize: 16,
    color: color.storeNamesListColor,
  },
  rangeButton: {
    height: 50,
    justifyContent: 'center',
  },
});
