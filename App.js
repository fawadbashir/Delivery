/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react'

// import {DefaultTheme} from 'react-native-paper'
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
// import StartTransaction from './screens/Seller/StartTransaction'

import NavigationContainer from './Navigation/NavigationContainer'
import Wallet from './screens/Wallet'
import PaymentSuccess from './screens/PaymentSuccess'
import PaymentDetails from './screens/PaymentDetails'
// import AccountSettings from './screens/AccountSettings'
import AccountSettings from './screens/AccountSettings'

// import UserCategory from './screens/UserCategory'
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
  return (
    // <AuthProvider>
    //   <NavigationContainer />
    //   {/* <StartTransaction /> */}
    //   {/* <UserCategory /> */}
    // </AuthProvider>
    // <Deal />
    // <Hold />
    // <HoleTransaction />
    // <ContactUs />
    // <AddAddress />
    // <EditAddress />
    // <StartTransaction />
    // <PaymentSuccess />
    // <PaymentDetails />
    <AccountSettings />
  )
}

export default App
