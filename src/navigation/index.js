import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'
import { CURRENT_COUNTRY } from '../redux/constants';

import SplashScreen1 from "../screens/SplashScreen1";
import SplashScreen2 from "../screens/SplashScreen2";
import TermsandCondition from '../screens/TermsandCondition';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyPhone from '../screens/VerifyPhone';
import ResetPassword from '../screens/ResetPassword';
import VerifyCode from '../screens/VerifyCode';
import NewPassword from '../screens/NewPassword';
import SelectProfile from '../screens/SelectProfile';
import HomeScreen from '../screens/Buyer/HomeScreen';
import ManualProductInfo from '../screens/Buyer/ManualProductInfo';
import OrderDetail from '../screens/Buyer/OrderDetail';
import SelectCountry from '../screens/Buyer/SelectCountry';
import Congratulation from '../screens/Buyer/Congratulation';
import TopTabTraveller from '../screens/Traveller/TopTabTraveller';
import MyTravel from '../screens/Traveller/MyTravel';
import UrlData from '../screens/Buyer/UrlData';
import OrderDestination from '../screens/Traveller/OrderDestination';
import ChatTraveler from '../screens/Traveller/ChatTraveler';
import ChatScreen from '../screens/Buyer/ChatScreen';
import BottomTab from '../components/BottomTab';
import Settings from '../screens/Settings';
import EditProfile from '../screens/EditProfile';
import Support from '../screens/Support';
import Notifications from '../screens/Notifications';
import Transactions from '../screens/Buyer/Transactions';
import MyOrdersList from '../screens/Buyer/MyOrdersList';
import OrderDetails from '../screens/Buyer/OrderDetails'
import PlainReceipt from '../screens/Buyer/PlainReceipt';
import RateTransaction from '../screens/Buyer/RateTransactions';
import TravelerProfile from '../screens/Buyer/TravelerProfile';
import EditOffer from '../screens/Traveller/EditOffer';
import SetupStripe from '../screens/Traveller/SetupStripe';
import StripeWebView from '../screens/Traveller/StripeWebView';
import CongratulationSupport from '../screens/CongratulationSupport';
import MyReviews from '../screens/Traveller/MyReviews';
import OfferAccepted from '../screens/Traveller/OfferAccepted'
import TrendingOrderDetail from '../screens/Buyer/TrendingOrderDetail';
import ChangePassword from '../screens/ChangePassword';
import OrderDetailBaseOnOrderId from '../screens/OrderDetailBaseOnOrderId';
import SupportTicket from '../screens/SupportTicket';
import SupportReply from '../screens/SupportReply';
import KYCIntroScreen from '../screens/KYC/KYCIntroScreen';
import SelectIDScreen from '../screens/KYC/SelectIDScreen';
import KYCFillOutScreen from '../screens/KYC/KYCFillOutScreen';
import KYCSelfieVerificationScreen from '../screens/KYC/KYCSelfieVerificationScreen';
import KYCTermsPrivacyScreen from '../screens/KYC/KYCTermsPrivacyScreen';
// https://extreme-ip-lookup.com/json/
// https://geolocation-db.com/json/


