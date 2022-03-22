import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ButtonLarge from '../../../components/ButtonLarge';
import InputText from '../../../components/InputText';
import StepsIndicator from '../../../components/StepsIndicator';
import PhoneInput from "react-native-phone-number-input";
import { styles } from './styles';
import { useRef, useState  } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePickerField from '../../../components/DatePicker';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import TextBold from '../../../components/atoms/TextBold';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function KYCFillOutScreen ({navigation,route}){

    // const phoneInput = useRef()
    const { kyc } = route?.params
    const {t} = useTranslation()

    const phoneInput = React.useRef()

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] =  useState('')
    const [lastName, setLastName] = useState('')
    const [suffix, setSuffix] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    
    const [birthdate, setBirthDate] = useState(new Date())
    const [birthDateValue, setBirthDateValue] = useState("MM/DD/YYYY");

    const [formattedPhone, setFormattedPhone] = useState('');
    const [phoneVal, setPhoneVal] = useState('')
    

    const [onDatePickerShow, setDatePickerShow] = useState(false)


    const onDatePickerChange = (event) => {
        setDatePickerShow(!onDatePickerShow)
        const currentDate = event?.timestamp || birthdate
        // setDateValue(moment(currentDate).format("MM/DD/YYYY"))
        setBirthDateValue(moment(currentDate).format("MM/DD/YYYY"))
        setBirthDate(event?.timestamp)
    }

    const onDatePickerTap = () => {
        setDatePickerShow(!onDatePickerShow)
    }

    const onSubmitTap = () => {
       
        //add new data to kyc form
        kyc.firstName = firstName
        kyc.middleName = middleName
        kyc.lastName = lastName
        kyc.suffix = suffix
        kyc.addressLine1 = addressLine1
        kyc.addressLine2 = addressLine2
        kyc.birthdate = birthdate
        kyc.phone = formattedPhone
       

        // const checkValid = phoneInput.current?.isValidNumber(cellno)
        const isValidNum = phoneInput.current?.isValidNumber(phoneVal)
        

        if(firstName === '' || middleName === '' || lastName ===''  || addressLine1 === '' || addressLine2 === '' || formattedPhone === '' ){

            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Fill up all the required fields",
            })

        }else{
                        
            if(!isValidNum){
                Toast.show({
                    type: 'error',
                    text2: "Phone number not valid",
                })
            }else{
               navigation.navigate('KYCTermsPrivacy', {kyc: kyc})
            }
           
        }
        
    
    }

    const onCancelTap = () => {

    }

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView  style={styles.container}>
            <View>
                <TextBold style={[styles.titleTxt,  {textAlign:'left'}]}>{t('kyc.fillOutInfo')}</TextBold>
                <View style={styles.stepsIndicator}>
                    <StepsIndicator currentPosition={3}/>
                </View>
                
                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel,  {textAlign:'left'}]}>{t('kyc.firstName')}</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Yasmin' value={firstName} onChangeText={setFirstName}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel,  {textAlign:'left'}]}>{t('kyc.middleName')}</TextBold>
                    <InputText placeholder='Che' value={middleName} onChangeText={setMiddleName}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel,  {textAlign:'left'}]}>{t('kyc.lastName')}</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Latika' value={lastName} onChangeText={setLastName}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel,  {textAlign:'left'}]}>{t('kyc.suffix')}</TextBold>
                    <InputText style={styles.inputTxt} placeholder='eg.Jr.' value={suffix} onChangeText={setSuffix}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel,  {textAlign:'left'}]}>{t('kyc.addrsLine1')}</TextBold>
                    <InputText style={styles.inputTxt} placeholder='500 Kingston Rd' value={addressLine1} onChangeText={setAddressLine1} />
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel,  {textAlign:'left'}]}>{t('kyc.addrsLine2')}</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Toronto ON M4L 1V3(Toronto, Ontoario)' value={addressLine2} onChangeText={setAddressLine2} />
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel,  {textAlign:'left'}]}>{t('kyc.bdate')}</TextBold>
                    <DatePickerField onPress={() => {
                        onDatePickerTap()
                    }} date={birthDateValue}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel, {textAlign:'left'}]}>{t('kyc.phoneNum')}</TextBold>
                    <View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneVal}
                            defaultCode="AU"
                            onChangeFormattedText={setFormattedPhone}
                            onChangeText = {setPhoneVal}
                            containerStyle={styles.phoneContainer}
                            textInputStyle={styles.phoneInput}
                            textContainerStyle={styles.phoneTextContainer}
                            codeTextStyle={styles.phoneCodeText}
                            textInputProps={{
                            placeholderTextColor: "#707070",
                            keyboardType: "phone-pad",
                            placeholder: "123-456-789",
                            
                        }}/>
 
                    </View>
                </View>


               
                <View style={styles.btnSubmit}>
                    <ButtonLarge title={t('kyc.submit')} loader={false} onPress={onSubmitTap}/>
                </View>


                <DateTimePickerModal
                    isVisible={onDatePickerShow}
                    mode='date'
                    onCancel={onCancelTap}
                    onConfirm={onDatePickerChange}
                />

            </View>
        </ScrollView>
        </SafeAreaView>
    )
}