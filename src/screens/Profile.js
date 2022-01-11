import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, ScrollView, Share } from 'react-native';
import { color } from '../Utility/Color';
import { useNavigation } from '@react-navigation/native'
import { styles } from '../Utility/Styles'
import { AirbnbRating } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { ProfileSelection, Logout } from '../redux/actions/Auth'
import { CURRENT_PROFILE } from '../redux/constants'

function Profile() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [userRating, setUserRating] = useState('4.0')
    const { currentProfile, currentUser, token } = useSelector(({ authRed }) => authRed)

    const onShare = async () => {
        try {
            let url = 'https://www.google.com/'
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
                                <Text style={Styles.firstName}>Hello, {currentUser ? currentUser.full_name.split(" ")[0] : null}</Text>
                                <Text style={Styles.fullName}>{currentUser ? currentUser.full_name : null}</Text>
                                {currentProfile != "buyer" && currentUser ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.ratingText}>{currentUser.rating ? parseFloat(currentUser.rating.toFixed(1)) : 0} out of 5</Text>
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
                        <Text style={styles.menuItemText}>My orders</Text>
                    </TouchableOpacity>
                    {currentProfile != "buyer" ?
                        <TouchableOpacity onPress={() => navigation.navigate("BottomTab", { screen: "Track" })} style={styles.menuItem}>
                            <Image source={require('../images/switchUser.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.menuItemText}>Orders By Flight</Text>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} style={styles.menuItem}>
                        <Image source={require('../images/messages.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.menuItemText}>Messages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onShare} style={styles.menuItem}>
                        <Image source={require('../images/inviteFriends.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.menuItemText}>Invite Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SupportTicket")} style={styles.menuItem}>
                        <Image source={require('../images/support.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.menuItemText}>Support</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.menuItem}>
                    <Image source={require('../images/accountVerify.png')}
                        style={styles.menuIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.menuItemText}>Account Verification</Text>
                </TouchableOpacity> */}
                    {currentProfile != "buyer" ?
                        <TouchableOpacity onPress={() => navigation.navigate("MyReviews")} style={styles.menuItem}>
                            <Image source={require('../images/review.png')}
                                style={styles.menuIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.menuItemText}>My Reviews</Text>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity onPress={() => changeProfile()} style={styles.menuItem}>
                        <Image source={currentProfile == "buyer" ? require('../images/switchUser.png') : require('../images/buyer.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.menuItemText}>Switch To {currentProfile == "buyer" ? 'Traveler' : 'Buyer'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logout()} style={styles.menuItem}>
                        <Image source={require('../images/logout.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.menuItemText}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
                : null}
        </View>
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
        fontWeight: 'bold',
        color: color.userNameHomeColor
    },
    fullName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 5
    },

})

export default Profile;