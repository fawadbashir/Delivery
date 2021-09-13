import React, {useContext} from 'react'
import {NavigationContainer} from '@react-navigation/native'

import {AuthNavigator} from './AppNavigation'
import {MainNavigator} from './AppNavigation'
import BottomBar from '../components/BottomBar'
import {AppContext} from '../context/auth'

const AppNavigationContainer = () => {
  const {user} = useContext(AppContext)
  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigationContainer
