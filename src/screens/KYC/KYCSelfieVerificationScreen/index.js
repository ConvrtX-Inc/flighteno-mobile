import { use } from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';
import ButtonLarge from '../../../components/ButtonLarge';
import StepsIndicator from '../../../components/StepsIndicator';
import { styles } from './styles';

export default function KYCSelfieVerificationScreen ({navigation, route}){

    const { kyc } = route.params

    const {t} = useTranslation()


    const onNextTap = () => {
        navigation.navigate('KYCSelfieVerificationCamera', { kyc: kyc })
    }

    return(
        <>
            
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextBold style={[styles.titleTxt, {textAlign:'left'}]}>{t('kyc.selfieVer')}</TextBold>

                    <View  style={styles.stepsIndicator}>
                        <StepsIndicator currentPosition={2}/>
                    </View>

                    <TextBold style={[styles.titleTxt,  {textAlign:'left'}]}>{t('kyc.prepareToScan')}</TextBold>
                    <TextMedium style={[styles.desc,  {textAlign:'center'}]}>{t('kyc.scanInstruct')}</TextMedium>

                    <Image source={require('../../../images/selfieVerification.png')} style={styles.accountVerImg}/>  
                </View>
            </View>
               
              

            <View style={styles.btnSubmit}>
                <ButtonLarge title={t('kyc.next')} loader={false} onPress={onNextTap}/>
            </View>              
           
        </>
     
    )
}