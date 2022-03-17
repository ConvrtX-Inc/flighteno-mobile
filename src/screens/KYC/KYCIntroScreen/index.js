import React from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import TextExtraBold from '../../../components/atoms/TextExtraBold';
import TextMedium from '../../../components/atoms/TextMedium';
import ButtonLarge from '../../../components/ButtonLarge';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KYCIntroScreen({navigation}){

    const {t} = useTranslation()

    const onGetStartedTap = () => {
        Alert.alert(t('kyc.important'),"To ensure a smooth process, please read the following reminders: \n\n - Prepare your valid id\n - Know your citizenship id number", 
        [{ 
            text:t('kyc.okGot'), 
            onPress: ()=> {
                navigation.navigate('KYCSelectID')
        }, }, 
        {text:t('kyc.cancel')}])
    }


    return(
        <>
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require('../../../images/logoTxt.png')} style={styles.logoTxt} />
                    <TextExtraBold style={styles.title}>{t('kyc.accountNotVer')}</TextExtraBold>
                    <TextMedium style={styles.desc}>{t('kyc.completeProf')}</TextMedium>
                    <Image source={require('../../../images/kycVerification.png')}  style={styles.kycImage} />
                </View>
            </View> 
              
             
            <View>
                <View style={styles.btnGetStarted}>
                    <ButtonLarge loader={false} title={t('kyc.getStarted')} onPress={onGetStartedTap} />
                </View> 
            </View>
        </SafeAreaView>

        </> 
    )
}   