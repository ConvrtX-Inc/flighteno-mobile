import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, ImagePickerIOS } from 'react-native';

import ButtonLarge from '../../../components/ButtonLarge';
import { styles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import InputText from '../../../components/InputText';
import StepsIndicator from '../../../components/StepsIndicator';
import TextBold from '../../../components/atoms/TextBold';
import Toast from 'react-native-toast-message';
import { imgToBase64 } from '../../../Utility/Utils';
import { useTranslation } from 'react-i18next';


export default function  KYCSelectIDScreen ({navigation,route}){

    const [open, setOpen] = useState(false);
    const {t} = useTranslation()
    
    const [items, setItems] = useState([
        {label: 'Permanent Resident Card', value: 'permanent resident card'},
        {label: 'SSS', value: 'sss'}
    ]);

    //form fields
    const [idType, setIdType] = useState('');
    const [idNo, setIdNo] = useState('')
    const [imgFrontBase64, setImgFrontBase64] = useState('')
    const [imgBackBase64, setImgBackBase64] = useState('')
    


    const frontPicture = route.params?.frontImg ?? ''
    const backPicture = route.params?.backImg ?? ''


    const onFrontPictureTap = () => {
        navigation.navigate('KYCSelectIDCamera', {isFront: true})    
    }

    const onBackPictureTap = () => {
        navigation.navigate('KYCSelectIDCamera', {isFront: false})
    }

    const onNextTap = () => {
       
        
        if(backPicture === '' || frontPicture === '' || idNo === '' ||idType === '' ){

            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Fill up all the required fields",
            })
            
        }else{  

            const kycForm = {idNo: idNo, idType: idType, frontPic: imgFrontBase64, backPic: imgBackBase64}

            imgToBase64(frontPicture).then((data) => {
                setImgFrontBase64(data)
            })
     
            imgToBase64(backPicture).then((data) => {
                setImgBackBase64(data)
            })

            navigation.navigate('KYCSendVerification', { kyc: kycForm })
         

        }

        
    }


    return (
        <ScrollView  style={styles.container}>
            <View>
                <TextBold style={styles.titleTxt}>{t('kyc.idVer')}</TextBold>

                <View style={styles.stepIndicator}>
                    <StepsIndicator currentPosition={1}/>
                </View>

                <TextBold style={[styles.inputLabel, styles.idTypeTxt]}>{t('kyc.idType')}</TextBold>
            
                <DropDownPicker
                    open={open}
                    value={idType}
                    items={items}
                    setOpen={setOpen}
                    setValue={setIdType}
                    setItems={setItems}
                    style={styles.dropDown}
                    dropDownContainerStyle={styles.dropDownContainer}
                    showTickIcon={false}
                />
            
                <TextBold style={[styles.inputLabel,styles.idNoField]}>{t('kyc.IdNo')}.</TextBold>

                <View style={styles.inputIdNo}>
                    <InputText placeholder='CADL-1231231233' maxLength={14} value={idNo} onChangeText={setIdNo} />
                </View>
                

                <TextBold style={[ styles.inputLabel,styles.frontPicTxt]}>{t('kyc.uploadFront')}</TextBold>
                <TouchableOpacity style={styles.idContainer} onPress={onFrontPictureTap}> 
                    <Image source={frontPicture ? {uri: frontPicture} : require('../../../images/frontIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <TextBold style={[styles.inputLabel,styles.backPicTxt]}>{t('kyc.uploadBack')}</TextBold>
                <TouchableOpacity style={styles.idContainer} onPress={onBackPictureTap}>
                    <Image source={backPicture ? {uri : backPicture} : require('../../../images/backIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <View style={styles.btnNext}>
                    <ButtonLarge loader={false} title={t('kyc.next')} onPress={onNextTap} />
                </View>
            
            </View>
        </ScrollView>
    )
}