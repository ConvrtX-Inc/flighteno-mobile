import React, { useEffect } from 'react';
import { View, Dimensions, Image, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { color } from '../Utility/Color'
import { useSelector, useDispatch } from 'react-redux';
import ButtonLarge from '../components/ButtonLarge';
import { styles } from '../Utility/Styles'
import moment from 'moment';
import {getTickets} from '../redux/actions/Auth'
import TextBold from '../components/atoms/TextBold';
const windowWidth = Dimensions.get('window').width;

export default function SupportTicket({ navigation }) {
    const { loading, supportTickets, currentUser, token } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()

    useEffect(() => {
        var data = {
            admin_id: currentUser._id
        }
        dispatch(getTickets(data, token))
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={styles.backImg}
                    resizeMode='stretch'
                    source={require('../images/back.png')}
                />
            </TouchableOpacity>
            <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Support</TextBold>
            <View style={[Styles.userDataPortion, { borderBottomWidth: 0, }]}>
                <FlatList
                    data={supportTickets}
                    renderItem={({ item, index }) => (
                        <View key={item._id}>
                            <TouchableOpacity onPress={() => navigation.navigate("SupportReply", { ticket: item })}>
                                <View style={{
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: '#dCdCdC',
                                    width: (windowWidth * 90) / 100,
                                    marginTop: 25,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }} >
                                    <View style={Styles.suportFlaticonView}>
                                        <View style={Styles.supportImageView}>
                                            <Image
                                                style={Styles.suportImg}
                                                resizeMode='stretch'
                                                source={require('../images/logo.png')}
                                            />
                                        </View>
                                    </View>
                                    <View style={Styles.suportFlattxtView}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={[Styles.suportno, { width: '65%' }]}>
                                                {item._id}
                                            </Text>
                                            <Text style={[Styles.suportno, {
                                                color: item.status == "pending" ? '#FFA800' : "#10CF73", marginLeft: 'auto',
                                                marginRight: (windowWidth * 5.3) / 100, textTransform: "capitalize"
                                            }]}>{item.status}</Text>
                                        </View>
                                        <Text numberOfLines={2} style={Styles.suportTxt}>{item.message}</Text>
                                        <Text style={Styles.suportTxtDate}>
                                            {moment(item.created_date.$date.$numberLong, 'x').format("MM/DD/YYYY")}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                    }
                    keyExtractor={(item) => item._id}
                    style={{ marginBottom: 160, }}
                />
            </View>
            <View style={{ position: "absolute", bottom: 20, width: '100%' }}>
                <ButtonLarge
                    title="Send New Ticket"
                    onPress={() => navigation.navigate("Support")}
                    loader={loading}
                />
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    headerimag: {
        marginLeft: '7%',
        marginTop: 25,
        height: 18,
        width: 11,
    },
    getStartedText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    userDataPortion: {
        paddingBottom: (windowWidth * 8) / 100,
        backgroundColor: '#fff',
        borderTopEndRadius: (windowWidth * 7) / 100,
        borderTopLeftRadius: (windowWidth * 7) / 100,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 5,
    },
    suportFlaticonView: {
        // height:  (windowWidth * 30) / 100,
        width: (windowWidth * 24) / 100,
        paddingBottom: (windowWidth * 3) / 100,
        // backgroundColor: 'pink'
    },
    supportImageView: {
        height: (windowWidth * 14) / 100,
        width: (windowWidth * 14) / 100,
        alignSelf: 'center',
        marginTop: (windowWidth * 3) / 100,
        borderRadius: ((windowWidth * 14) / 100) / 2,
        borderWidth: 2,
        borderColor: '#DADADA',
    },
    suportImg: {
        height: (windowWidth * 13) / 100,
        width: (windowWidth * 13) / 100,
        alignSelf: 'center',
        borderRadius: ((windowWidth * 13) / 100) / 2
    },
    suportFlattxtView: {
        width: (windowWidth * 66) / 100,
        paddingBottom: (windowWidth * 3) / 100,
    },
    suportno: {
        marginTop: (windowWidth * 2) / 100,
        fontSize: (windowWidth * 4.3) / 100,
    },
    suportTxt: {
        color: '#8E8E8E',
        marginTop: (windowWidth * 1) / 100,
        width: (windowWidth * 60) / 100,
        textAlign: 'justify'
    },
    suportTxtDate: {
        color: '#8E8E8E',
        marginTop: (windowWidth * 1.5) / 100,
    },
    headerimag: {
        marginLeft: '7%',
        marginTop: 25,
        height: 18,
        width: 11,
    },
    getStartedText: {
        color: color.gtstartedtxtclr,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    SuportReplyCSS: {
        width: (windowWidth * 90) / 100,
        marginBottom: (windowWidth * 5) / 100,
        alignSelf: 'center',
        borderRadius: (windowWidth * 6) / 100,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    replyUperMainBox: {
        flexDirection: 'row',
        width: '100%',
    },
    avatarViewFlatReply: {
        height: (windowWidth * 12) / 100,
        width: (windowWidth * 12) / 100,
        borderRadius: (windowWidth * 15) / 100,
    },
    replyHTxtBox: {
        width: "56%",
        marginLeft: '4%'
    },
    replyHTxt: {
        fontSize: (windowWidth * 4.2) / 100,
    },
    replyStatusBox: {
        width: "28%",
    },
    suportno: {
        marginTop: (windowWidth * 2) / 100,
        fontSize: (windowWidth * 4.3) / 100,
    },
    suportTxt: {
        color: '#8E8E8E',
        marginTop: (windowWidth * 1) / 100,
        width: (windowWidth * 60) / 100,
        textAlign: 'justify'
    },
    replyImg: {
        width: (windowWidth * 42) / 100,
        height: (windowWidth * 16) / 100,
        marginTop: (windowWidth * 3) / 100,
    },
    replyImg: {
        width: (windowWidth * 42) / 100,
        height: (windowWidth * 16) / 100,
        marginTop: (windowWidth * 3) / 100,
    }

})