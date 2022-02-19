// Core packages
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';


// Packages
import IconEntypo from 'react-native-vector-icons/Entypo';

// Custom Imports
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import TextRegular from '../../components/atoms/TextMedium';
import { commonStyles } from '../../Utility/CommonStyles';
import Constants from '../../Utility/Constants';


export default function PaymentAddNewCard ({navigation}) {
    const {t} = useTranslation();
    return (
        <View style={[styles.container, commonStyles.marginTop10]}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <IconEntypo name="chevron-left" size={34} color="#000" />                
            </TouchableOpacity>
            <> 
                <View style={[commonStyles.marginTop30, styles.withMargin]}>
                    <TextBold style={[commonStyles.fs26]}>{t('payment.addNewCard')}</TextBold>
                </View>
            </>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: Constants.appLayout.screenContainerMarginHorizontal,
        backgroundColor: '#FFFFFF',
        borderWidth: 1
    },
    backButton: {
        marginStart: -10,
        width: 30,
    }
});