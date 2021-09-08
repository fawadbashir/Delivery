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
import {AuthProvider} from './context/auth'
import Deal from './screens/Deal'
import Deal2 from './screens/Deal2'
// import StartTransaction from './screens/Buyer/StartTransaction'
import Hold from './screens/Hold'
import HoleTransaction from './screens/HoleTransaction'
import StartTransaction from './screens/Seller/StartTransaction'
import ContactUs from './screens/ContactUs'
import AddAddress from './screens/AddAddress'
import EditAddress from './screens/EditAddress'
import CustomerCategory from './screens/Auth/CustomerCategory'
// import StartTransaction from './screens/Seller/StartTransaction'
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
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer />
      </PaperProvider>
    </AuthProvider>
  )
}

export default App
