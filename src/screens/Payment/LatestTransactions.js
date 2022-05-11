// Core packages
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';


// Packages
import IconEntypo from 'react-native-vector-icons/Entypo';

// Custom Imports
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import TextRegular from '../../components/atoms/TextMedium';
import { commonStyles } from '../../Utility/CommonStyles';
import Constants from '../../Utility/Constants';
import PaymentCard from '../../components/PaymentCard';
import { getCards,getCustomerDefaultCard } from '../../services/Stripe/CardManagement'
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const transactions = [
    {
        name:"Travis",
        amount:"+100",
        date:"1 hr ago"
    },
    {
        name:"Jane Doe",
        amount:"+1500",
        date:"5 hr ago"
    },
    {
        name:"Jane Doe",
        amount:"-300",
        date:"2 days ago"
    },
    {
        name:"Muhammad Zeeshan",
        amount:"+1350",
        date: "1 month ago"
    },{
        name:"John Doe",
        amount:"-500",
        date:"2 months ago"
    }
]

export default function LatestTransactionsScreen({ navigation }) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [hasCard, setHasCard] = useState(true);
    const { myCards } = useSelector(({ myCardsRed }) => myCardsRed)
    const { currentUser } = useSelector(({ authRed }) => authRed)
    // const [transactions , setTransactions] = useState([]);

    const dispatch = useDispatch()


    useEffect(() => {
        getMyCards()
    }, [])

    async function getMyCards() {
        console.log('CUSTOMER ID::',currentUser.stripe_customer_id)
        dispatch(await getCards(currentUser.stripe_customer_id))

        //get default card
        dispatch(await getCustomerDefaultCard(currentUser.stripe_customer_id, currentUser));

    }


    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={[styles.withMargin, commonStyles.marginTop10]}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <IconEntypo name="chevron-left" size={34} color="#000" />
                </TouchableOpacity>
            </View>

            {
                isLoading ? (
                    <View style={commonStyles.centerScreen}>
                        <ActivityIndicator size="large" color={Constants.appColor.primary} />
                    </View>
                ) : (
                    <>
                        <View style={[commonStyles.marginTop30, styles.withMargin]}>
                            <TextBold style={[commonStyles.fs26, {textAlign:'left'}]}>{t('payment.addCard')}</TextBold>
                        </View>
                        {
                            hasCard ? (
                                <View style={[commonStyles.marginTop30, commonStyles.flexDirectionRow, styles.withMarginLeft]}>
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}>
                                        <View style={[commonStyles.padding10, commonStyles.justifyContentCenter]}>
                                            <TouchableOpacity onPress={() => navigation.navigate('PaymentAddNewCard')}>
                                                <Image
                                                    source={require('../../assets/images/pngs/add-card-box-sm.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            myCards?.map(card => <PaymentCard card={card} key={card.id} />)
                                        }
                                    </ScrollView>

                                </View>
                            ) : (
                                <View style={[commonStyles.marginTop30, styles.withMargin]}>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../../assets/images/pngs/add-card-box.png')}
                                            resizeMode="stretch"
                                            style={{ width: '100%' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }

                        <View style={[styles.withMargin, commonStyles.flex1]}>
                            <ScrollView>
                                <View style={[commonStyles.marginTop30]}>
                                    <TextBold style={[commonStyles.fs26, {textAlign:'left'}]}>{t('payment.latestTransactions')}</TextBold>
                                </View>
                                {
                                    transactions.map((transaction,index) =>(
                                        <View style={commonStyles.flex1} key={index}>
                                        <View style={commonStyles.padding6}>
                                            <View
                                                style={
                                                    [
                                                        commonStyles.padding10,
                                                        commonStyles.borerRadius12,
                                                        commonStyles.marginTop20,
                                                        commonStyles.shadow,
                                                        commonStyles.bcWhite,
                                                    ]
                                                }>
                                                <View style={[styles.transaction]}>
                                                    <View>
                                                        <Image
                                                            source={require('../../images/manProfile.png')}
                                                            style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                                    </View>
                                                    <View style={[commonStyles.marginHorizontal20, { flex: 1 }]}>
                                                        <TextBold style={commonStyles.fs20}>{transaction.name}</TextBold>
                                                        <TextMedium style={[commonStyles.fs16, commonStyles.cMountainMist]}>{transaction.date}</TextMedium>
                                                    </View>
                                                    <View>
                                                        <TextMedium style={[commonStyles.fs20, commonStyles.cMediumGreen]}>{transaction.amount}</TextMedium>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    ))
                                }
                               
                            </ScrollView>
                        </View>
                    </>
                )
            }
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        marginStart: -10,
        width: 30,
    },
    withMargin: {
        marginHorizontal: Constants.appLayout.screenContainerMarginHorizontal,
    },
    withMarginLeft: {
        marginLeft: 30
    },
    transaction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});