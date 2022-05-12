import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';



var windowWidth = Dimensions.get('window').width;
export default function ManualProductInfo({ route }) {

    const navigation = useNavigation();
    const { loading } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');


    return (
        <View style={styles.ScreenCss}>

            <ScrollView>

                <Image
                    style={styles.backImg}
                    resizeMode='stretch'
                    source={require('../../images/back.png')}
                />

                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Manual information</Text>


            </ScrollView>



        </View>
    );

}