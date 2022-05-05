import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../Utility/Styles';
import ButtonLarge from '../../components/ButtonLarge';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ConfigureStripeAccount, GetUserStipeAccountDetail } from '../../redux/actions/Payment';
import { addCustomerDetails } from '../../services/Stripe/Customer';
import { UPDATE_CUSTOMER_ID } from '../../redux/constants';
import TextBold from '../../components/atoms/TextBold';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

function SetupStripe({ route }) {
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const {t} = useTranslation()
    // useFocusEffect(
    //     React.useCallback(() => {
    //         var data = {
    //             admin_id: currentUser._id
    //         }
    //         dispatch(GetUserStipeAccountDetail(data, token))
    //         return () => {
    //         };
    //     }, [])
    // );

//    async function configureStripeAccount() {
//         var obj = {
//             admin_id: currentUser._id,
//         }

//          //create customer if no customer found on stripe
//          const addCustomerDetailsRes = await addCustomerDetails(currentUser._id);

//          if (addCustomerDetailsRes.customer) {
//              const user = currentUser;
//              user.customer_id = addCustomerDetailsRes.customer;

//              dispatch({ type: UPDATE_CUSTOMER_ID, data: user });

//           }
        
//         dispatch(ConfigureStripeAccount(obj, token, navigation,currentUser))
//     }

    return (
        <SafeAreaView style={{marginLeft:18, marginRight:18}} >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backImg}
                            resizeMode='stretch'
                            source={require('../../images/back.png')}
                        />
                    </TouchableOpacity>
            <View style={{ width: '100%', alignSelf: 'center', marginTop: 40, }}>
                <TextBold style={{ color: '#000', fontSize: 20, lineHeight: 25, textAlign:'left' }}>{t('common.flightenoPartners')}.</TextBold>
            </View>
            <View style={{ marginVertical: 30  }}>
                {currentUser.conected_account_id ?
                    <Text style={{ marginLeft: 20, fontSize: 18, color: '#000', textAlign:'left' }}>{t('common.setupNow')}!</Text>
                    :
                    <ButtonLarge
                        title={t('common.setupNow')}
                        loader={loading}
                        onPress={() =>{navigation.replace("CreateStripeAccount")}}
                    />
                }
            </View>
        
        </SafeAreaView>
    );
}

export default SetupStripe;