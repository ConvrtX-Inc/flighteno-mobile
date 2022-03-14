import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, ScrollView, Share } from 'react-native';
import { color } from '../Utility/Color';
import { useNavigation } from '@react-navigation/native'
import { styles } from '../Utility/Styles'
import { AirbnbRating } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { ProfileSelection, Logout } from '../redux/actions/Auth'
import { CURRENT_PROFILE } from '../redux/constants'
import TextBold from '../components/atoms/TextBold';
import TextMedium from '../components/atoms/TextMedium';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

function Profile() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [userRating, setUserRating] = useState('4.0')
    const { currentProfile, currentUser, token } = useSelector(({ authRed }) => authRed)
    const {t} = useTranslation()



    const onShare = async () => {

        //fix for flight-17
        try {
            let url = 'www.flighteno.com/register/refer-friend/s5d65sag3/register.php'
            const result = await Share.share({
                title: 'Download Flighteno Now!\n\n',
                message: 'Hi, Friend. Register now at Flighteno here is the app link ' + url,
                url: url
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const changeProfile = () => {
        if (currentProfile == 'buyer') {
            dispatch({ type: CURRENT_PROFILE, data: 'traveler' })
            const obj = {
                admin_id: currentUser._id,
                profile_status: 'traveler'
            }
            dispatch(ProfileSelection(obj, token))
        }
        else {
            dispatch({ type: CURRENT_PROFILE, data: 'buyer' })
            const obj = {
                admin_id: currentUser._id,
                profile_status: 'buyer'
            }
            dispatch(ProfileSelection(obj, token))
        }

    }

    const logout = () => {
        dispatch(Logout())
    }
    return (
        <SafeAreaView style={{flex:1}}>
  <View style={styles.ScreenCss}>
            {currentUser ?
                <ScrollView>
                    {currentUser ?
                        <Image
                            style={[styles.homeProfileImg, { marginLeft: 0, alignSelf: 'center', marginTop: 20, borderRadius: 30 }]}
                            source={!currentUser.profile_image ? require('../images/manProfile.png') : { uri: currentUser.profile_image }}
                        />
                        : null}
                    {currentUser ?
                        <View style={Styles.topView}>
                            <View style={{ width: '85%' }}>
                                <TextBold style={[Styles.firstName, {textAlign:'left'}]}>{t('common.hello')}, {currentUser ? currentUser?.full_name?.split(" ")[0] : null}</TextBold>
                                <TextBold style={Styles.fullName}>{currentUser ? currentUser?.full_name : null}</TextBold>
                                {currentProfile != "buyer" && currentUser ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextBold style={styles.ratingText}>{currentUser.rating ? parseFloat(currentUser.rating.toFixed(1)) : 0} out of 5</TextBold>
                                        <AirbnbRating
                                            defaultRating={currentUser.rating ? parseFloat(currentUser.rating.toFixed(1)) : 0}
                                            type='star'
                                            ratingCount={5}
                                            size={15}
                                            showRating={false}
                                            isDisabled={true}

                                        />
                                    </View>
                                    : null}
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                                <Image source={require('../images/setting.png')}
                                    style={styles.menuIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        : null}
                    <TouchableOpacity onPress={() => navigation.navigate("BottomTab", { screen: "Track" })} style={styles.menuItem}>
                        <Image source={require('../images/myOrders.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <TextMedium style={styles.menuItemText}>{t('common.myOrders')}</TextMedium>
                    </TouchableOpacity>
                    {currentProfile != "buyer" ?
                        <TouchableOpacity onPress={() => navigation.navigate("BottomTab", { screen: "Track" })} style={styles.menuItem}>
                            <Image source={require('../images/switchUser.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <TextMedium style={styles.menuItemText}>{t('common.ordersByFlight')}</TextMedium>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} style={styles.menuItem}>
                        <Image source={require('../images/messages.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <TextMedium style={styles.menuItemText}>{t('common.messages')}</TextMedium>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onShare} style={styles.menuItem}>
                        <Image source={require('../images/inviteFriends.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <TextMedium style={styles.menuItemText}>{t('common.inviteFriends')}</TextMedium>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SupportTicket")} style={styles.menuItem}>
                        <Image source={require('../images/support.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <TextMedium style={styles.menuItemText}>{t('common.support')}</TextMedium>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate("KYCIntro")
                }}>
                    <Image source={require('../images/accountVerify.png')}
                        style={styles.menuIcon}
                        resizeMode="contain"
                    />
                    <TextMedium style={styles.menuItemText}>{t('common.accountVerify')}</TextMedium>
                </TouchableOpacity>
                    {currentProfile != "buyer" ?
                        <TouchableOpacity onPress={() => navigation.navigate("MyReviews")} style={styles.menuItem}>
                            <Image source={require('../images/review.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <TextMedium style={styles.menuItemText}>{t('common.myReviews')}</TextMedium>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity onPress={() => changeProfile()} style={styles.menuItem}>
                        <Image source={currentProfile == "buyer" ? require('../images/switchUser.png') : require('../images/buyer.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <TextMedium style={styles.menuItemText}>{t('common.switchTo')} {currentProfile == "buyer" ? t('common.traveller') : t('common.buyer') }</TextMedium>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logout()} style={styles.menuItem}>
                        <Image source={require('../images/logout.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <TextMedium style={styles.menuItemText}>{t('common.logout')}</TextMedium>
                    </TouchableOpacity>
                </ScrollView>
                : null}
        </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    topView: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: color.inputBackColor,
        borderRadius: 16,
        paddingHorizontal: '5%',
        paddingVertical: 30,
        marginTop: -15,
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    firstName: {
        fontSize: 16,
        color: color.userNameHomeColor
    },
    fullName: {
        fontSize: 22,
        marginVertical: 5
    },

})

export default Profile;