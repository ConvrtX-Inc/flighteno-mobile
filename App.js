import * as React from 'react';
import { View, Text, LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './src/navigation/index.js';
import Toast from 'react-native-toast-message';
import { color } from './src/Utility/Color.js';

import { Provider } from 'react-redux';
import configureStore from './src/redux/store/index'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18next from 'i18next'
import common_en from './src/translation/en/common.json'
import { lightTheme } from './src/lightTheme.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import linking from './src/navigation/linking.js';
LogBox.ignoreLogs(['Reanimated 2', 'VirtualizedLists should never be nested']);
// i18next.init({
//   lng: 'en', // if you're using a language detector, do not define the lng option
//   debug: true,
//   resources: {
//     en: {
//       common: common_en
//     }
//   }
// });

const Stack = createStackNavigator();


const { store, persistor } = configureStore();

// const toastConfig = {
//   success: ({ text1, props, ...rest }) => (
//     <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
//       <Text>{text1}</Text>
//       <Text>{props.guid}</Text>
//     </View>
//   ),
//   // error: () => { },
//   // info: () => { },
//   // any_custom_type: () => { }
// };

function App() {

  const {i18n} = useTranslation()

  React.useEffect(() => {
    getCurrentLang()
  },[])

  const getCurrentLang = async () => {
    try {
      const value = await AsyncStorage.getItem('language')
      if(value !== null) {
        // value previously stored
       i18n.changeLanguage(value)

      }
    } catch(e) {
      // error reading value
    }
  }

  return (
    <Provider store={store} >
      <I18nextProvider i18n={i18next}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={lightTheme} linking={linking}>
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor={color.backgroundColor} translucent={false} />
            <Navigation />
            <Toast position="bottom" ref={(ref) => Toast.setRef(ref)} />
            {/* <Toast position="bottom" config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}
          </NavigationContainer>
        </PersistGate>
      </I18nextProvider>
    </Provider>
  );
}

export default App;