import React from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import ButtonLarge from '../../../components/ButtonLarge';
import Input from '../../../components/InputField';
import { styles } from './styles';
import StepIndicator from 'react-native-step-indicator';

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }
  const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];

export default function  SelectIDScreen (){
    return (
        <ScrollView  style={styles.container}>

            <View>
                 <StepIndicator
         customStyles={customStyles}
        //  currentPosition={this.state.currentPosition}
         labels={labels}
    />
                <Text style={styles.titleTxt}>Id Verification</Text>
                <Text style={[styles.inputLabel]}>ID Type</Text>
                <View>
                    <Text>Permanent Resident Card</Text>
                </View>

                <Text style={styles.inputLabel}>ID No.</Text>
                <Input />

                <Text style={[ styles.inputLabel,styles.frontPicTxt]}>Upload front picture</Text>
                <TouchableOpacity style={styles.idContainer}>
                    <Image source={require('../../../images/frontIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <Text style={[styles.inputLabel,styles.backPicTxt]}>Upload back picture of ID</Text>
                <TouchableOpacity style={styles.idContainer}>
                    <Image source={require('../../../images/backIdPicture.png')} style={[styles.idPicture]} />
                </TouchableOpacity>

                <View>
                    <ButtonLarge loader={false} title="Next" />
                </View>
            
            </View>
        </ScrollView>
    )
}