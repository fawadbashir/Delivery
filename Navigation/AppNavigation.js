import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import OtpScreen from '../screens/Auth/OtpScreen'
import CustomerCategory from '../screens/Auth/CustomerCategory'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import NewPassword from '../screens/Auth/NewPassword'

const AuthStack = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      headerMode={'none'}
      initialRouteName="customerCategory">
      <AuthStack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="signup"
        component={SignUp}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="otp"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="customerCategory"
        component={CustomerCategory}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="newPassword"
        component={NewPassword}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  )
}
