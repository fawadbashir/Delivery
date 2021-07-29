import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import OtpScreen from '../screens/Auth/OtpScreen'

const AuthStack = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator headerMode={'none'} initialRouteName="login">
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
    </AuthStack.Navigator>
  )
}
