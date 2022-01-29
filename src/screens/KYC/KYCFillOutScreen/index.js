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
import TextBold from '../../../components/atoms/TextBold';

export default function KYCFillOutScreen ({navigation,route}){

    const phoneInput = useRef()
    const { kyc } = route.params

    const [cellno, setCellNo] = useState('');
    const [date, setDate] = useState(new Date());
    const [dateValue, setDateValue] = useState("MM/DD/YYYY");
    const [onDatePickerShow, setDatePickerShow] = useState(false)


    const onDatePickerChange = (event) => {
        setDatePickerShow(!onDatePickerShow)
        const currentDate = event?.timestamp || date
        setDateValue(moment(currentDate).format("MM/DD/YYYY"))
        setDate(event?.timestamp)
    }

    const onDatePickerTap = () => {
        setDatePickerShow(!onDatePickerShow)
    }

    const onSubmitTap = () => {
        console.log(kyc)
        // navigation.navigate('KYCTermsPrivacy')
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
                    <InputText style={styles.inputTxt} placeholder='Yasmin'/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Middle Name</TextBold>
                    <InputText placeholder='Che'/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Last Name</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Latika'/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Suffix</TextBold>
                    <InputText style={styles.inputTxt} placeholder='eg.Jr.'/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Address Line 1</TextBold>
                    <InputText style={styles.inputTxt} placeholder='500 Kingston Rd'/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Address Line 2</TextBold>
                    <InputText style={styles.inputTxt} placeholder='Toronto ON M4L 1V3(Toronto, Ontoario)'/>
                </View>

                <View style={styles.textField}>
                    <TextBold style={[styles.inputLabel]}>Birthdate</TextBold>
                    <DatePickerField onPress={() => {
                        onDatePickerTap()
                    }} date={dateValue}/>
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
                        value={date ?? new Date()}
                        mode='date'
                        display='default'   
                        // onChange={onDatePickerChange}
                        onChange={({nativeEvent}) => {
                            // console.log(nativeEvent)
                            onDatePickerChange(nativeEvent)
                            
                            
                        }}
                        minimumDate={new Date()}
                    />
                )}

            </View>
        </ScrollView>
    )
}