import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import OtpScreen from '../screens/Auth/OtpScreen'
import CustomerCategory from '../screens/Auth/CustomerCategory'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import NewPassword from '../screens/Auth/NewPassword'
import AddAddress from '../screens/AddAddress'
import EditAddress from '../screens/EditAddress'
import BuyerStartTransaction from '../screens/Buyer/StartTransaction'
import SellerStartTransaction from '../screens/Seller/StartTransaction'
import UserCategory from '../screens/UserCategory'

import Wallet from '../screens/Wallet'
import AddAddress from '../screens/AddAddress'
import Hold from '../screens/Hold'
import ContactUs from '../screens/ContactUs'
import PaymentMethod from '../screens/PaymentMethod'
import Deal from '../screens/Deal'
import TransactionHistory from '../screens/TransactionHistory'


const AuthStack = createStackNavigator()
const MainStack = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      headerMode={'none'}
      initialRouteName="customerCategory">
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={SignUp} />
      <AuthStack.Screen name="otp" component={OtpScreen} />
      <AuthStack.Screen name="customerCategory" component={CustomerCategory} />
      <AuthStack.Screen name="forgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="newPassword" component={NewPassword} />
    </AuthStack.Navigator>
  )
}

export const MainNavigator = () => {
  return (

    <MainStack.Navigator headerMode={'none'} initialRouteName="chooseCategory">
      <MainStack.Screen name="chooseCategory" component={UserCategory} />
      <MainStack.Screen name="buying" component={BuyerStartTransaction} />
      <MainStack.Screen name="selling" component={SellerStartTransaction} />
      <MainStack.Screen name="wallet" component={Wallet} />
      <MainStack.Screen name="addAddress" component={AddAddress} />
      <MainStack.Screen name="editAdress" component={EditAddress} />
      <MainStack.Screen name="deal" component={Deal} />
      <MainStack.Screen
        name="transactionHistory"
        component={TransactionHistory}
      />
      <MainStack.Screen name="contact" component={ContactUs} />
      <MainStack.Screen name="Hold" component={Hold} />
      <MainStack.Screen name="paymentMethod" component={PaymentMethod} />

   
  )
}
