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
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Permanent Resident Card', value: 'permanent-resident-card'},
        {label: 'SSS', value: 'sss'}
    ]);
  
    const frontPicture = route.params?.frontImg
    const backPicture = route.params?.backImg

    const onFrontPictureTap = () => {
        navigation.navigate('KYCSelectIDCamera', {isFront: true})    
    }

    const onBackPictureTap = () => {
        navigation.navigate('KYCSelectIDCamera', {isFront: false})
    }

    const onNextTap = () => {
        navigation.navigate('KYCSendVerification')
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
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.dropDown}
                    dropDownContainerStyle={styles.dropDownContainer}
                    showTickIcon={false}
                />
            
                <TextBold style={[styles.inputLabel,styles.idNoField]}>ID No.</TextBold>

                <View style={styles.inputIdNo}>
                    <InputText placeholder='CADL-1231231233' />
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