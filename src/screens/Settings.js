import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
var windowWidth = Dimensions.get('window').width;
import { useSelector, useDispatch } from 'react-redux'
import TextBold from '../components/atoms/TextBold';
import TextMedium from '../components/atoms/TextMedium';
import { useTranslation } from 'react-i18next';

export default function Settings() {
    const navigation = useNavigation();
    const { currentProfile, currentUser, token } = useSelector(({ authRed }) => authRed)
    const {t} = useTranslation()

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>
               
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../images/back.png')}
                    />
                </TouchableOpacity>

                <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>{t('common.settings')}</TextBold>
                <View style={{ height: 30 }} />
             
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={styles.menuItem}>
                            <Image source={require('../images/person.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <TextMedium style={styles.menuItemText}>{t('common.profile')}</TextMedium>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={styles.menuItem}>
                            <Image source={require('../images/setting.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <TextMedium style={styles.menuItemText}>{t('common.changePass')}</TextMedium>
                        </TouchableOpacity>
                    </View>
                
               
                    <TouchableOpacity onPress={() => navigation.navigate("SetupStripe")} style={styles.menuItem}>
                        <Image source={require('../images/payment.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <TextMedium style={styles.menuItemText}>{t('common.payment')}</TextMedium>
                    </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={styles.menuItem}>
                    <Image source={require('../images/notification.png')}
                        style={styles.menuIcon}
                        resizeMode="contain"
                    />
                    <TextMedium style={styles.menuItemText}>{t('common.notifications')}</TextMedium>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image source={require('../images/notification.png')}
                        style={styles.menuIcon}
                        resizeMode="contain"
                    />
                    <TextMedium style={styles.menuItemText}>{t('common.changeLanguage')}</TextMedium>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );

}