import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Platform, Modal, Linking, Keyboard, ActivityIndicator, BackHandler } from 'react-native';
import { color } from '../../Utility/Color';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GiftedChat, InputToolbar, Send, Bubble, Time, Avatar, MessageImage } from 'react-native-gifted-chat'
import { styles } from '../../Utility/Styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps'
import messaging from '@react-native-firebase/messaging';
import OfferModel from '../../components/OfferModel';
import moment from 'moment'
import { generateUID } from '../../Utility/Utils';
import { RNS3 } from 'react-native-aws3';
import ImageModal from 'react-native-image-modal';
import { useFocusEffect } from '@react-navigation/native';
var io = require('socket.io-client');
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { RespondToOffer } from '../../redux/actions/Payment';
import ScreenLoader from '../../components/ScreenLoader'
import { IS_LOADING } from '../../redux/constants';

const LocationView = ({ location }) => {
    const openMaps = () => {
        const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
            android: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
        });
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => {
                console.error('An error occurred', err);
            });
    };
    return (
        <TouchableOpacity
            onPress={openMaps}
            style={{ backgroundColor: 'gray', width: 120, height: 120, borderRadius: 20, overflow: 'hidden', borderBottomLeftRadius: 0 }}>
            <MapView
                style={{ height: undefined, width: undefined, borderRadius: 20, flex: 1, borderBottomLeftRadius: 0 }}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                annotations={[
                    {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                ]}

                scrollEnabled={false}
                zoomEnabled={false}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                />
            </MapView>
        </TouchableOpacity>
    );
};

var chatId = ""
var socket = null;

var checkCondition = false

