import * as React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';


var windowWidth = Dimensions.get('window').width;
export default function SplashScreen2() {

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
          <Text style={styles.splashText}>Travel with</Text>
          <Text style={styles.splashText}>Flighteno</Text>
          <Text style={styles.splashText}>and Earn</Text>
        </View>

        <View style={styles.nextImgContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("TermsandCondition")}>
            <Image
              style={styles.nextImg}
              resizeMode='stretch'
              source={require('../../images/nextLevel.png')}
            />
          </TouchableOpacity>
        </View>




      </ScrollView>
      <Image
        style={[styles.manImg, { width: windowWidth, height: windowWidth }]}
        resizeMode='stretch'
        source={require('../../images/second.png')}
      />
    </View>
  );

}