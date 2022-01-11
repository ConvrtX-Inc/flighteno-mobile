import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
import { useSelector } from 'react-redux';
import { color } from '../Utility/Color';
import ButtonLarge from '../components/ButtonLarge';

var windowWidth = Dimensions.get('window').width;
export default function CongratulationSupport({ }) {

    const navigation = useNavigation();
    const { loading } = useSelector(({ authRed }) => authRed)

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("BottomTab", { screen: "Profile" })
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>

                <View style={[styles.monoBarSplash, { justifyContent: 'center', marginLeft: '0%', marginTop: (windowWidth * 20) / 100 }]}>
                    <Image
                        style={styles.monoImg}
                        resizeMode='stretch'
                        source={require('../images/mono.png')}
                    />
                </View>

                <View style={[styles.monoBarSplash, { justifyContent: 'center', marginLeft: '0%', marginTop: (windowWidth * 12) / 100 }]}>
                    <Image
                        style={{ height: 60, width: 120 }}
                        resizeMode='contain'
                        source={require('../images/supportSuccess.png')}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.HeadingText, { marginTop: (windowWidth * 6) / 100, marginLeft: '0%' }]}>Your message{'\n'}has been sent
                    </Text>

                </View>

                <Text style={[styles.termText, { fontSize: 16, color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'center', marginTop: 20 }]}>
                    Kindly check your email for our{'\n'}team’s response
                </Text>

            </ScrollView>
            <View style={{ marginBottom: 35}}>
                <ButtonLarge
                    title="Continue Shopping"
                    loader={loading}
                    onPress={() => navigation.navigate("BottomTab", { screen: "Profile" })}
                />
            </View>
        </View>
    );

}