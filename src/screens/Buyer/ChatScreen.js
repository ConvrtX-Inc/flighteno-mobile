import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Pressable, Animated, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../Utility/Color';
import { getChatMessages } from '../../redux/actions/Chat';
import moment from 'moment'

var windowWidth = Dimensions.get('window').width;

export default function ChatScreen() {

    const navigation = useNavigation();
    const { loading, token, currentUser, currentProfile } = useSelector(({ authRed }) => authRed)
    const { chatMessages } = useSelector(({ chatRed }) => chatRed)
    const dispatch = useDispatch()

    useFocusEffect(
        React.useCallback(() => {
            var data = {
                admin_id: currentUser._id
            }
            dispatch(getChatMessages(data, token))
            return () => {
            };
        }, [])
    );

    return (
        <View style={styles.ScreenCss}>
            <View>
                <FlatList
                    data={chatMessages}
                    nestedScrollEnabled
                    ListEmptyComponent={<Text style={[styles.emptyListText, {marginTop: -20}]}>There are no messages!</Text>}
                    ListHeaderComponent={<View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                style={styles.backImg}
                                resizeMode='stretch'
                                source={require('../../images/back.png')}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Inbox</Text>
                        <View style={{ marginVertical: 30 }}>
                            <FlatList
                                data={chatMessages}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                                style={{ paddingHorizontal: '5%' }}
                                renderItem={({ item, index }) =>
                                    <View style={{ marginRight: 15, width: 80 }}>
                                        <TouchableOpacity style={{ alignItems: 'center' }}
                                            onPress={() => navigation.navigate("ChatTraveler", { currentStatus: 'message', userDetail: item.reciverImageName[0], chatHistory: item.messages, orderID: item.order_id, offerID: item.offer_id.length > 0 ? item.offer_id[0].offer_id : '', offerStatus: item.offer_id.length > 0 ? item.offer_id[0].status : '' })}
                                        >
                                            <Image source={item.reciverImageName[0].profile_image == "" ? require('../../images/manProfile.png') : { uri: item.reciverImageName[0].profile_image }}
                                                style={styles.profileImage}
                                                resizeMode="cover"
                                            />
                                            <Text numberOfLines={1} style={{ textAlign: 'left' }}>{item.reciverImageName[0].full_name.split(" ")[0]}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item._id}
                            />
                        </View>
                    </View>}
                    renderItem={({ item, index }) =>
                        <View>
                            {index == 0 ?
                                <Text style={[styles.HeadingText, { marginLeft: '5%' }]}>Messages</Text>
                                : null}
                            <TouchableOpacity onPress={() => navigation.navigate("ChatTraveler", { currentStatus: 'message', userDetail: item.reciverImageName[0], receiverId: item.reciver_id, chatHistory: item.messages, orderID: item.order_id, offerID: item.offer_id.length > 0 ? item.offer_id[0].offer_id : '', offerStatus: item.offer_id.length > 0 ? item.offer_id[0].status : '' })}
                                style={[Styles.itemView, {}]}>
                                <View>
                                    <Image source={item.reciverImageName[0].profile_image == "" ? require('../../images/manProfile.png') : { uri: item.reciverImageName[0].profile_image }}
                                        style={styles.profileImage}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={{ width: '55%', marginLeft: '3%', }}>
                                    <Text numberOfLines={1} style={[Styles.addText, { textAlign: 'left' }]}>{item.reciverImageName[0].full_name.split(" ")[0] + (item.order_name.length > 0 ? ', ' + item.order_name[0].order_name : "")}</Text>
                                    <Text numberOfLines={1} style={[Styles.dateText, {}]}>{item.messages[0]?.currentMessage.text}</Text>
                                </View>
                                <Text style={[Styles.dateText, { marginLeft: 'auto', width: '20%' }]}>{moment(item.messages[0]?.currentMessage.createdAt).format("DD MMM")}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    );

}

const Styles = StyleSheet.create({
    inboxTopName: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5
    },
    addText: { fontSize: 16, textAlign: 'center', marginTop: 5, fontWeight: 'bold' },
    nameText: {
        fontSize: 15,
        color: 'gray',
    },
    itemView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        height: 75,
        marginTop: 20,
        alignItems: 'center',
    },
    addFriendImage: { height: 50, width: 50, borderRadius: 50 / 2 },
    dateText: { fontSize: 14, color: color.grayText, }
})