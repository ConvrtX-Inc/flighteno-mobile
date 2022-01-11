import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import countries from '../../Utility/countries.json';

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
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Splash Text */}

        <View style={styles.splashTxtContainer}>
          <Text style={styles.splashText}>Shop anything</Text>
          <Text style={styles.splashText}>all over the</Text>
          <Text style={styles.splashText}>world</Text>
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