import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import { useDispatch } from 'react-redux'

import { CheckBox } from 'react-native-elements'
import { FIRST_LAUNCH } from '../../redux/constants';


var windowWidth = Dimensions.get('window').width;
export default function TermsandCondition() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false);

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

                <Text style={[styles.HeadingText, { alignSelf: 'center', marginTop: (windowWidth * 4) / 100 }]}>Terms and Conditions</Text>

                <View style={styles.termContainer}>

                    <Text style={[styles.termText, { marginBottom: (windowWidth * 5) / 100 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>

                    <Text style={[styles.termText, { marginBottom: (windowWidth * 5) / 100 }]}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>

                    <Text style={styles.termText}> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

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

                <Text style={[styles.termAgreeText, { marginTop: 17, marginLeft: -10 }]}>I agree with Terms & Conditions</Text>
            </View>

        </View>
    );

}