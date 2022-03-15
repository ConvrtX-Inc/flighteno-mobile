import * as React from 'react';
import { Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTravel from '../MyTravel';
import OrderDestination from '../OrderDestination';
import { color } from '../../../Utility/Color';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

export default function TopTabTraveller() {

    const {t} = useTranslation()

    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 22, textAlign: 'left',textTransform: 'none', fontFamily:Platform.OS == 'ios' ? 'Gilroy-Bold' : 'GilroyBold' },
                style: { backgroundColor: '#fff',  },
                indicatorStyle: {
                    backgroundColor: '#E12082',
                },
                inactiveTintColor:color.grayText,
                activeTintColor: '#E12082'
            }}
        >
            <Tab.Screen name={t('travelHome.myTravel')} component={MyTravel} />
            <Tab.Screen name={t('travelHome.ordersDestination')} component={OrderDestination} />
        </Tab.Navigator>

    );
}