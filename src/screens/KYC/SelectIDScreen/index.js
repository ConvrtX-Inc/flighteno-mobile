import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, ImagePickerIOS } from 'react-native';
import ButtonLarge from '../../../components/ButtonLarge';
import { styles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import InputText from '../../../components/InputText';
import StepsIndicator from '../../../components/StepsIndicator';


export default function  SelectIDScreen ({navigation}){

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Permanent Resident Card', value: 'permanent-resident-card'},
        {label: 'SSS', value: 'sss'}
    ]);
    const [frontImage, setFrontImage] = useState('')
    const [backImage, setBackImage] = useState('')

    const onImagePickerLaunch = () => {

        let options = {
            title: 'Select Image',
            customButtons:[
                { name: 'customOptionKey', title:'Choose Photo from Custom Option' }
            ],
            storageOptions: {
                skipBackup: true,
                path:'images'
            }
        }

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log(response)
        })

        
    }

    const onFrontPictureTap = () => {
        onImagePickerLaunch()
        console.log('on front tap')
    }

    const onBackPictureTap = () => {
        onImagePickerLaunch()
        console.log('on front tap')
    }

    const onNextTap = () => {
        console.log('next tap')
        navigation.navigate('KYCFillOut')
    }


    return (
        <ScrollView  style={styles.container}>
            <View>
                <Text style={styles.titleTxt}>Id Verification</Text>

                <View style={styles.stepIndicator}>
                    <StepsIndicator currentPosition={1}/>
                </View>

                <Text style={[styles.inputLabel, styles.idTypeTxt]}>ID Type</Text>

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
            
                <Text style={[styles.inputLabel,styles.idNoField]}>ID No.</Text>

                <View style={styles.inputIdNo}>
                    <InputText placeholder='CADL-1231231233' />
                </View>
                

                <Text style={[ styles.inputLabel,styles.frontPicTxt]}>Upload front picture of ID</Text>
                <TouchableOpacity style={styles.idContainer} onPress={onFrontPictureTap}> 
                    <Image source={require('../../../images/frontIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <Text style={[styles.inputLabel,styles.backPicTxt]}>Upload back picture of ID</Text>
                <TouchableOpacity style={styles.idContainer} onPress={onBackPictureTap}>
                    <Image source={require('../../../images/backIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <View style={styles.btnNext}>
                    <ButtonLarge loader={false} title="Next" onPress={onNextTap} />
                </View>
            
            </View>
        </ScrollView>
    )
}