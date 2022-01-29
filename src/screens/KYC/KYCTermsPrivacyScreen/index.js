import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import TextBold from '../../../components/atoms/TextBold';
import ButtonLarge from '../../../components/ButtonLarge';
import { VerifyAccount} from '../../../redux/actions/KYC';
import { IS_LOADING } from '../../../redux/constants';
import { generateUID } from '../../../Utility/Utils';
import { styles } from './styles';

export default function KYCTermsPrivacyScreen({navigation, route}){

    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    // const { token } = useSelector(({authRed}) => authRed)
    const { kyc } = route.params

    
    const onAcceptTap = () => {

        const kycRequest = {
            user_id:currentUser?._id,
            id_type: kyc?.idType,
            id_number: kyc?.idNo,
            id_front:kyc?.fronPic,
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
        dispatch(VerifyAccount(token,kycRequest,() => {

            navigation.navigate('Profile')

        }))   

    }

    //for future reference on uploading photos to S3
    // const uploadPhotos = () => {
        
    //         dispatch({ type: IS_LOADING, isloading: true })
         
    //         const file = {
    //                 uri: kyc?.backPic,
    //                 name: generateUID() + ".jpg",
    //                 type: 'image/jpeg'
    //         }
    //         const options = {
    //             keyPrefix: "flighteno/reviews/",
    //             bucket: "memee-bucket",
    //             region: "eu-central-1",
    //             accessKey: "AKIA2YJH3TLHCODGDKFV",
    //             secretKey: "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",
    //             successActionStatus: 201
    //         }
    //             RNS3.put(file, options).then(response => {
    //                 if (response.status !== 201)
    //                     throw new Error("Failed to upload image to S3");
    //                 else
    //                     console.log(response?.body)
    //         });
    // }

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