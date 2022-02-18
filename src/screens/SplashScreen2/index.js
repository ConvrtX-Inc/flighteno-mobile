import * as React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import { useTranslation } from 'react-i18next';


var windowWidth = Dimensions.get('window').width;
export default function SplashScreen2() {

  const navigation = useNavigation();
  const {t} = useTranslation()

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
            <TextMedium  style={styles.skipText}>{t('common.skip')}</TextMedium>
          </TouchableOpacity>
        </View>

        {/* Splash Text */}

        <View style={styles.splashTxtContainer}>
          <TextBold style={styles.splashText}>{t('splash.travelText')}</TextBold>
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