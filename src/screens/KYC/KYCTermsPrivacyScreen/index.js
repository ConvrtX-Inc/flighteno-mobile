import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import TextBold from '../../../components/atoms/TextBold';
import ButtonLarge from '../../../components/ButtonLarge';
import { SubmitKYC } from '../../../redux/actions/KYC';
import { styles } from './styles';

export default function KYCTermsPrivacyScreen({navigation, route}){

    const dispatch = useDispatch()
    // const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const { token } = useSelector(({authRed}) => authRed)


    const onAcceptTap = () => {

        const kycRequest = new FormData()
        kycRequest.append('id_type','')
        kycRequest.append('id_number','')
        kycRequest.append('id_front','')
        kycRequest.append('id_back','')
        kycRequest.append('profile_image','')
        kycRequest.append('first_name','')
        kycRequest.append('middle_name','')
        kycRequest.append('last_name','')
        kycRequest.append('suffix','')
        kycRequest.append('address_line_1','')
        kycRequest.append('location','')
        kycRequest.append('birth_date','')
        kycRequest.append('phone_number','')

        dispatch(SubmitKYC(kycRequest,token,() => {
          
        },() => {
            Toast.show({
                type: 'success',
                text1: 'Alert!',
                text2: "Thanks for your response!",
            })
        }))

    }

    return(
        <ScrollView style={styles.container}>
            <TextBold style={styles.titleTxt}>Terms and Conditions</TextBold>
            <Text style={styles.subTitleTxt}>By using Flighteno™, you agree to our Terms and Condition and Privacy Policy</Text>
            <Text style={styles.termsTxt}>By tapping accept and continue , I agree to the Terms and Condition and Privacy Policy and i am giving flighteno my concent to use my personal data to: facilitate my transaction and avail of products and services; industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

            <View style={styles.btnAccept}>
                <ButtonLarge loader={false} title='Accept and Continue' onPress={onAcceptTap} />
            </View>
            
        </ScrollView>
    )
}