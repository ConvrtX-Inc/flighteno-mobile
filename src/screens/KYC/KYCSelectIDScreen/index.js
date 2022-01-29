import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, ImagePickerIOS } from 'react-native';
import ButtonLarge from '../../../components/ButtonLarge';
import { styles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import InputText from '../../../components/InputText';
import StepsIndicator from '../../../components/StepsIndicator';
import TextBold from '../../../components/atoms/TextBold';


export default function  KYCSelectIDScreen ({navigation,route}){

    const [open, setOpen] = useState(false);
    
    const [items, setItems] = useState([
        {label: 'Permanent Resident Card', value: 'permanent resident card'},
        {label: 'SSS', value: 'sss'}
    ]);

    //form fields
    const [idType, setIdType] = useState(null);
    const [idNo, setIdNo] = useState('')
    const frontPicture = route.params?.frontImg
    const backPicture = route.params?.backImg


    const onFrontPictureTap = () => {
        navigation.navigate('KYCSelectIDCamera', {isFront: true})    
    }

    const onBackPictureTap = () => {
        navigation.navigate('KYCSelectIDCamera', {isFront: false})
    }

    const onNextTap = () => {
        console.log(idNo)
        console.log(idType)
        console.log(frontPicture)
        console.log(backPicture)
        
        const kycForm = {idNo: idNo, idType: idType, frontPic: frontPicture, backPic: backPicture}
        navigation.navigate('KYCSendVerification', {kyc: kycForm})
    }

    return (
        <ScrollView  style={styles.container}>
            <View>
                <TextBold style={styles.titleTxt}>Id Verification</TextBold>

                <View style={styles.stepIndicator}>
                    <StepsIndicator currentPosition={1}/>
                </View>

                <TextBold style={[styles.inputLabel, styles.idTypeTxt]}>ID Type</TextBold>
            
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
            
                <TextBold style={[styles.inputLabel,styles.idNoField]}>ID No.</TextBold>

                <View style={styles.inputIdNo}>
                    <InputText placeholder='CADL-1231231233' value={idNo} onChangeText={setIdNo} />
                </View>
                

                <TextBold style={[ styles.inputLabel,styles.frontPicTxt]}>Upload front picture of ID</TextBold>
                <TouchableOpacity style={styles.idContainer} onPress={onFrontPictureTap}> 
                    <Image source={frontPicture ? {uri: frontPicture} : require('../../../images/frontIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <TextBold style={[styles.inputLabel,styles.backPicTxt]}>Upload back picture of ID</TextBold>
                <TouchableOpacity style={styles.idContainer} onPress={onBackPictureTap}>
                    <Image source={backPicture ? {uri : backPicture} : require('../../../images/backIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <View style={styles.btnNext}>
                    <ButtonLarge loader={false} title="Next" onPress={onNextTap} />
                </View>
            
            </View>
        </ScrollView>
    )
}