import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTravel from '../MyTravel';
import OrderDestination from '../OrderDestination';
import { color } from '../../../Utility/Color';

const Tab = createMaterialTopTabNavigator();

export default function TopTabTraveller() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 22, textAlign: 'left',textTransform: 'none', fontFamily:'GilroyBold' },
                style: { backgroundColor: '#fff',  },
                indicatorStyle: {
                    backgroundColor: '#E12082',
                },
                inactiveTintColor:color.grayText,
                activeTintColor: '#E12082'
            }}
        >
            <Tab.Screen name="My Travel" component={MyTravel} />
            <Tab.Screen name="Orders to your Destination" component={OrderDestination} />
        </Tab.Navigator>

    );
}