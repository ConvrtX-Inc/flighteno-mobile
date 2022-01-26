import React from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import TextExtraBold from '../../../components/atoms/TextExtraBold';
import TextMedium from '../../../components/atoms/TextMedium';
import ButtonLarge from '../../../components/ButtonLarge';
import { styles } from './styles';

export default function KYCIntroScreen({navigation}){

    const onGetStartedTap = () => {
        Alert.alert("Important","To ensure a smooth process, please read the following reminders: \n\n - Prepare your valid id\n - Know your citizenship id number", 
        [{ 
            text:'Ok, Got It', 
            onPress: ()=> {
                navigation.navigate('KYCSelectID')
        }, }, 
        {text:'Cancel'}])
    }


    return(
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require('../../../images/logoTxt.png')} style={styles.logoTxt} />
                    <TextExtraBold style={styles.title}>Your Account{"\n"}is not yet verified</TextExtraBold>
                    <TextMedium style={styles.desc}>Complete your profile to unlock{"\n"}more flighteno feature</TextMedium>
                    <Image source={require('../../../images/kycVerification.png')}  style={styles.kycImage} />
                </View>
            </View> 
              
             
            <View>
                <View style={styles.btnGetStarted}>
                    <ButtonLarge loader={false} title="Get Started" onPress={onGetStartedTap} />
                </View> 
            </View>
        </> 
    )
}   