const Stack = createStackNavigator();
function Navigation() {
    const dispatch = useDispatch()
    React.useEffect(() => {
        fetch('https://ip-api.io/json')
            .then(res => res.json())
            .then(response => {
                dispatch({ type: CURRENT_COUNTRY, data: response })
            })
            .catch((data, status) => {
                console.log('Request failed:', data);
            });
    }, [])
    const { currentUser, currentProfile, token, firstLaunch } = useSelector(({ authRed }) => authRed)
    return (
        <Stack.Navigator initialRouteName='KYCIntro'>
            <Stack.Screen name="KYCIntro" component={KYCIntroScreen}/>
            <Stack.Screen name="KYCSelectID" component={SelectIDScreen}/>
            <Stack.Screen name='KYCFillOut' component={KYCFillOutScreen} />
            <Stack.Screen name='KYCSendVerification' component={KYCSelfieVerificationScreen} />
            <Stack.Screen name='KYCTermsPrivacy' component={KYCTermsPrivacyScreen} />
        </Stack.Navigator>
        // currentUser ?
        //     <Stack.Navigator
        //         initialRouteName={currentProfile ? "BottomTab" : "SelectProfile"}
        //         screenOptions={{
        //             headerShown: false
        //         }}
        //     >
        //         <Stack.Screen name="SelectProfile" component={SelectProfile} />
        //         <Stack.Screen name="BottomTab" component={BottomTab} />
        //         <Stack.Screen name="HomeScreen" component={HomeScreen} />
        //         <Stack.Screen name="ManualProductInfo" component={ManualProductInfo} />
        //         <Stack.Screen name="OrderDetail" component={OrderDetail} />
        //         <Stack.Screen name="SelectCountry" component={SelectCountry} />
        //         <Stack.Screen name="Congratulation" component={Congratulation} />
        //         <Stack.Screen name="TopTabTraveller" component={TopTabTraveller} />
        //         <Stack.Screen name="MyTravel" component={MyTravel} />
        //         <Stack.Screen name="UrlData" component={UrlData} />
        //         <Stack.Screen name="OrderDestination" component={OrderDestination} />
        //         <Stack.Screen name="ChatTraveler" component={ChatTraveler} />
        //         <Stack.Screen name="ChatScreen" component={ChatScreen} />
        //         <Stack.Screen name="Settings" component={Settings} />
        //         <Stack.Screen name="EditProfile" component={EditProfile} />
        //         <Stack.Screen name="Support" component={Support} />
        //         <Stack.Screen name="Notifications" component={Notifications} />
        //         <Stack.Screen name="Transactions" component={Transactions} />
        //         <Stack.Screen name="MyOrdersList" component={MyOrdersList} />
        //         <Stack.Screen name="OrderDetails" component={OrderDetails} />
        //         <Stack.Screen name="PlainReceipt" component={PlainReceipt} />
        //         <Stack.Screen name="RateTransaction" component={RateTransaction} />
        //         <Stack.Screen name="TravelerProfile" component={TravelerProfile} />
        //         <Stack.Screen name="EditOffer" component={EditOffer} />
        //         <Stack.Screen name="SetupStripe" component={SetupStripe} />
        //         <Stack.Screen name="StripeWebView" component={StripeWebView} />
        //         <Stack.Screen name="CongratulationSupport" component={CongratulationSupport} />
        //         <Stack.Screen name="MyReviews" component={MyReviews} />
        //         <Stack.Screen name="OfferAccepted" component={OfferAccepted} />
        //         <Stack.Screen name="TrendingOrderDetail" component={TrendingOrderDetail} />
        //         <Stack.Screen name="ChangePassword" component={ChangePassword} />
        //         <Stack.Screen name="SupportTicket" component={SupportTicket} />
        //         <Stack.Screen name="OrderDetailBaseOnOrderId" component={OrderDetailBaseOnOrderId} />
        //         <Stack.Screen name="SupportReply" component={SupportReply} />
        //         <Stack.Screen name="KYCIntro" component={KYCIntroScreen}/>
        //         <Stack.Screen name="KYCSelectID" component={SelectIDScreen}/>
        //         <Stack.Screen name='KYCFillOut' component={KYCFillOutScreen} />
        //     </Stack.Navigator>
        //     :
        //     firstLaunch == 0
        //         ?
        //         <Stack.Navigator
        //             initialRouteName="SplashScreen1"
        //             screenOptions={{
        //                 headerShown: false
        //             }}
        //         >


        //             <Stack.Screen name="SplashScreen1" component={SplashScreen1} />
        //             <Stack.Screen name="SplashScreen2" component={SplashScreen2}
        //                 options={{
        //                     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        //                 }}
        //             />
        //             <Stack.Screen name="TermsandCondition" component={TermsandCondition}
        //                 options={{
        //                     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        //                 }}
        //             />
        //             <Stack.Screen name="LoginScreen" component={LoginScreen} />
        //             <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        //             <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
        //             <Stack.Screen name="ResetPassword" component={ResetPassword} />
        //             <Stack.Screen name="VerifyCode" component={VerifyCode} />
        //             <Stack.Screen name="NewPassword" component={NewPassword} />
        //             <Stack.Screen name="HomeScreen" component={HomeScreen} />
                   

        //         </Stack.Navigator>
        //         :
        //         <Stack.Navigator
        //             initialRouteName="LoginScreen"
        //             screenOptions={{
        //                 headerShown: false
        //             }}
        //         >
        //             <Stack.Screen name="LoginScreen" component={LoginScreen} />
        //             <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        //             <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
        //             <Stack.Screen name="ResetPassword" component={ResetPassword} />
        //             <Stack.Screen name="VerifyCode" component={VerifyCode} />
        //             <Stack.Screen name="NewPassword" component={NewPassword} />
        //             <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    

        //     </Stack.Navigator>

    );
}

export default Navigation;