import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ButtonLarge from '../../../components/ButtonLarge';
import InputText from '../../../components/InputText';
import StepsIndicator from '../../../components/StepsIndicator';
import PhoneInput from "react-native-phone-number-input";
import { styles } from './styles';
import { useRef, useState  } from 'react';

export default function KYCFillOutScreen (){

    const phoneInput = useRef()

    const [cellno, setCellNo] = useState('');

    return(
        <ScrollView  style={styles.container}>
            <View>
                <Text style={styles.titleTxt}>Fill Out Information</Text>
                <View style={styles.stepsIndicator}>
                    <StepsIndicator currentPosition={3}/>
                </View>
                

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>First Name</Text>
                    <InputText style={styles.inputTxt} placeholder='Yasmin'/>
                </View>

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>Middle Name</Text>
                    <InputText placeholder='Che'/>
                </View>

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>Last Name</Text>
                    <InputText style={styles.inputTxt} placeholder='Latika'/>
                </View>

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>Suffix</Text>
                    <InputText style={styles.inputTxt} placeholder='eg.Jr.'/>
                </View>

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>Address Line 1</Text>
                    <InputText style={styles.inputTxt} placeholder='500 Kingston Rd'/>
                </View>

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>Address Line 2</Text>
                    <InputText style={styles.inputTxt} placeholder='Toronto ON M4L 1V3(Toronto, Ontoario)'/>
                </View>

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>Birthdate</Text>
                    <InputText style={styles.inputTxt}/>
                </View>

                <View style={styles.textField}>
                    <Text style={[styles.inputLabel]}>Phone Number</Text>
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
                    }}
                />
 
                    </View>
                </View>


               
                <View style={styles.btnSubmit}>
                    <ButtonLarge title='Submit' loader={false}/>
                </View>
                

            </View>
        </ScrollView>
    )
}