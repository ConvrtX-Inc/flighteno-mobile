// Core packages
import React, { Component, useState } from 'react';
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

const cards = [
    {
        name: 'Master Card',
        card_no: '123-700-202020',  
        cardholder_name: 'Tony Saromines',
        background_color: '#36C5F0',
        expiration: '10/25',
        type: 'Debit card',
        card_logo: 'https://w7.pngwing.com/pngs/371/4/png-transparent-visa-debit-card-credit-card-logo-mastercard-visa-text-trademark-logo.png',
        status: 1,
    },
    {
        name: 'VISA',
        card_no: '11111-700-3334',     
        cardholder_name: 'Yoni Suico',   
        background_color: '#0E3F5A',
        expiration: '10/25',
        type: 'Debit card',
        card_logo: 'https://w7.pngwing.com/pngs/371/4/png-transparent-visa-debit-card-credit-card-logo-mastercard-visa-text-trademark-logo.png',
        status: 1,
    },
    {
        name: 'METROBANK',
        card_no: '1563-2222-202020',       
        cardholder_name: 'Khaleesi Saromines',  
        background_color: '#000000',
        expiration: '10/25',
        type: 'Debit card',
        card_logo: 'https://w7.pngwing.com/pngs/371/4/png-transparent-visa-debit-card-credit-card-logo-mastercard-visa-text-trademark-logo.png',
        status: 1,
    },
];

export default function LatestTransactionsScreen ({navigation}) {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [hasCard, setHasCard] = useState(true);
    
    return (
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
                            <TextBold style={[commonStyles.fs26]}>{t('payment.addCard')}</TextBold>
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
                                            cards.map(card => <PaymentCard card={card} key={card.card_no} />)
                                        } 
                                    </ScrollView>
                                                                       
                                </View>
                            ) : (
                                <View style={[commonStyles.marginTop30, styles.withMargin]}>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../../assets/images/pngs/add-card-box.png')}
                                            resizeMode="stretch"
                                            style={{width: '100%'}}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }                        

                        <View style={styles.withMargin}>
                            <ScrollView>
                                <View style={[commonStyles.marginTop30]}>
                                    <TextBold style={[commonStyles.fs26]}>{t('payment.latestTransactions')}</TextBold>
                                </View>
                                <View style={commonStyles.flex1}>    
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
                                                        style={{width: 50, height: 50, borderRadius: 50/2}}/>
                                                </View>
                                                <View style={[commonStyles.marginHorizontal20, {flex: 1}]}>
                                                    <TextBold style={commonStyles.fs20}>Travis</TextBold>
                                                    <TextMedium style={[commonStyles.fs16, commonStyles.cMountainMist]}>2 hr ago</TextMedium>
                                                </View>
                                                <View>
                                                    <TextMedium style={[commonStyles.fs20, commonStyles.cMediumGreen]}>+$600.00</TextMedium>
                                                </View>
                                            </View>
                                        </View>  
                                    </View>                                                              
                                </View>   
                            </ScrollView>  
                        </View>                        
                    </>
                )
            }                                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: '#FFFFFF'
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