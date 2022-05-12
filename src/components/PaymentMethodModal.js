import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
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
import { useIsFocused } from '@react-navigation/native';
import { GooglePay } from 'react-native-google-pay';
import { STRIPE_PUBLISHABLE_KEY } from '@env';
import { GooglePayButton, useGooglePay } from '@stripe/stripe-react-native';




export default function PaymentMethodModal({ closeModal, onPaymentSubmit, offerID, navigation, addPaymentMethod }) {
    const { t } = useTranslation();
    const { currentUser, token } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch();
    const { myCards, defaultCard } = useSelector(({ myCardsRed }) => myCardsRed)
    const [selectedCard, selectCard] = useState()
    const [isLoading, setLoading] = useState(false);
    const [selectedPaymentMethod, setPaymentMethod] = useState('credit_card');
    const [googlePayDetails, setGooglePayDetails] = useState();

    const {
        isGooglePaySupported,
        initGooglePay,
        createGooglePayPaymentMethod,
    } = useGooglePay();


    const createPaymentMethodForGooglePay = async () => {
        const { error, paymentMethod } = await createGooglePayPaymentMethod({
            amount: 12,
            currencyCode: 'USD',
        });

        console.log('Error', error, paymentMethod)



        if (error && !error.message.toLocaleLowerCase() == 'Google Pay has been canceled') {
            Alert.alert(error.code, error.message);
            return;
        } else if (paymentMethod) {
            setGooglePayDetails(paymentMethod);
            setPaymentMethod('google_pay')
            
        }
    };

    useEffect(() => {
        initializeGPay();

        getMyCards()

        if (!selectedCard && myCards) {
            selectCard(myCards[0])
        }

    }, [])

    async function getMyCards() {
        dispatch(await getCards(currentUser.stripe_customer_id))

        //get default card
        dispatch(await getCustomerDefaultCard(currentUser.stripe_customer_id, currentUser));

    }

    async function submitPayment() {

        const cardId = selectedCard.id != '' ? selectedCard.id : defaultCard;

        console.log(myCards[0].id)

        // setLoading(true)
        // let url = `${PAYMENT_BASE_URL}/create-payment/?admin_id=${currentUser._id}&offerId=${offerID}&cardId=${selectedCard.id}`
        // const res = await createStripePaymentIntent(url);


        // if (res.paymentIntentId) {

        //     setLoading(false)
        //     onPaymentSubmit(res)


        // } else {

        //     Toast.show({
        //         type: 'error',
        //         text1: 'Error'
        //     })
        //     setLoading(false)

        // }

        let paymentMethodId ='';
        if (selectedPaymentMethod =='credit_card' && cardId) {
            paymentMethodId = cardId;
        }else if(selectedPaymentMethod =='google_pay'){
            paymentMethodId = googlePayDetails.id;
        }else if(selectedPaymentMethod =='apple_pay'){
            // add apple pay payment method id here..
        }

        console.log('payment method',paymentMethodId)
        ///Close this modal and proceed to Respond to offer  on chat traveler
        onPaymentSubmit(paymentMethodId)
    }

    async function initializeGPay() {
        // if (!(await isGooglePaySupported({ testEnv: true }))) {
        //     Alert.alert('Google Pay is not supported.');
        //     return;
        //   }

        const { error } = await initGooglePay({
            testEnv: true,
            merchantName: 'Flighteno',
            countryCode: 'US',
            billingAddressConfig: {
                format: 'FULL',
                isPhoneNumberRequired: true,
                isRequired: false,
            },
            existingPaymentMethodRequired: false,
            isEmailRequired: true,
        });

        if (error) {
            Alert.alert(error.code, error.message);
            return;
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
                        <TextBold style={[commonStyles.fs26, { textAlign: 'left' }]}>{t('common.payments')}</TextBold>
                        <TextBold style={[commonStyles.fs18, commonStyles.marginTop10, { textAlign: 'left' }]}> {t('common.selectPaymentMethod')} </TextBold>

                    </View>

                    <View style={{ height: 22 }}></View>
                    {
                        myCards ? myCards.map(card =>
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
                                        checked={selectedCard ? selectedCard.id == card.id && selectedPaymentMethod == 'credit_card' : defaultCard == card.id && selectedPaymentMethod == 'credit_card'}
                                        onPress={() => {
                                            selectCard(card)
                                            setPaymentMethod('credit_card')
                                        }}
                                    />
                                </View>


                            </View>) : null
                    }

                    <View
                        style={styles.cardItem}

                    >
                        <View style={{ flexDirection: 'row', padding: 16 }}>
                            <View style={{ flex: 2 }}>
                                <TextBold style={[commonStyles.fs18, styles.cardName]}> Google Pay </TextBold>
                                {
                                    googlePayDetails ? <TextRegular style={styles.cardDetails}>{googlePayDetails.billingDetails.email}</TextRegular> : <></>
                                }
                            </View>

                            <CheckBox
                                checkedIcon={<Image source={require('../images/checked_blue.png')}
                                    style={{ height: 25, width: 25, borderRadius: 7 }}
                                />}
                                uncheckedIcon={<Image source={require('../images/unchecked.png')}
                                    style={{ height: 25, width: 25, tintColor: '#EFF1F5' }}
                                />}
                                checked={selectedPaymentMethod == 'google_pay'}
                                onPress={() => {
                                    createPaymentMethodForGooglePay();
                                }}

                            />
                        </View>


                    </View>



                    {
                        myCards && myCards.length > 0 ? <View style={{ marginTop: 20 }}>
                            <ButtonLarge
                                title={t('kyc.submit')}
                                loader={isLoading}
                                onPress={() => submitPayment()}
                            ></ButtonLarge>
                        </View> : <TouchableOpacity style={styles.addCardBtn} onPress={() => {
                            addPaymentMethod()
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <IconEntypo name="plus" size={25} color="#36C5F0" />
                                <TextBold style={{ fontSize: 20, color: '#36C5F0', marginLeft: 14 }}>
                                    {t('common.addPaymentMethod')}
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