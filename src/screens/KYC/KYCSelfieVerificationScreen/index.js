import * as React from 'react';
import { Image } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import ButtonLarge from '../../../components/ButtonLarge';
import StepsIndicator from '../../../components/StepsIndicator';
import { styles } from './styles';

export default function KYCSelfieVerificationScreen ({navigation}){

    const onNextTap = () => {
        navigation.navigate('KYCFillOut')
    }

    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.titleTxt}>Selfie Verification</Text>

                <View  style={styles.stepsIndicator}>
                    <StepsIndicator currentPosition={2}/>
                </View>

                <Text style={styles.titleTxt}>Prepare to scan your face</Text>
                <Text style={styles.desc}>Make sure you are in a well-lit room{"\n"} and hold the phone as shown in the picture</Text>

                <Image source={require('../../../images/selfieVerification.png')} style={styles.accountVerImg}/>  
        
                <View style={styles.btnSubmit}>
                    <ButtonLarge title='Next' loader={false} onPress={onNextTap}/>
                </View>              
            </View>
        </ScrollView>
     
    )
}