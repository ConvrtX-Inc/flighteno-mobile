import * as React from 'react';
import { Image } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';
import ButtonLarge from '../../../components/ButtonLarge';
import StepsIndicator from '../../../components/StepsIndicator';
import { styles } from './styles';

export default function KYCSelfieVerificationScreen ({navigation}){

    const onNextTap = () => {
        navigation.navigate('KYCSelfieVerificationCamera')
    }

    return(
        <>
            
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextBold style={styles.titleTxt}>Selfie Verification</TextBold>

                    <View  style={styles.stepsIndicator}>
                        <StepsIndicator currentPosition={2}/>
                    </View>

                    <TextBold style={styles.titleTxt}>Prepare to scan your face</TextBold>
                    <TextMedium style={styles.desc}>Make sure you are in a well-lit room{"\n"} and hold the phone as shown in the picture</TextMedium>

                    <Image source={require('../../../images/selfieVerification.png')} style={styles.accountVerImg}/>  
                </View>
            </View>
               
              

            <View style={styles.btnSubmit}>
                <ButtonLarge title='Next' loader={false} onPress={onNextTap}/>
            </View>              
           
        </>
     
    )
}