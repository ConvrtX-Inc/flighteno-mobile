import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import TextBold from '../../../components/atoms/TextBold';
import ButtonLarge from '../../../components/ButtonLarge';
import { stripeVerification } from '../../../redux/actions/Auth';
import { VerifyAccount} from '../../../redux/actions/KYC';
import { IS_LOADING } from '../../../redux/constants';
import { generateUID } from '../../../Utility/Utils';
import { styles } from './styles';

export default function KYCTermsPrivacyScreen({navigation, route}){

    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    // const { token } = useSelector(({authRed}) => authRed)
    const { kyc } = route.params
    const {t} = useTranslation()

    
    const onAcceptTap = () => {

        const kycRequest = {
            user_id:currentUser?._id,
            id_type: kyc?.idType,
            id_number: kyc?.idNo,
            id_front:kyc?.frontPic,
            id_back: kyc?.backPic,
            profile_image: kyc?.profile_image,
            first_name: kyc?.firstName,
            middle_name: kyc?.middleName,
            last_name: kyc?.lastName,
            suffix:kyc?.suffix,
            address_line_1:kyc?.addressLine1,
            location:kyc?.addressLine2,
            birth_date: kyc?.birthdate,
            phone_number: kyc?.phone
        }   

      
        dispatch({ type: IS_LOADING, isloading: true })
        // dispatch(VerifyAccount(token,kycRequest,() => {
            
        //     dispatch(stripeVerification(token))
        //     // navigation.navigate('Profile')

        // }))   
        dispatch(VerifyAccount(token,kycRequest,() => {
            navigation.navigate('Profile')
        }))

    }

    return(
        <ScrollView style={styles.container}>
            <TextBold style={[styles.titleTxt,  {textAlign:'left'}]}>{t('common.termsConditions')}</TextBold>
            <Text style={[styles.subTitleTxt,  {textAlign:'center'}]}>By using Flighteno™, you agree to our Terms and Condition and Privacy Policy</Text>
            <Text style={styles.termsTxt}>By tapping accept and continue , I agree to the Terms and Condition and Privacy Policy and i am giving flighteno my concent to use my personal data to: facilitate my transaction and avail of products and services; industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

            <View style={styles.btnAccept}>
                <ButtonLarge loader={loading} title={t('kyc.acceptContinue')} onPress={onAcceptTap} />
            </View>
            
        </ScrollView>
    )
}