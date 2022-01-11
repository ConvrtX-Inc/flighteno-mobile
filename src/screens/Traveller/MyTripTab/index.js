import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../Utility/Styles';
import { useSelector } from 'react-redux';

import TopTabTraveller from '../TopTabTraveller';

export default function MyTripTab() {
    const { currentUser } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation();

    return (
        <View style={styles.ScreenCss}>
            {/* <ScrollView> */}
            {/* <View style={styles.selectProfileHeader}> */}
            {/* <View style={[styles.SelectProfileHeaderFirst, { flexDirection: 'row' }]}>
                        <TouchableOpacity disabled={true}>
                            <Image
                                style={[styles.menueImg, { tintColor: null }]}
                                resizeMode='stretch'
                                source={require('../../../images/menu.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.SelectProfileHeaderSecond}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Profile')}}>
                            <Image
                                style={styles.homeProfileImg}
                                source={require('../../../images/manProfile.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View> */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: '5%', marginTop: 15, marginBottom: 10 }}>Let’s Post your flight</Text>
                {currentUser ?
                    <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                        <Image
                            style={[styles.homeProfileImg, { margin: 15 }]}
                            source={!currentUser.profile_image ? require('../../../images/manProfile.png') : { uri: currentUser.profile_image }}
                        />
                    </TouchableOpacity>
                    : null}
            </View>
            <TopTabTraveller />
            {/* </ScrollView> */}
        </View>
    );
}