import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Utility/Styles';
var windowWidth = Dimensions.get('window').width;
import { useSelector, useDispatch } from 'react-redux'

export default function Settings() {
    const navigation = useNavigation();
    const { currentProfile, currentUser, token } = useSelector(({ authRed }) => authRed)

    return (
        <View style={styles.ScreenCss}>

            <ScrollView>
                {console.log(currentUser.signup_source)}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backImg}
                        resizeMode='stretch'
                        source={require('../images/back.png')}
                    />
                </TouchableOpacity>

                <Text style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>Settings</Text>
                <View style={{ height: 30 }} />
                {currentUser.signup_source
                    ? null
                    :
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={styles.menuItem}>
                            <Image source={require('../images/person.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.menuItemText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={styles.menuItem}>
                            <Image source={require('../images/setting.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.menuItemText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                }
                {currentProfile == 'traveler' ?
                    <TouchableOpacity onPress={() => navigation.navigate("SetupStripe")} style={styles.menuItem}>
                        <Image source={require('../images/payment.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.menuItemText}>Payment</Text>
                    </TouchableOpacity>
                    : null}
                <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={styles.menuItem}>
                    <Image source={require('../images/notification.png')}
                        style={styles.menuIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.menuItemText}>Notifications</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );

}