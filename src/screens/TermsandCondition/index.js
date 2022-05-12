import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import { useDispatch } from 'react-redux'

import { CheckBox } from 'react-native-elements'
import { FIRST_LAUNCH } from '../../redux/constants';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import { useTranslation } from 'react-i18next';


var windowWidth = Dimensions.get('window').width;

{/* Fix for FLIGHT-46 */}
export default function TermsandCondition() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false);
    const {t} = useTranslation()

    function checkedFN() {

        setChecked(true)
        dispatch({ type: FIRST_LAUNCH, data: 1 })
        setTimeout(async () => {
            navigation.navigate('LoginScreen')
        }, 500);
    }

    return (
        <View style={styles.ScreenCss}>
            <ScrollView>

                <View style={[styles.monoBarSplash, { justifyContent: 'center', marginLeft: '0%', marginTop: (windowWidth * 7) / 100 }]}>
                    <Image
                        style={styles.monoImg}
                        resizeMode='stretch'
                        source={require('../../images/mono.png')}
                    />
                </View>

             
                <TextBold style={[styles.HeadingText, { alignSelf: 'center', marginTop: (windowWidth * 4) / 100 }]}>{t('common.termsConditions')}</TextBold>
                <View style={styles.termContainer}>

                    <TextMedium style={[styles.termText, { marginBottom: (windowWidth * 5) / 100 }]}>Lorem Ipsum is simply dummy text of the{"\n"}printing and typesetting industry. Lorem {"\n"}Ipsum has been the industry's standard{"\n"}dummy text ever since the 1500s, when an{"\n"}unknown printer took a galley of type and{"\n"}scrambled 
                    it to make a type specimen book.{"\n\n"}
It has survived not only five centuries, but{"\n"}also the leap into electronic typesetting,{"\n"}remaining essentially unchanged.{"\n"}{"\n"}
It was popularised in the 1960s with the{"\n"}release of Letraset sheets containing Lorem{"\n"}Ipsum passages, and more recently with{"\n"}desktop publishing software like Aldus PageMaker{"\n"}including versions of Lorem{"\n"}Ipsum.</TextMedium>
              
                </View>
            </ScrollView>

            <View style={styles.agreeTermContainer}>
                <CheckBox
                    checkedIcon={<Image source={require('../../images/checked.png')}
                        style={{ height: 25, width: 25, tintColor: '#ECB22E', borderRadius: 7 }}
                    />}
                    uncheckedIcon={<Image source={require('../../images/unchecked.png')}
                        style={{ height: 25, width: 25, tintColor: '#EFF1F5' }}
                    />}
                    checked={checked}
                    onPress={() => checkedFN()}
                />

                <Text ></Text>
                <TextBold style={[styles.termAgreeText, { marginTop: 17, marginLeft: -10 }]}>{t('common.iAgreeTerms')}</TextBold>
            </View>

        </View>
    );

}