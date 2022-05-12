import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../Utility/Color';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../../components/SearchInput';
import Input from '../../components/InputField';
import { CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { GetTravelerOrders } from '../../redux/actions/Trips';
import CardOrderUser from '../../components/CardOrderUser';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ORDERS_TO_DESTINATION } from '../../redux/constants';
import TextRegular from '../../components/atoms/TextRegular';

var windowWidth = Dimensions.get('window').width;

var storeNamesList = [
    {
        id: '1',
        name: "Apple",
        checked: false
    },
]

var ordersList = [
    {
        id: '1',
        name: t('track.allOrders'),
        value: 'all',
        checked: true
    },
    {
        id: '2',
        name: t('track.completed'),
        value: 'complete',
        checked: false
    },
    {
        id: '3',
        name:t('track.accepted'),
        value: 'accepted',
        checked: false
    },
]

export default function AllOrders() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [showFilter, setShowFilter] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const { currentUser, token } = useSelector(({ authRed }) => authRed)
    const { travlerOrders } = useSelector(({ tripsRed }) => tripsRed)
    const [ordersByTravler, setOrderByTravler] = useState('')
    const {t} = useTranslation()

    const [ordersListNames, setOrdersListNames] = useState([{
        id: '1',
        name: t('track.allOrders'),
        value: 'all',
        checked: true
    },
    {
        id: '2',
        name: t('track.completed'),
        value: 'complete',
        checked: false
    },
    {
        id: '3',    
        name: t('track.pending'),
        value: 'pending',
        checked: false
    },
    {
        id: '4',    
        name: t('track.cancelled'),
        value: 'cancelled',
        checked: false
    }])



    useEffect(() => {
        // setOrderByTravler(travlerOrders.reverse())
        var obj = {
            admin_id: currentUser?._id
        }   
        if(currentUser?.kyc_status_verified){
            dispatch(GetTravelerOrders(obj, token, (data) => {
                setOrderByTravler(data)
            }))
            return
        }else{
            // dispatch({type: ORDERS_TO_DESTINATION, data: []});
            setOrderByTravler([])
            return
        }

    }, [currentUser])

    const selectStore = (index) => {
        setOrdersListNames(ordersListNames[index].name)
        ordersListNames.forEach(element => {
            element.checked = false
        });
        ordersListNames[index].checked = true
        setOrdersListNames([...ordersListNames])

        // console.log(ordersListNames[index].value)
        

        if (ordersListNames[index].value != "all") {
            var res = travlerOrders.filter(function (element) {
                return element.orderAsTraveler[0].status.toLowerCase().includes(ordersListNames[index].value.toLowerCase());
            });
            setOrderByTravler(res)
            console.log(travlerOrders[0].orderAsTraveler[0].status)
        }
        else {
            // console.log(travlerOrders)
            setOrderByTravler(travlerOrders)
        }
        
    }

    const handleSearch = (text) => {
        setSearchValue(text)
        var res = travlerOrders.filter(function (element) {
            return element.orderAsTraveler[0]._id.toLowerCase().includes(text.toLowerCase()) || element.orderAsTraveler[0].name.toLowerCase().includes(text.toLowerCase());
        });
        setOrderByTravler(res)
    }

    const renderHeader = () => (
        <>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                style={styles.backImg}
                resizeMode='stretch'
                source={require('../../images/back.png')}
            />
        </TouchableOpacity>


        {showFilter && 
        (
            <FilterView/>
        )}
         

        <View style={Styles.header}>
            <TextBold style={[styles.HeadingText, { marginTop: 0 }]}>{t('track.allOrders')}</TextBold>

            {currentUser?.kyc_status_verified ?
            (
                <TouchableOpacity onPress={() => setShowFilter(true)} style={styles.filterButton}>
                    <Image source={require('../../images/filter.png')}
                        style={styles.filterImage}
                    />
                    <TextBold style={{  fontSize: 15, color: color.userNameHomeColor }}>{t('travelHome.filter')}</TextBold>
                </TouchableOpacity>
            ):null
            }


        </View>
        </>
    )

    const FilterView  = () => (
        <SafeAreaView style={{
            display:'flex',
            flex:1,
            // position:'absolute',
            width:'100%',
            height:'100%',
            backgroundColor:'#fff',
        }}>
            <View style={{flex:1}}>
                <TouchableOpacity
                    onPress={() => setShowFilter(false)}
                >
                    <Icon name="cross" size={35} style={{margin: 0}} />
                </TouchableOpacity>
                <TextBold style={{fontSize:26, textAlign:'left'}}>{t('travelHome.filter')}</TextBold>
                <SearchInput/>

                {ordersListNames.map((item, index) => {
                    return (
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', marginTop:16}} key={index}>
                        <TextMedium style={{fontSize:16}}>{item?.name}</TextMedium>
                        <CheckBox
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle"
                            checkedColor={color.blueColor}
                            containerStyle={{padding: 0, margin: 0}}
                            checked={item?.checked}
                            onPress={() => selectStore(index)}
                        />
                </View>
                    )
                })}

            </View>
        </SafeAreaView>
    )

    const renderEmpty = () => {
        if(currentUser?.kyc_status_verified){
            return (<TextRegular style={{textAlign:'left'}}>{t('common.orderListEmpty')}</TextRegular>)
        }else{
            return (<TextRegular style={{textAlign:'left'}}>Your account is not verified</TextRegular>)
        }
    }

    return (
        <SafeAreaView style={{marginLeft:18, marginRight:18}}>
            <FlatList
                data={ordersByTravler}
                ListHeaderComponent={renderHeader}
                renderItem={({ item, index }) =>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("PendingOrderDetailT", { currentOrder: item.orderAsTraveler[0] })} style={Styles.listView}>
                        <CardOrderUser order={item.orderAsTraveler[0]} />
                    </TouchableOpacity>
                }
                keyExtractor={(item,index) => item + index}
                ListEmptyComponent={renderEmpty}
            />
        </SafeAreaView>
    );

}

const Styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: '5%',
        alignItems: 'center',
        marginVertical: 20
    },
    viewAll: {
        fontSize: 16,
        color: color.travelerListTitle
    },
    listView: {
        paddingVertical: 20,
        backgroundColor: color.inputBackColor,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20
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
})