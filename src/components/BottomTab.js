import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Buyer/HomeScreen'
import Profile from '../screens/Profile';
import { color } from '../Utility/Color';
import { styles } from '../Utility/Styles'
import MyTripTab from '../screens/Traveller/MyTripTab'
import OrderDetailT from '../screens/Traveller/OrderDetailT';
import OfferPrice from '../screens/Traveller/OfferPrice';
import { useSelector } from 'react-redux'
import MyOrdersList from '../screens/Buyer/MyOrdersList';
import OrderDetails from '../screens/Buyer/OrderDetails';
import Transactions from '../screens/Buyer/Transactions';
import OrdersByFlight from '../screens/Traveller/OrdersByFlight';
import AllOrders from '../screens/Traveller/AllOrders';
import OrdersSpecificCountry from '../screens/Traveller/OrdersSpecificCountry';
import PendingOrderDetailT from '../screens/Traveller/PendingOrderDetailT';
import ChatScreen from '../screens/Buyer/ChatScreen';

const Stack = createStackNavigator();

function NestedStack() {
    return (
        <Stack.Navigator
            initialRouteName="MyTripTab"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MyTripTab" component={MyTripTab} />
            <Stack.Screen name="OrderDetailT" component={OrderDetailT} />
            <Stack.Screen name="OfferPrice" component={OfferPrice} />
        </Stack.Navigator>
    )
}

function PendingOrdersStack() {
    return (
        <Stack.Navigator
            initialRouteName="Transactions"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Transactions" component={Transactions} />
            <Stack.Screen name="MyOrdersList" component={MyOrdersList} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
    )
}

function TravelerStack() {
    return (
        <Stack.Navigator
            initialRouteName="OrdersByFlight"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="OrdersByFlight" component={OrdersByFlight} />
            <Stack.Screen name="AllOrders" component={AllOrders} />
            <Stack.Screen name="OrdersSpecificCountry" component={OrdersSpecificCountry} />
            <Stack.Screen name="PendingOrderDetailT" component={PendingOrderDetailT} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const BottomTab = ({ route }) => {
    const { currentProfile } = useSelector(({ authRed }) => authRed)
    
    return (
        <Tab.Navigator
            // initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: color.blueColor,
                labelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                style: {
                    padding: 5
                    // borderTopLeftRadius: 15,
                    // borderTopRightRadius: 15,
                    // position: 'absolute'
                },
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={currentProfile == "buyer" ? HomeScreen : NestedStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            style={[Styles.iconStyle, { tintColor: color }]}
                            resizeMode='contain'
                            source={require('../images/homeFlighteno.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={"Messages"}
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            style={[Styles.iconStyle, { tintColor: color }]}
                            resizeMode='contain'
                            source={require('../images/messages.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Track"
                component={currentProfile == "buyer" ? PendingOrdersStack : TravelerStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            style={[Styles.iconStyle, { tintColor: color }]}
                            resizeMode='contain'
                            source={require('../images/truckcrop.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            style={[Styles.iconStyle, { tintColor: color }]}
                            resizeMode='contain'
                            source={require('../images/profile.png')}
                        />
                    ),
                    tabBarVisible: false
                }}
            />
        </Tab.Navigator>
    );
}

const Styles = StyleSheet.create({
    bottom: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 70,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 20
    },
    bottomBox: {
        width: '25%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        height: 25, width: 25
    },
    txtStyle: {
        fontSize: 11,
    }

})

export default BottomTab;