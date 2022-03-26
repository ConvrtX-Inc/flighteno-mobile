import React, { useState } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

// Custom Imports
import TextBold from './atoms/TextBold';
import TextRegular from './atoms/TextMedium';
import { commonStyles } from '../Utility/CommonStyles';
import ButtonPlain from './ButtonPlain';
import ButtonLarge from './ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import { removeCard, setDefaultCard } from '../services/Stripe/CardManagement';
import { REMOVE_CARD, SET_DEFAULT_CARD } from '../redux/constants';
import Toast from 'react-native-toast-message';

export default function PaymentCardItem({ card, defaultCard }) {
    const dispatch = useDispatch();
    const { currentUser, token } = useSelector(({ authRed }) => authRed)

    const [isModalVisible, setModalVisible] = useState(false);
    async function setDefault() {
        console.log("CARD ID", card.id)
        const res = await setDefaultCard(card.id, currentUser.customer_id);

        if (res.default_source) {
            dispatch({ type: SET_DEFAULT_CARD, data: res.default_source })

        } else {
            Toast.show({
                type: 'error',
                text1: res.error.message
            })
        }
    }

    async function remove() {
        const res = await removeCard(card.id, currentUser.customer_id)
        if (res.id) {
            dispatch({ type: REMOVE_CARD, data: res.id })
        } else {
            Toast.show({
                type: 'error',
                text1: res.error.message
            })
        }
    }


    function getCardLogo(brand) {
        switch (brand.toLowerCase()) {
            case "visa":
                return require("../assets/images/card_logos/visa.png")
            case "mastercard":
                return require("../assets/images/card_logos/mastercard.png")
            case "discover":
                return require("../assets/images/card_logos/discover.png")
            case "jcb":
                return require("../assets/images/card_logos/jcb.png")
            default:
                return require("../assets/images/card_logos/visa.png")
        }
    }

    return (
        <View
            style={styles.cardItem}
            key={card.id}
        >
            <View style={{ flexDirection: 'row', padding: 16 }}>
                <View style={{ flex: 2 }}>
                    <TextBold style={[commonStyles.fs18, styles.cardName]}> {card.name} </TextBold>
                    <TextRegular style={styles.cardDetails}>**** **** {card.last4} {card.brand}</TextRegular>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <View style={{ width: 110, }}>
                            <ButtonLarge
                                title="Edit"
                                onPress={() => { }}

                                height={45}
                            />
                        </View> */}

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => { setModalVisible(true) }}
                            style={styles.buttonStyle}
                        >
                            <Image source={require('../assets/images/pngs/delete.png')} style={{ height: 20, width: 20 }} />

                        </TouchableOpacity>

                    </View>
                </View>
                <View>
                    {
                        card.id == defaultCard ?
                            <ButtonPlain
                                title="Default"
                                onPress={() => { }}
                                color='rgba(54, 197, 240, 0.2)'
                                textColor='#36C5F0'

                            /> : <ButtonPlain
                                title="Set Default"
                                onPress={() => {
                                    setDefault()
                                }}
                                borderColor='#36C5F0'
                                textColor='#25A9D1'
                            />
                    }

                </View>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextBold style={[commonStyles.fs18,{marginBottom: 10}]}>Remove Card</TextBold>
                        <TextRegular style={commonStyles.fs12}> Are you sure you want to remove card?</TextRegular>
                        <View style={{ flexDirection: 'row', marginTop: 12, marginBottom: 24 }}>
                            <View style={{ flex: 1 }}>
                                <TextRegular style={styles.modalCardDetails}>Ending in {card.last4}</TextRegular>
                                <TextRegular style={styles.modalCardDetails}> {card.metadata.expiry}</TextRegular>
                            </View>
                           
                            <Image source={getCardLogo(card.brand)}  style={{height: 40,width: 60,  }} ></Image>
                        </View>

                        <ButtonLarge
                            onPress={() => {
                                remove()
                            }}
                            title="Confirm"
                        />

                        <ButtonPlain
                            title="Cancel"
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            borderColor='#fff'
                            textColor='#000000'
                        />

                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: 278,
        height: 179,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    }, buttonStyle: {
        backgroundColor: '#E51F4A',
        height: 45,
        width: 45,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderRadius: 100,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: '#000000',
    },
    cardItem: {
        marginBottom: 20,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        borderRadius: 16
    },
    cardDetails: {
        color: 'rgba(67, 67, 67, 0.6)',
        marginLeft: 6,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 14
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "75%",
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 13
    },
    modalCardDetails: {
        color: 'rgba(67, 67, 67, 0.6)',
        marginLeft: 6,
        marginBottom: 6,
        fontSize: 12
    }

});