export default function Chattravelereler({ route }) {
    const { loading, currentUser, currentProfile, token } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation()
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [chatModal, setChatModal] = useState(false)
    const [offerStatus, setOfferStatus] = useState("")
    const [currentPerson, setCurrentPerson] = useState(currentProfile == "buyer" ? "traveler's" : "buyer's")
    const offerID = route.params.offerID
    const dispatch = useDispatch()

    //Payment
    var showBottomButton = route.params.offerStatus ? route.params.offerStatus : ""
    let stripePK = 'pk_test_51Jbh0xES5y6t2EWhnY11t3iXBtBVg6s2WAGf54mhZx4qifm1k9XuIHm3LQs9jXioST6pDhlky2C65Mw06ptjmfAy006FWtezGr'
    let stripeSK = 'sk_test_51Jbh0xES5y6t2EWhBXW6uiNciYBvFwBa1P6j0kVMODnPdljX5FSVgdFZIVBLNuTo93dKf7G7fexdWgfI6FlIUs8n00f4ZwlI63'
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const fetchPaymentSheetParams = async () => {
        let url = `http://3.124.117.144:3000/create-payment/?admin_id=${currentUser._id}&offerId=${offerID}`
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            },
        });
        const res = await response.json();
        let data = {
            customer: res.customer,
            ephemeralKey: res.ephemeralKey,
            paymentIntent: res.paymentIntent
        }

        return data;
    };

    const initializePaymentSheet = async (status) => {
        dispatch({ type: IS_LOADING, isloading: true })
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            merchantDisplayName: "Flighteno"
        });
        dispatch({ type: IS_LOADING, isloading: false })
        openPaymentSheet(status)
    };

    const offerConfirmation = (status) => {
        setModal(false)
        if (status == 'accept') {
            initializePaymentSheet(status)
        }
        else {
            let data = {
                offer_id: offerID,
                status: status
            }
            dispatch(RespondToOffer(data, token,
                () => {
                    var mess = {
                        _id: Math.floor(Math.random() * 1000000),
                        text: "This offer has been rejected!",
                        createdAt: new Date(),
                        user: {
                            _id: currentUser._id,
                            name: currentUser.full_name,
                            avatar: currentUser.profile_image ? currentUser.profile_image : require("../../images/manProfile.png"),
                        },
                    };
                    setMessages(previousMessages => GiftedChat.append(previousMessages, mess))
                    socket.emit('sendMessage', { chat_id: route.params.currentStatus == "offer" ? chatId : route.params.currentStatus == "edit" ? route.params.chatID : route.params.chatHistory[0].chat_id, admin_id: currentUser._id, text: mess, sender_status: currentProfile, status: "message" });
                },
                (order) => {
                    navigation.replace('OrderDetails', { order: order, status: "chat" })
                },
            )
            )
        }
    }

    const openPaymentSheet = async (status) => {
        const { error } = await presentPaymentSheet({ stripeSK });
        if (error) {
            console.log(`Error code: ${error.code}`, error.message);
        } else {

            let data = {
                offer_id: offerID,
                status: status
            }
            dispatch(RespondToOffer(data, token,
                () => {
                    socket = io.connect('http://3.124.117.144:3000/');
                    socket.emit('addUser', currentUser._id);
                    socket.on("getUsers", async msg => {
                        console.log("GET USERS ACEPTED", await msg)
                    })
                    var mess = {
                        _id: Math.floor(Math.random() * 1000000),
                        text: "This offer has been accepted!",
                        createdAt: new Date(),
                        user: {
                            _id: currentUser._id,
                            name: currentUser.full_name,
                            avatar: currentUser.profile_image ? currentUser.profile_image : require("../../images/manProfile.png"),
                        },
                    };
                    setMessages(previousMessages => GiftedChat.append(previousMessages, mess))
                    socket.emit('sendMessage', { chat_id: route.params.currentStatus == "offer" ? chatId : route.params.currentStatus == "edit" ? route.params.chatID : route.params.chatHistory[0].chat_id, admin_id: currentUser._id, text: mess, sender_status: currentProfile, status: "message" });
                },
                (order) => {
                    navigation.replace('OrderDetails', { order: order })
                },

            )
            )
        }
    };

    //Payment end

    const order = route.params
    const currentChatUser = {
        _id: currentUser._id,
        name: currentUser.full_name,
        avatar: currentUser.profile_image ? currentUser.profile_image : require("../../images/manProfile.png"),
    }

    function getOfferBodyA(order) {
        return `Prefered Delivery Date:\n\n${order.offer.deliveryDate} \n\nNotes:\n\n${order.offer.notes.length > 0 ? order.offer.notes : 'No Notes'}`
    }

    function getOfferBodyB(order) {
        return addSpaces('Order No: ', false) + order.orderDetail._id + '\n\n' +
            addSpaces('Order Price:') + order.orderDetail.product_price + '\n' +
            addSpaces('Estimated Delivery Fee:') + order.offer.offerPrice + '\n' +
            addSpaces('VIP Service Fee:') + order.orderDetail.vip_service_fee + '\n' +
            addSpaces('Flighteno cost:') + order.orderDetail.flighteno_cost + '\n' +
            addSpaces('Tax:') + order.orderDetail.tax + '\n\n' +
            addSpaces('Total:') + (parseInt(order.orderDetail.product_price) + parseInt(order.offer.offerPrice) + parseInt(route.params.orderDetail.vip_service_fee) + parseInt(route.params.orderDetail.flighteno_cost) + parseInt(route.params.orderDetail.tax))
    }

    function addSpaces(text, showDollar=true) {
        // return text.padEnd(1, ' ') + addDollar ? '$' : '';
        return showDollar ? `${text} $` : text;
    }

    useEffect(() => {
        socket = io.connect('http://3.124.117.144:3000/');
        socket.emit('addUser', currentUser._id);
        socket.on("getUsers", async msg => {
            console.log("GET USERS", await msg)
        })
        if (route.params.currentStatus == "offer") {
            socket.emit('sendOffer', { orderId: route.params.orderDetail._id, senderId: currentUser._id, receiverId: route.params.orderDetail.admin_id });
            socket.on("createChat", async msg => {
                console.log("CHAT ID UPDATED", await msg)
                chatId = msg
                var message1 = {
                    _id: Math.floor(Math.random() * 1000000),
                    text: getOfferBodyA(route.params),
                    createdAt: new Date(),
                    user: currentChatUser,
                }
                var message2 = {
                    _id: Math.floor(Math.random() * 1000000),
                    text: getOfferBodyB(route.params),
                    createdAt: new Date(),
                    user: currentChatUser,
                }
                messages.push(message1)
                messages.push(message2)
                setMessages([...messages])
                socket.emit('sendMessage', { chat_id: msg, admin_id: currentUser._id, text: message1, sender_status: currentProfile, status: "offer", order_id: route.params.orderDetail._id });
                socket.emit('sendMessage', { chat_id: msg, admin_id: currentUser._id, text: message2, sender_status: currentProfile, status: 'offer', order_id: route.params.orderDetail._id });
            });

            // Fix for https://team-1634092271346.atlassian.net/browse/FLIGHT-22
            var message1 = {
                _id: Math.floor(Math.random() * 1000000),
                text: getOfferBodyA(route.params),
                createdAt: new Date(),
                user: currentChatUser,
            }
            var message2 = {
                _id: Math.floor(Math.random() * 1000000),
                text: getOfferBodyB(route.params),
                createdAt: new Date(),
                user: currentChatUser,
            }
            messages.push(message1)
            messages.push(message2)
            setMessages([...messages])
        }
        if (route.params.currentStatus == "message") {
            route.params.chatHistory.forEach(element => {
                if (typeof (element.currentMessage.user.avatar) == "number") {
                    element.currentMessage.user.avatar = require("../../images/manProfile.png")
                    messages.push(element.currentMessage)
                    setMessages([...messages])
                }
                else {
                    messages.push(element.currentMessage)
                    setMessages([...messages])
                }
            });
        }

        socket.on("getMessage", async msg => {
            console.log("GET MESSAGE UPDATED", await msg)
            var mess = {
                _id: msg.message._id,
                text: msg.message.text,
                image: msg.message.image ? msg.message.image : "",
                createdAt: msg.message.createdAt,
                user: msg.message.user,
            };

            setMessages(previousMessages => GiftedChat.append(previousMessages, mess))
        })

    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            socket.disconnect()
        });

        return unsubscribe;
    }, [navigation]);

    if (route.params.currentStatus == "edit" && checkCondition == false) {
        socket = io.connect('http://3.124.117.144:3000/');
        socket.emit('addUser', currentUser._id);
        socket.on("getUsers", async msg => {
            console.log("GET USERS INSIDE EDIT", await msg)
        })
        var message1 = {
            _id: Math.floor(Math.random() * 1000000),
            text: getOfferBodyB(route.params),
            createdAt: new Date(),
            user: currentChatUser
        }
        var message2 = {
            _id: Math.floor(Math.random() * 1000000),
            text: getOfferBodyA(route.params),
            createdAt: new Date(),
            user: currentChatUser
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, message1))
        setMessages(previousMessages => GiftedChat.append(previousMessages, message2))
        socket.emit('sendMessage', { chat_id: route.params.chatID, admin_id: currentUser._id, text: message1, sender_status: currentProfile, status: 'offer', order_id: route.params.orderDetail._id });
        socket.emit('sendMessage', { chat_id: route.params.chatID, admin_id: currentUser._id, text: message2, sender_status: currentProfile, status: 'offer', order_id: route.params.orderDetail._id });
        checkCondition = true
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const backAction1 = () => {
        if (route.params.currentStatus == "offer") {
            navigation.navigate("BottomTab", { screen: "Home", params: { screen: "MyTripTab" } })
            return true
        }
        else {
            navigation.goBack()
            return true
        }
    };

    useEffect(() => {
        const backAction = () => {
            if (route.params.currentStatus == "offer") {
                navigation.navigate("BottomTab", { screen: "Home", params: { screen: "MyTripTab" } })
                return true
            }
            else {
                navigation.goBack()
                return true
            }
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onSend = useCallback((messages = []) => {
        var mess = {
            _id: messages[0]._id,
            text: messages[0].text,
            createdAt: new Date(),
            user: {
                _id: currentUser._id,
                name: currentUser.full_name,
                avatar: currentUser.profile_image ? currentUser.profile_image : require("../../images/manProfile.png"),
            },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, mess))
        socket.emit('sendMessage', { chat_id: route.params.currentStatus == "offer" ? chatId : route.params.currentStatus == "edit" ? route.params.chatID : route.params.chatHistory[0].chat_id, admin_id: currentUser._id, text: mess, sender_status: currentProfile, status: "message" });

    }, [])

    const user = {
        _id: currentUser._id,
        name: currentUser.full_name,
        avatar: currentUser.profile_image ? currentUser.profile_image : require("../../images/manProfile.png"),
    }

    const customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "transparent",
                    borderTopColor: "#E8E8E8",
                    borderTopWidth: 0,
                    // padding: 8,
                    // flexDirection: 'row',
                    margin: 10,
                    alignItems: 'center',
                }}
                primaryStyle={{
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            />
        );
    };

    const renderMessageImage = props => {
        return (
            <View
                style={{
                    borderRadius: 15,
                    padding: 2,
                }}
            >
                <ImageModal
                    resizeMode="contain"
                    style={{
                        width: 200,
                        height: 200,
                        padding: 6,
                        borderRadius: 15,
                        resizeMode: "cover",
                    }}
                    source={{ uri: props.currentMessage.image }}
                />
            </View>
        );
    }

    const micBtn = (sendProps) => {
        return (
            <View flexDirection='row'>
                <TouchableOpacity onPress={() => chooseFile()} style={Styles.myStyle} activeOpacity={0.5}>
                    <Image
                        source={require('../../images/attatch.png')}
                        style={Styles.MicIconStyle}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    const micBtnPressed = (messages = []) => {
        console.log("Current Inputbox content: ", messages)
    }

    const renderBubble = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return <LocationView location={currentMessage.location} />;
        }
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: "white"
                    },
                    left: {
                        color: "white"
                    }
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#36C5F0',
                        borderBottomRightRadius: 10,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 0,
                    },
                    right: {
                        backgroundColor: color.travelerelerButtonColor,
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        marginBottom: 5
                    }
                }}
            />
        )
    }

    const renderTime = (props) => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: 'white',
                    },
                    right: {
                        color: 'white',
                    },
                }}
            />
        );
    };

    const chooseFile = () => {
        let options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 500,
            maxHeight: 500
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
                setChatModal(true)
                const file = {
                    uri: response.assets[0].uri,
                    name: generateUID() + ".jpg",
                    type: 'image/jpeg'
                }
                const options = {
                    keyPrefix: "flighteno/chat/",
                    bucket: "memee-bucket",
                    region: "eu-central-1",
                    accessKey: "AKIA2YJH3TLHCODGDKFV",
                    secretKey: "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",
                    successActionStatus: 201
                }
                RNS3.put(file, options).then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    setChatModal(false)

                    var valueToPush = {}
                    valueToPush["_id"] = Math.floor(Math.random() * 100000)
                    valueToPush["text"] = ""
                    valueToPush["createdAt"] = new Date()
                    valueToPush["user"] = {
                        _id: currentUser._id,
                        name: currentUser.full_name,
                        avatar: currentUser.profile_image ? currentUser.profile_image : require("../../images/manProfile.png")
                    }
                    valueToPush["image"] = response.body.postResponse.location
                    setMessages(previousMessages => GiftedChat.append(previousMessages, valueToPush))
                    setChatModal(false)

                    socket.emit('sendMessage', { chat_id: route.params.currentStatus == "offer" ? chatId : route.params.chatHistory[0].chat_id, admin_id: currentUser._id, text: valueToPush, sender_status: currentProfile, status: 'message' });
                });
            }
        });
    };

    return (
        <StripeProvider
            publishableKey={stripePK}>
            {currentUser ?
                <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
                    <ScreenLoader loader={loading} />
                    <Modal animationType={"slide"} transparent={true}
                        visible={chatModal}
                    >
                        <View style={Styles.modelView}>
                            <View style={Styles.modalInnerView}>
                                <ActivityIndicator color={color.blueColor} size="large" />
                                <Text style={[Styles.userName, { marginLeft: 0, marginTop: 0 }]}>Uploading...</Text>
                            </View>
                        </View>
                    </Modal>
                    <OfferModel model={modal}
                        closeModal={() => setModal(false)}
                        onPressYes={() => offerConfirmation(offerStatus)}
                        onPressNo={() => setModal(false)}
                        title={`Would you like to ${offerStatus}${'\n'}the ${currentPerson} offer?`}
                    />  

                    <TouchableOpacity onPress={() => backAction1()}>
                        <Image
                            style={styles.backImg}
                            resizeMode='stretch'
                            source={require('../../images/back.png')}
                        />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '5%', marginTop: 20, marginBottom: 10 }}>
                        {route.params.currentStatus == "offer" || route.params.currentStatus == "edit" ?
                            <Image source={route.params.orderDetail.profile_data[0].profile_image == "" ? require("../../images/manProfile.png") : { uri: route.params.orderDetail.profile_data[0].profile_image }}
                                style={Styles.userImage}
                            />
                            :
                            <Image source={route.params.userDetail.profile_image == "" ? require("../../images/manProfile.png") : { uri: route.params.userDetail.profile_image }}
                                style={Styles.userImage}
                            />
                        }
                        <Text style={Styles.userName}>{route.params.currentStatus == "offer" || route.params.currentStatus == "edit" ? route.params.orderDetail.profile_data[0].full_name : route.params.userDetail.full_name}</Text>

                    </View>
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={user}
                        // scrollToBottom
                        
                        showUserAvatar
                        // renderAvatar={props => customtAvatar(props)}
                        onPressAvatar={() => console.log(user)}
                        renderInputToolbar={props => customtInputToolbar(props)}
                        // renderMessageImage={props => renderMessageImage(props)}
                        renderBubble={props => renderBubble(props)}
                        renderTime={props => renderTime(props)}
                        renderSend={(props) => (
                            <View style={{ marginLeft: '-18%' }}>
                                <Send {...props}>
                                    <Image source={require('../../images/sendM.png')}
                                        style={{ height: 25, width: 25 }} />
                                </Send>
                            </View>
                        )}
                        alwaysShowSend
                        textInputStyle={{
                            backgroundColor: '#F4F4F4',
                            borderRadius: 20,
                            paddingLeft: 20,
                            paddingRight: 30,
                        }}
                        renderActions={messages => micBtn(messages)}
                    />
                    {!isKeyboardVisible ?
                        <View style={[Styles.bottomView, { height: showBottomButton == "" || showBottomButton == "new" ? 60 : 0 }]}>
                            {currentProfile == "traveler" && (showBottomButton == "" || showBottomButton == "new") ?
                                <TouchableOpacity onPress={() => navigation.navigate("EditOffer", { ID: route.params.currentStatus == 'offer' ? route.params.orderDetail._id : route.params.orderID, CHATID: route.params.currentStatus == "offer" ? chatId : route.params.chatHistory[0].chat_id })} style={Styles.bottomButton}>
                                    <Text style={Styles.buttonText}>Edit Offer</Text>
                                </TouchableOpacity>
                                : null}

                            {currentProfile == "buyer" && (showBottomButton == "" || showBottomButton == "new") ?
                                <TouchableOpacity onPress={() => { setModal(true), setOfferStatus("accept") }} style={Styles.bottomButton}>
                                    <Text style={Styles.buttonText}>Accept</Text>
                                </TouchableOpacity>
                                : null}
                            {currentProfile == "buyer" && (showBottomButton == "" || showBottomButton == "new") ?
                                <TouchableOpacity onPress={() => { setModal(true), setOfferStatus("reject") }} style={Styles.bottomButton}>
                                    <Text style={Styles.buttonText}>Reject Deal</Text>
                                </TouchableOpacity>
                                : null}
                        </View>
                        : null}
                </View>
                : null}
        </StripeProvider>
    );
}

const Styles = StyleSheet.create({
    bottomView: {
        bottom: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center'
    },
    bottomButton: {
        height: 30,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.messageInput,
        borderRadius: 20
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    myStyle: {
        alignItems: 'center',
        backgroundColor: "#F4F4F4",
        borderColor: '#fff',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        marginLeft: '-5%',
        marginRight: '5%',
        marginBottom: 5
    },
    MicIconStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '5%'
    },
    modelView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalInnerView: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: color.backgroundColor,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
})