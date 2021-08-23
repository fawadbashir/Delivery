import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import {AuthNavigator} from './AppNavigation'
import {MainNavigator} from './AppNavigation'
const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <MainNavigator /> */}
    </NavigationContainer>
  )
}

export default AppNavigationContainer
