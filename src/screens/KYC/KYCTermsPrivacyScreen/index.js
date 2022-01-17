import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ButtonLarge from '../../../components/ButtonLarge';
import { styles } from './styles';

export default function KYCTermsPrivacyScreen(){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.titleTxt}>Terms and Conditions</Text>
            <Text style={styles.subTitleTxt}>By using Flighteno™, you agree to our Terms and Condition and Privacy Policy</Text>
            <Text style={styles.termsTxt}>By tapping accept and continue , I agree to the Terms and Condition and Privacy Policy and i am giving flighteno my concent to use my personal data to: facilitate my transaction and avail of products and services; industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

            <View style={styles.btnAccept}>
                <ButtonLarge loader={false} title='Accept and Continue' />
            </View>
            
        </ScrollView>
    )
}