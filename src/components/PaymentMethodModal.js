import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import TextBold from './atoms/TextBold';
import { commonStyles } from '../Utility/CommonStyles';
import Constants from '../Utility/Constants';
import ButtonLarge from './ButtonLarge';
import { CheckBox } from 'react-native-elements';
import { PAYMENT_BASE_URL } from '../BASE_URL';
import { createStripePaymentIntent } from '../services/Stripe/Payment';
import Toast from 'react-native-toast-message';
import { getCards, getCustomerDefaultCard } from '../services/Stripe/CardManagement'
import TextRegular from './atoms/TextRegular';

export default function PaymentMethodModal({ closeModal, onPaymentSubmit, offerID, navigation ,addPaymentMethod }) {
    const { t } = useTranslation();
    const { currentUser, token } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch();
    const { myCards, defaultCard } = useSelector(({ myCardsRed }) => myCardsRed)
    const [selectedCard, selectCard] = useState()
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getMyCards()
    }, [])

    async function getMyCards() {
        dispatch(await getCards(currentUser.customer_id))

        //get default card
        dispatch(await getCustomerDefaultCard(currentUser.customer_id, currentUser));

    }

    async function submitPayment() {
        if(!selectedCard){
            selectCard(myCards[0])
        }
        console.log("selectedCArd",selectedCard)
        const cardId = selectedCard.id !='' ? selectedCard.id : defaultCard;
        setLoading(true)
        let url = `${PAYMENT_BASE_URL}/create-payment/?admin_id=${currentUser._id}&offerId=${offerID}&cardId=${selectedCard.id}`
        const res = await createStripePaymentIntent(url);
        console.log("res", res)
        if (res.paymentIntentId) {

            setLoading(false)
            onPaymentSubmit(res)


        } else {

            Toast.show({
                type: 'error',
                text1: 'Error'
            })
            setLoading(false)

        }

    }


    return (
        <ScrollView>
            <View style={[styles.container, commonStyles.marginTop10]}>
                <TouchableOpacity style={styles.backButton} onPress={() => closeModal()}>
                    <IconEntypo name="chevron-left" size={34} color="#000" />
                </TouchableOpacity>
                <>
                    <View style={[commonStyles.marginTop30]}>
                        <TextBold style={[commonStyles.fs26]}> Payments </TextBold>
                        <TextBold style={[commonStyles.fs18, commonStyles.marginTop10]}> Select Payment Method </TextBold>

                    </View>

                    <View style={{ height: 22 }}></View>
                    {
                        myCards?.length > 0 ? myCards?.map(card =>
                            <View
                                style={styles.cardItem}
                                key={card.id}
                            >
                                <View style={{ flexDirection: 'row', padding: 16 }}>
                                    <View style={{ flex: 2 }}>
                                        <TextBold style={[commonStyles.fs18, styles.cardName]}> {card.name} </TextBold>
                                        <TextRegular style={styles.cardDetails}>**** **** **** {card.last4} {card.brand}</TextRegular>

                                    </View>

                                    <CheckBox
                                        checkedIcon={<Image source={require('../images/checked_blue.png')}
                                            style={{ height: 25, width: 25, borderRadius: 7 }}
                                        />}
                                        uncheckedIcon={<Image source={require('../images/unchecked.png')}
                                            style={{ height: 25, width: 25, tintColor: '#EFF1F5' }}
                                        />}
                                        checked={selectedCard ? selectedCard.id == card.id : defaultCard == card.id}
                                        onPress={() => selectCard(card)}
                                    />
                                </View>


                            </View>) : null
                    }
                    {
                        myCards.length > 0 ? <View style={{ marginTop: 20 }}>
                            <ButtonLarge
                                title="Submit"
                                loader={isLoading}
                                onPress={() => submitPayment()}
                            ></ButtonLarge>
                        </View> : <TouchableOpacity style={styles.addCardBtn} onPress={() => {
                           addPaymentMethod()
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <IconEntypo name="plus" size={25} color="#36C5F0" />
                                <TextBold style={{ fontSize: 20, color: '#36C5F0', marginLeft: 14 }}>
                                    Add Payment Method
                                </TextBold>
                            </View>
                        </TouchableOpacity>
                    }
                </>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: Constants.appLayout.screenContainerMarginHorizontal,
        backgroundColor: '#FFFFFF',
        paddingBottom: 20
    },
    backButton: {
        marginStart: -10,
        width: 30,
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
    addCardBtn: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#A7A7A7',
        padding: 14,
        borderRadius: 16
    }
});