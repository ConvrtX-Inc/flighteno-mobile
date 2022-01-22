import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import countries from '../../Utility/countries.json';
import TextExtraBold from '../../components/atoms/TextExtraBold';
import TextMedium from '../../components/atoms/TextMedium';

var countryName = 'Pakistan'
// const customData = require('../../Utility/countries.json');
export default function SplashScreen1() {

  const navigation = useNavigation();

  return (
    <View style={styles.ScreenCss}>
      <ScrollView>

        {/* Mono Bar */}
        <View style={styles.monoBarSplash}>
          <Image
            style={styles.monoImg}
            resizeMode='stretch'
            source={require('../../images/mono.png')}
          />

          <TouchableOpacity onPress={() => navigation.navigate("TermsandCondition")} style={styles.skipText}>
            <TextMedium style={styles.skipText}>Skip</TextMedium>
          </TouchableOpacity>
        </View>

        {/* Splash Text */}

        <View style={styles.splashTxtContainer}>
          {/* <Text style={styles.splashText}>Shop anything</Text> */}
        <TextExtraBold  style={styles.splashText}>Shop anything {"\n"}all over the{"\n"}world</TextExtraBold>
        </View>

        <View style={styles.nextImgContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SplashScreen2')}>
            <Image
              style={styles.nextImg}
              resizeMode='stretch'
              source={require('../../images/nextLevel.png')}
            />
          </TouchableOpacity>
        </View>




      </ScrollView>
      <Image
        style={styles.manImg}
        resizeMode='stretch'
        source={require('../../images/man.png')}
      />
    </View>
  );

}