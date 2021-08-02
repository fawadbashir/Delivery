import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import {AuthNavigator} from './AppNavigation'
const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}

export default AppNavigationContainer
