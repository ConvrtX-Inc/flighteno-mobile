import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Utility/Color';
import { styles } from '../../Utility/Styles';
import { useSelector, useDispatch } from 'react-redux'
import { AirbnbRating } from 'react-native-elements';
import ReviewList from '../../components/ReviewList'
import { getOneToOneChat } from '../../redux/actions/Chat';
var windowWidth = Dimensions.get('window').width;

export default function TravelerProfile({ route }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { currentUser, token } = useSelector(({ authRed }) => authRed)
    const [loading, setLoading] = useState(false)
    const { traveler, orderId } = route.params

    const openChat = () => {
        setLoading(true)
        var obj = {
            buy_admin_id: currentUser._id,
            traveler_admin_id: traveler._id,
            order_id: orderId
        }
        dispatch(getOneToOneChat(obj, token,
            (currentChat) => {
                navigation.navigate("ChatTraveler", {currentStatus: 'message', userDetail: currentChat.messagesData[0].reciverImageName[0], chatHistory: currentChat.messagesData[0].messages, orderID: orderId, offerID: currentChat.messagesData[0].offer_id.length > 0 ? currentChat.messagesData[0].offer_id[0].offer_id : '', offerStatus: currentChat.messagesData[0].offer_id.length > 0 ? currentChat.messagesData[0].offer_id[0].status : ''})
            },
            () => {
                setLoading(false)
            }
        ))
    }
    return (
        <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
            <ScrollView nestedScrollEnabled={true}>
                <View style={Styles.headerView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.backImg, { marginTop: 0 }]}
                            resizeMode='stretch'
                            source={require('../../images/back.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 50, alignItems: 'center', justifyContent: 'center'}} onPress={openChat} disabled={loading ? true : false}>
                        {!loading ?
                            <Image
                                source={require('../../images/message.png')}
                                style={{ height: 40, width: 50, }}
                                resizeMode="contain"
                            />
                            :
                            <ActivityIndicator size="small" color={color.blueColor} style={{ height: 40 }} />
                        }

                    </TouchableOpacity>
                </View>
                <Text style={Styles.title}>Traveler’s Profile</Text>
                <Image
                    source={traveler.profile_image ? { uri: traveler.profile_image } : require('../../images/manProfile.png')}
                    style={[styles.profileImage, { alignSelf: 'center', marginTop: 25 }]}
                />
                <View style={{ alignItems: 'center' }}>
                    <Text style={Styles.userName}>{traveler.full_name}</Text>
                    {traveler.traveler_ratting.length != 0 ?
                        <View>
                            {traveler.traveler_ratting[0].avg_rating >= 4.5 ?
                                <Text style={Styles.ratingTitle}>High Rated Traveler</Text>
                                : null}
                            <View style={{ marginTop: 10, marginLeft: 0 }}>
                                <AirbnbRating
                                    defaultRating={traveler.traveler_ratting[0].avg_rating}
                                    type='star'
                                    ratingCount={5}
                                    size={15}
                                    showRating={false}
                                    isDisabled={true}
                                />
                            </View>
                            <Text style={[styles.ratingText, { textAlign: 'center', marginTop: 10, marginLeft: 0, marginRight: 0 }]}>{traveler.traveler_ratting[0].avg_rating} Out of 5.0</Text>
                            <Text style={Styles.ratingTitle}>{traveler.traveler_ratting[0].total_reviews} Review(s)</Text>
                        </View>
                        : null}
                </View>
                {traveler.traveler_review.map((item, index) => (
                    <ReviewList review={item} />
                ))}
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 10
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 10
    },
    userView: {
        flexDirection: 'row',
    },
    headerView: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: (windowWidth * 8) / 100
    },
    ratingTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: color.lightBlue,
        textAlign: 'center',
        marginTop: 5
    },
    listView: {
        marginHorizontal: '7.5%',
        marginTop: 20
    },
    ratingTime: {
        fontSize: 14,
        color: color.reviewTime,
        marginTop: -3,
        flexWrap: 'wrap'
    },
    reviewText: {
        fontSize: 15,
        color: color.reviewText,
        width: '95%', alignSelf: 'center',
        marginTop: 10,
        lineHeight: 22
    },
    photoView: {
        flexDirection: 'row',
        marginTop: 5
    },
    reviewImage: {
        height: 60,
        width: 100,
        borderRadius: 10,
        marginLeft: '2%'
    }
})