import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Utility/Styles';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ProfileSelection } from '../../redux/actions/Auth';
import { CURRENT_PROFILE } from '../../redux/constants';

import { useDispatch, useSelector } from 'react-redux';
import TextBold from '../../components/atoms/TextBold';
import TextSemiBold from '../../components/atoms/TextSemiBold';
import { useTranslation } from 'react-i18next';

var windowWidth = Dimensions.get('window').width;

{/* Fix for FLIGHT-46 */}
export default function SelectProfile() {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { currentUser, token } = useSelector(({ authRed }) => authRed)
    const [greetings, setGreetings] = useState("")
    const {t} = useTranslation()

    useEffect(() => {
        var hours = moment().format('HH')
        if (hours >= 12 && hours <= 17) {
            setGreetings("Afternoon")
        }
        else if (hours >= 17) {
            setGreetings("Evening")
        }
        else {
            setGreetings("Morning")
        }
    }, []);

    const changeProfile = (status) => {
        if (status == 'buyer') {
            dispatch({ type: CURRENT_PROFILE, data: 'buyer' })
            navigation.navigate("BottomTab")
        }
        else {
            dispatch({ type: CURRENT_PROFILE, data: 'traveler' })
            navigation.navigate("BottomTab")
        }
        const obj = {
            admin_id: currentUser._id,
            profile_status: status
        }
        dispatch(ProfileSelection(obj, token))
    }

    return (
        <View style={styles.ScreenCss}>
            {currentUser ?
                <ScrollView>

                    <View style={styles.selectProfileHeader}>

                        <View style={styles.SelectProfileHeaderFirst}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.selectProfileByImg}
                                    resizeMode='stretch'
                                    source={require('../../images/clap.png')}
                                />
                                <TextBold style={styles.goodMorningTxt}> Good {greetings}</TextBold>
                            </View>
                            <TextBold style={styles.selectProfileH}>{t('common.selectProfile')}</TextBold>
                        </View>

                        <View style={styles.SelectProfileHeaderSecond}>
                            <Image
                                style={styles.selectProfileImg}
                                // resizeMode='stretch'
                                source={!currentUser.profile_image ? require('../../images/manProfile.png') : { uri: currentUser.profile_image }}
                            />
                        </View>

                    </View>


                    <TouchableOpacity onPress={() => changeProfile('buyer')}>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#BA2E5A', '#E01E82']}
                            style={[styles.buyerBGImg, { marginTop: (windowWidth * 10) / 100, }]}
                        >

                            <TextBold style={styles.buyerTxtTop}>{t('common.buyer')}</TextBold>
                            <TextSemiBold style={styles.buyerTxtBottom}>{t('common.buyerDesc')}</TextSemiBold>

                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.bagImgSmall}
                                    resizeMode='stretch'
                                    source={require('../../images/bagSmall.png')}
                                />
                                <Image
                                    style={styles.bagImgBig}
                                    resizeMode='stretch'
                                    source={require('../../images/bagBig.png')}
                                />
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => changeProfile('traveler')}>
                        <LinearGradient
                            colors={['#36C5F0', '#368CF0']}
                            style={[styles.buyerBGImg, { marginTop: (windowWidth * 10) / 100, marginBottom: 30, elevation: 0, }]}
                        >

                            <TextBold style={styles.buyerTxtTop}>{t('common.traveller')}</TextBold>
                            <TextSemiBold style={styles.buyerTxtBottom}>{t('common.travellerDesc')}</TextSemiBold>

                            <Image
                                style={styles.treeImg}
                                resizeMode='stretch'
                                source={require('../../images/traveller.png')}
                            />
                        </LinearGradient>

                    </TouchableOpacity>



                </ScrollView>
                : null}
        </View>
    );

}