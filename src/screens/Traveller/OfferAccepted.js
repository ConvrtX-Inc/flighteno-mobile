import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import { useSelector } from 'react-redux';
import { color } from '../../Utility/Color';
import ButtonTraveller from '../../components/ButtonTraveller';

var windowWidth = Dimensions.get('window').width;
export default function OfferAccepted({ }) {

    const navigation = useNavigation();
    const { loading } = useSelector(({ authRed }) => authRed)

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("BottomTab", { screen: "Home" })
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={[styles.ScreenCss, { alignItems: 'center', justifyContent: 'center' }]}>

            <View style={[styles.monoBarSplash, { justifyContent: 'center', marginLeft: '0%', marginTop: (windowWidth * 12) / 100 }]}>
                <Image
                    style={{ height: 60, width: 120 }}
                    resizeMode='contain'
                    source={require('../../images/offerAccepted.png')}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 6) / 100, marginLeft: '0%' }]}>Your offer has{'\n'}been accepted
                </Text>

            </View>

            <Text style={[styles.termText, { fontSize: 14, lineHeight: 19, fontWeight: 'bold', color: color.countrtTextColor, opacity: 10, marginHorizontal: '5%', textAlign: 'center', marginTop: 20 }]}>
                Do not forget to upload picture of{'\n'}product, and product image once you{'\n'}already have the item
            </Text>
            <View style={{ height: 40 }} />
            <ButtonTraveller
                title="Place a new delivery offer"
                loader={loading}
                onPress={() => navigation.navigate("BottomTab", { screen: "Home" })}
            />

        </View>
    );

}