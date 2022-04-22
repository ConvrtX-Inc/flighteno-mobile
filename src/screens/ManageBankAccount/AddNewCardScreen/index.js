import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBold from '../../../components/atoms/TextBold';
import ButtonLarge from '../../../components/ButtonLarge';
import ButtonPlain from '../../../components/ButtonPlain';
import InputText from '../../../components/InputText';

export default function AddNewCardScreen() {
    return (
        <SafeAreaView style={{marginLeft:18, marginRight:18}}>
            <ScrollView>
                <TextBold style={{fontSize:26}}>Add New Card</TextBold>

                <TextBold style={{marginTop:24}}>Account Name</TextBold>
                <View style={{marginTop:8}}>
                    <InputText placeholder="Margarette Smith"/>
                </View>
            

                <View style={{marginTop:16}}>
                    <TextBold>Bank Name</TextBold>
                    <View style={{marginTop:8}}>
                        <InputText placeholder="Bank of Canada"/>
                    </View>
                </View>

            
                <View style={{marginTop:16}}>
                    <TextBold>Account Number</TextBold>
                    <View style={{marginTop:8}}>
                        <InputText/>
                    </View>
                </View>

                <View style={{marginTop:16}}>
                    <TextBold>Email Address</TextBold>
                    <View style={{marginTop:8}}>
                        <InputText placeholder="margarette_smith@gmail.com" />
                    </View>
                </View>

                <View style={{marginTop:16}}>
                    <TextBold>Address</TextBold>
                    <View style={{marginTop:8}}>
                        <InputText placeholder="Ontario, Canada"/>
                    </View>
                </View>

                <View style={{marginTop:16}}>
                    <View style={{marginTop:16}}>
                        <ButtonLarge title="Add Bank Account" />
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}