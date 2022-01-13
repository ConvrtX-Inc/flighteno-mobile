import React from 'react';
import { Alert, Image, Text, View } from 'react-native';
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
       <View style={styles.container}>
           <Image source={require('../../../images/logoTxt.png')} style={styles.logoTxt} />
           <Text style={styles.title}>Your Account{"\n"}is not yet verified</Text>
           <Text style={styles.desc}>Complete your profile to unlock{"\n"}more flighteno feature</Text>
           <Image source={require('../../../images/kycVerification.png')}  style={styles.kycImage} />

           <View style={styles.btnGetStarted}>
                <ButtonLarge loader={false} title="Get Started" onPress={onGetStartedTap} />
           </View> 
       </View> 
    )
}   ``