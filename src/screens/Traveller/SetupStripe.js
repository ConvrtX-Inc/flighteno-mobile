import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../Utility/Styles';
import ButtonLarge from '../../components/ButtonLarge';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ConfigureStripeAccount, GetUserStipeAccountDetail } from '../../redux/actions/Payment';

function SetupStripe({ route }) {
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);

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

    function configureStripeAccount() {
        var obj = {
            admin_id: currentUser._id,
        }
        
        dispatch(ConfigureStripeAccount(obj, token, navigation))
    }

    return (
        <View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 50, }}>
                <Text style={{ color: '#000', fontSize: 20, lineHeight: 25 }}>
                    Flighteno partners with Stripe for secure payments and financial services. In order to start getting paid, you need to set up a Stripe account.
                </Text>
            </View>
            <View style={{ marginVertical: 30 }}>
                {currentUser.conected_account_id ?
                    <Text style={{ marginLeft: 20, fontSize: 18, color: '#000' }}>You're all set!</Text>
                    :
                    <ButtonLarge
                        title="Setup Now!"
                        loader={isLoading}
                        onPress={() => configureStripeAccount()}
                    />
                }
            </View>
        </View>
    );
}

export default SetupStripe;