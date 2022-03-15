import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import { color } from '../Utility/Color';
import { useSelector, useDispatch } from 'react-redux'
import { NotificationsList } from '../redux/actions/Auth';
import moment from 'moment';
import ScreenLoader from '../components/ScreenLoader';
import { useTranslation } from 'react-i18next';
import TextBold from '../components/atoms/TextBold';
import { SafeAreaView } from 'react-native-safe-area-context';

var windowWidth = Dimensions.get('window').width;

export default function Notifications({ route }) {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { token, currentUser, notificationsData, loading } = useSelector(({ authRed }) => authRed)
    const [showList, setShowList] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        var data = {
            admin_id: currentUser._id
        }
        dispatch(NotificationsList(data, token,
            () => {
                setShowList(true)
            }
        ))
    }, [])

    return (
        <SafeAreaView style={{flex:1}}>
<View style={styles.ScreenCss}>
            <ScreenLoader loader={loading} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={styles.backImg}
                    resizeMode='stretch'
                    source={require('../images/back.png')}
                />
            </TouchableOpacity>
            <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', textAlign:'left' }]}>{t('common.notifications')}</TextBold>
            {showList ?
                <FlatList
                    data={notificationsData}
                    nestedScrollEnabled
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => navigation.navigate("OrderDetailBaseOnOrderId", { orderId: item.order_id })} style={Styles.listView}>
                            <Image source={item.profile_details[0].profile_image ? { uri: item.profile_details[0].profile_image } : require('../images/manProfile.png')}
                                style={{ height: 40, width: 40, borderRadius: 20 }}
                            />
                            <View style={Styles.textView}>
                                <Text style={Styles.titleText}>
                                    {item.message}
                                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{'\n'}{moment(item.created_date.$date.$numberLong, 'x').fromNow()}</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={styles.emptyListText}>{t('common.noNotifications')}!</Text>}
                />
                : null}
        </View>
        </SafeAreaView>
    );

}

const Styles = StyleSheet.create({
    boxView: {
        flexDirection: 'row',
        marginLeft: '5%'
    },
    listView: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 25,
    },
    textView: {
        marginLeft: '5%',
        justifyContent: 'center',
        width: '82%'
    },
    titleText: {
        fontSize: 15,
        color: color.notoficationCOlor,
        fontWeight: '800'
    }
})