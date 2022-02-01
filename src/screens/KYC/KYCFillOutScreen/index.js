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
import moment from 'moment';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import TextBold from '../../../components/atoms/TextBold';

export default function KYCFillOutScreen ({navigation,route}){

    const phoneInput = useRef()
    const { kyc } = route.params


    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] =  useState('')
    const [lastName, setLastName] = useState('')
    const [suffix, setSuffix] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    
    const [birthdate, setBirthDate] = useState(new Date())
    const [birthDateValue, setBirthDateValue] = useState("MM/DD/YYYY");
    const [cellno, setCellNo] = useState('');
    

    const [onDatePickerShow, setDatePickerShow] = useState(false)


    const onDatePickerChange = (event) => {
        setDatePickerShow(!onDatePickerShow)
        const currentDate = event?.timestamp || birthdate
        // setDateValue(moment(currentDate).format("MM/DD/YYYY"))
        setBirthDateValue(moment(currentDate).format("MM/DD/YYYY"))
        // setDate(event?.timestamp)
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
        kyc.phone = cellno

        if(firstName === '' || middleName === '' || lastName ===''  || addressLine1 === '' || addressLine2 === '' || cellno === ''){
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Fill up all the required fields",
            })
        }else{
            navigation.navigate('KYCTermsPrivacy', {kyc: kyc})
        }

    
    }

    return(
        <ScrollView  style={styles.container}>
            <View>
                <TextBold style={styles.titleTxt}>Fill Out Information</TextBold>
                <View style={styles.stepsIndicator}>
                    <StepsIndicator currentPosition={3}/>
                </View>
                
                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>First Name</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Yasmin' value={firstName} onChangeText={setFirstName}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Middle Name</TextBold>
                    <InputText placeholder='Che' value={middleName} onChangeText={setMiddleName}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Last Name</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Latika' value={lastName} onChangeText={setLastName}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Suffix</TextBold>
                    <InputText style={styles.inputTxt} placeholder='eg.Jr.' value={suffix} onChangeText={setSuffix}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Address Line 1</TextBold>
                    <InputText style={styles.inputTxt} placeholder='500 Kingston Rd' value={addressLine1} onChangeText={setAddressLine1} />
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Address Line 2</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Toronto ON M4L 1V3(Toronto, Ontoario)' value={addressLine2} onChangeText={setAddressLine2} />
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Birthdate</TextBold>
                    <DatePickerField onPress={() => {
                        onDatePickerTap()
                    }} date={birthDateValue}/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Phone Number</TextBold>
                    <View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={cellno}
                            defaultCode="AU"
                            onChangeFormattedText={(text) => {
                                setCellNo(text)
                            }}
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
                    <ButtonLarge title='Submit' loader={false} onPress={onSubmitTap}/>
                </View>


                {onDatePickerShow  && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={birthdate ?? new Date()}
                        mode='date'
                        display='calendar'
                        // onChange={onDatePickerChange}
                        onChange={({nativeEvent}) => {
                            // console.log(nativeEvent)
                            onDatePickerChange(nativeEvent)
                        }}
                        // minimumDate={new Date()}
                    />
                )}

            </View>
        </ScrollView>
    )
}