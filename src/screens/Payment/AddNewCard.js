// Core packages
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';


// Packages
import IconEntypo from 'react-native-vector-icons/Entypo';
import { CreditCardInput, LiteCreditCardInput } from "../../components/react-native-credit-card-input-plus";
import { useDispatch, useSelector } from 'react-redux';

// Custom Imports
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import TextRegular from '../../components/atoms/TextMedium';
import { commonStyles } from '../../Utility/CommonStyles';
import Constants from '../../Utility/Constants';
import ButtonLarge from '../../components/ButtonLarge';
import { ADD_CARD, IS_LOADING } from '../../redux/constants';

import { createCard } from '../../services/Stripe/CardManagement'
import Toast from 'react-native-toast-message';

export default function PaymentAddNewCard({ navigation }) {
    const { t } = useTranslation();
    const { currentUser, token } = useSelector(({ authRed }) => authRed)

    const [cardDetails, setCardDetails] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function _onChange(form) {
        console.log(currentUser.customer_id);
        setCardDetails(form);
    }

    async function addCard() {
        setLoading(true)
        const data = await createCard(cardDetails, 'cus_LG42PyqfYTpuh0');
        if (data.id) {
            dispatch({ type: ADD_CARD, data: data })
            setLoading(false);
            navigation.pop();
        } else {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: data.error.message
            })
        }
    }

    return (
        <ScrollView>
            <View style={[styles.container, commonStyles.marginTop10]}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <IconEntypo name="chevron-left" size={34} color="#000" />
                </TouchableOpacity>
                <>
                    <View style={[commonStyles.marginTop30]}>
                        <TextBold style={[commonStyles.fs26]}>{t('payment.addNewCard')}</TextBold>
                    </View>

                    <View style={[commonStyles.marginTop30]}>
                        <CreditCardInput
                            horizontal={false}
                            requiresName
                            onChange={(form) => _onChange(form)} />
                    </View>
                    <View style={[commonStyles.marginTop30]}>
                        <ButtonLarge
                            title={t('payment.addCard')}
                            loader={loading}
                            onPress={() => {
                                addCard()
                            }}
                        />
                    </View>
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
    }
});