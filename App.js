/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react'

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import NavigationContainer from './Navigation/NavigationContainer'
import {AuthProvider} from './context/auth'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1be6d6',
    accent: '#2020d5',
    lightBlue: '#bce0fd',
  },
}

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer />
    </AuthProvider>
  )
}

export default App
