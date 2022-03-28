import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../Utility/Styles';
import ButtonLarge from '../../components/ButtonLarge';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ConfigureStripeAccount, GetUserStipeAccountDetail } from '../../redux/actions/Payment';
import { addCustomerDetails } from '../../services/Stripe/Customer';
import { UPDATE_CUSTOMER_ID } from '../../redux/constants';

function SetupStripe({ route }) {
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            var data = {
                admin_id: currentUser._id
            }
            dispatch(GetUserStipeAccountDetail(data, token))
            return () => {
            };
        }, [])
    );

   async function configureStripeAccount() {
        var obj = {
            admin_id: currentUser._id,
        }

         //create customer if no customer found on stripe
         const addCustomerDetailsRes = await addCustomerDetails(currentUser._id);

         if (addCustomerDetailsRes.customer) {
             const user = currentUser;
             user.customer_id = addCustomerDetailsRes.customer;

            

             dispatch({ type: UPDATE_CUSTOMER_ID, data: user });

          }
        
        dispatch(ConfigureStripeAccount(obj, token, navigation,currentUser))
    }

    return (
        <View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 50, }}>
                <Text style={{ color: '#000', fontSize: 20, lineHeight: 25 }}>
                    Flighteno partners with Stripe for secure payments and financial services. In order to start getting paid, you need to set up a Stripe account.
                </Text>
            </View>
            <View style={{ marginVertical: 30  , margin: 12}}>
                {currentUser.conected_account_id ?
                    <Text style={{ marginLeft: 20, fontSize: 18, color: '#000' }}>You're all set!</Text>
                    :
                    <ButtonLarge
                        title="Setup Now!"
                        loader={loading}
                        onPress={() => configureStripeAccount()}
                    />
                }
            </View>
            <Text style={{ color: '#000', fontSize: 16, lineHeight: 25 ,textAlign:'center'}}>
                    You'll be redirected to Stripe
                </Text>
        </View>
    );
}

export default SetupStripe;