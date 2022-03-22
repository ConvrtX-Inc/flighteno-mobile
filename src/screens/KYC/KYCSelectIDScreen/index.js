import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, ImagePickerIOS } from 'react-native';

import ButtonLarge from '../../../components/ButtonLarge';
import { styles } from './styles';
import InputText from '../../../components/InputText';
import StepsIndicator from '../../../components/StepsIndicator';
import TextBold from '../../../components/atoms/TextBold';
import Toast from 'react-native-toast-message';
import { imgToBase64 } from '../../../Utility/Utils';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';


export default function  KYCSelectIDScreen ({navigation,route}){

    const [open, setOpen] = useState(false);
    const {t} = useTranslation()
    
    const [items, setItems] = useState([
        {label: 'Permanent Resident Card', value: 'permanent resident card'},
        {label: 'Passport', value: 'passport'}
    ]);

    const [pickerSelected, setPickerSelected] = useState()

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
        
        if(backPicture === '' || frontPicture === '' || idNo === '' ||pickerSelected === '' ){

            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Fill up all the required fields",
            })
            
        }else{  

            const kycForm = {idNo: idNo, idType: pickerSelected, frontPic: imgFrontBase64, backPic: imgBackBase64}

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
        <SafeAreaView style={{flex:1}}>
            <ScrollView  style={styles.container}>
            <View>
                <TextBold style={[styles.titleTxt,{textAlign:'left'}]}>{t('kyc.idVer')}</TextBold>

                <View style={styles.stepIndicator}>
                    <StepsIndicator currentPosition={1}/>
                </View>

                <TextBold style={[styles.inputLabel, styles.idTypeTxt, {textAlign:'left'}]}>{t('kyc.idType')}</TextBold>
            
                <View style={[ Platform.OS == 'ios' ? styles.pickerVIew : styles.pickerAndroidView, {marginTop:16}]}>
                    <RNPickerSelect
                        items={items}
                        onValueChange={setPickerSelected}
                        style={{
                            inputIOS:{
                                fontFamily:'Gilroy-Medium',
                                color:'#656F85'
                            },
                            inputAndroid:{
                                fontFamily:'GilroyMedium',
                                color:'#656F85'
                            },
                            viewContainer:{
                                padding:Platform.OS == 'ios' ?  16 : 0
                            },
                            placeholder:{
                                fontFamily:'Gilroy-Medium',
                                fontSize:14
                            }
                        }
                     } 
                    />
                </View>
            
                <TextBold style={[styles.inputLabel,styles.idNoField, {textAlign:'left'}]}>{t('kyc.IdNo')}.</TextBold>

                <View style={styles.inputIdNo}>
                    <InputText placeholder='CADL-1231231233' value={idNo} onChangeText={setIdNo} />
                </View>

                <TextBold style={[ styles.inputLabel,styles.frontPicTxt, {textAlign:'left'}]}>{t('kyc.uploadFront')}</TextBold>
                <TouchableOpacity style={styles.idContainer} onPress={onFrontPictureTap}> 
                    <Image source={frontPicture ? {uri: frontPicture} : require('../../../images/frontIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <TextBold style={[styles.inputLabel,styles.backPicTxt, {textAlign:'left'}]}>{t('kyc.uploadBack')}</TextBold>
                <TouchableOpacity style={styles.idContainer} onPress={onBackPictureTap}>
                    <Image source={backPicture ? {uri : backPicture} : require('../../../images/backIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <View style={styles.btnNext}>
                    <ButtonLarge loader={false} title={t('kyc.next')} onPress={onNextTap} />
                </View>
            
            </View>
        </ScrollView>
        </SafeAreaView>
       
    )
}