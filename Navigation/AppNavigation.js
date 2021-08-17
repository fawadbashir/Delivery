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
    <MainStack.Navigator>
      <MainStack.Screen
        name="addAddress"
        component={AddAddress}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="editAddress"
        component={EditAddress}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  )
}
