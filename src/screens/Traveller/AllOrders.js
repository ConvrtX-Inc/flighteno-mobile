import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../Utility/Color';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../../components/SearchInput';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo'
import { GetTravelerOrders } from '../../redux/actions/Trips';
import CardOrderUser from '../../components/CardOrderUser';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';

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
        name: 'All Orders',
        value: 'all',
        checked: true
    },
    {
        id: '2',
        name: 'completed',
        value: 'complete',
        checked: false
    },
    {
        id: '3',
        name:'accepted',
        value: 'accepted',
        checked: false
    },
]

export default function AllOrders() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [showFilter, setShowFilter] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [ordersListNames, setOrdersListNames] = useState(ordersList)
    const { currentUser, token } = useSelector(({ authRed }) => authRed)
    const { travlerOrders } = useSelector(({ tripsRed }) => tripsRed)
    const [ordersByTravler, setOrderByTravler] = useState(travlerOrders)
    const {t} = useTranslation()

    useEffect(() => {
        setOrderByTravler(travlerOrders.reverse())
    }, [travlerOrders])

    useFocusEffect(
        React.useCallback(() => {
            setOrderByTravler(travlerOrders.reverse())
            ordersListNames.forEach(element => {
                if (element.name == "All Orders") {
                    element.checked = true
                }
                else {
                    element.checked = false
                }
            });
            setOrdersListNames([...ordersListNames])
            var obj = {
                admin_id: currentUser._id
            }
            dispatch(GetTravelerOrders(obj, token))
            return () => {
            };
        }, [])
    );

    const selectStore = (index) => {
        setOrdersListNames(ordersListNames[index].name)
        ordersListNames.forEach(element => {
            element.checked = false
        });
        ordersListNames[index].checked = true
        setOrdersListNames([...ordersListNames])
        if (ordersListNames[index].value != "all") {
            var res = travlerOrders.filter(function (element) {
                return element.orderAsTraveler[0].status.toLowerCase().includes(ordersListNames[index].value.toLowerCase());
            });
            setOrderByTravler(res)
        }
        else {
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

    return (
        <View style={styles.ScreenCss}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={styles.backImg}
                    resizeMode='stretch'
                    source={require('../../images/back.png')}
                />
            </TouchableOpacity>
            <ScrollView nestedScrollEnabled>
                {showFilter ?
                    <View style={{ marginTop: 20 }}>
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            <TouchableOpacity onPress={() => setShowFilter(false)} style={{ marginLeft: '-1.5%' }}>
                                <Icon name="cross" size={35} style={{ margin: 0 }} />
                            </TouchableOpacity>
                            <TextBold style={[styles.HeadingText, { marginTop: 10, textAlign:'left' }]}>{t('travelHome.filter')}</TextBold>
                            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 20 }} />
                        </View>
                        <SearchInput
                            placeholder="Product Name"
                            value={searchValue}
                            onChangeText={(text) => handleSearch(text)}
                        />

                        <View>
                            <FlatList
                                data={ordersListNames}
                                style={Styles.storeNamesList}
                                nestedScrollEnabled
                                renderItem={({ item, index }) =>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <TextMedium style={Styles.storeNameListText}>{item.name}</TextMedium>
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
                    </View>
                    : null}

                <View style={Styles.header}>

                    <TextBold style={[styles.HeadingText, { marginTop: 0 }]}>{t('track.allOrders')}</TextBold>
                    {!showFilter ?
                        <TouchableOpacity onPress={() => setShowFilter(true)} style={styles.filterButton}>
                            <Image source={require('../../images/filter.png')}
                                style={styles.filterImage}
                            />
                            <TextBold style={{  fontSize: 15, color: color.userNameHomeColor }}>{t('travelHome.filter')}</TextBold>
                        </TouchableOpacity>
                        : null}

                </View>

                <View style={{ height: 20 }} />
                <FlatList
                    data={ordersByTravler}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("PendingOrderDetailT", { currentOrder: item.orderAsTraveler[0] })} style={Styles.listView}>
                            <CardOrderUser order={item.orderAsTraveler[0]} />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </View>
    );

}

const Styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
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
        width: '90%',
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