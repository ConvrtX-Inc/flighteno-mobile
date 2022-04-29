import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBold from '../../../components/atoms/TextBold';
import ButtonLarge from '../../../components/ButtonLarge';
import ButtonPlain from '../../../components/ButtonPlain';
import InputText from '../../../components/InputText';
import { CreditCardInput } from "react-native-credit-card-input";
import { useTranslation } from 'react-i18next';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default function AddNewCardScreen() {


    const {t} = useTranslation()

    return (
        <SafeAreaView style={{marginLeft:18, marginRight:18}}>
            <ScrollView>
                <TextBold style={{fontSize:26, textAlign:'left'}}>{t('payment.addNewCard')}</TextBold>
                                                                                                                  
                <TextBold style={{marginTop:24, textAlign:'left'}}>{t('common.accountName')}</TextBold>
                <View style={{marginTop:8}}>
                    <InputText placeholder="Margarette Smith"/>
                </View>                                                                                                                                                                      
            

                <View style={{marginTop:16}}>
                    <TextBold style={{textAlign:'left'}}>{t('common.accountName')}</TextBold>
                    <View style={{marginTop:8}}>
                        <InputText placeholder="Bank of Canada"/>
                    </View>
                </View>


                <View style={{marginTop:16}}>
                    <TextBold style={{textAlign:'left'}}>{t('common.accountNum')}</TextBold>
                    <View style={{marginTop:8}}>
                        {/* <InputText/> */}
                       <InputText placeholder="7860 1230 4560 7890" />
                    </View>
                </View>

                <View style={{marginTop:16}}>
                    <TextBold style={{textAlign:'left'}}>{t('common.emailAddress')}</TextBold>
                    <View style={{marginTop:8}}>
                        <InputText placeholder="margarette_smith@gmail.com" />
                    </View>
                </View>

                <View style={{marginTop:16}}>
                    <TextBold style={{textAlign:'left'}}>{t('common.address')}</TextBold>
                    <View style={{marginTop:8}}>
                        <InputText placeholder="Ontario, Canada"/>
                    </View>
                </View>

                {/* <CreditCardInput /> */}

                <View style={{marginTop:16}}>
                    <View style={{marginTop:16}}>
                        <ButtonLarge title={t('common.addBankAccount')} />
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}