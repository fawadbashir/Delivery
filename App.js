/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, {useEffect} from 'react'

import {Provider as PaperProvider} from 'react-native-paper'
import {AppProvider} from './context/auth'

import SplashScreen from 'react-native-splash-screen'

import NavigationContainer from './Navigation/NavigationContainer'

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#1be6d6',
//     accent: '#2020d5',
//     lightBlue: '#bce0fd',
//   },
// }

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
  }, [])
  return (
    <AppProvider>
      <PaperProvider>
        <NavigationContainer />
      </PaperProvider>
    </AppProvider>
  )
}

export default App
