import React, {useContext} from 'react'
import {NavigationContainer} from '@react-navigation/native'

import {AuthNavigator} from './AppNavigation'
import {MainNavigator} from './AppNavigation'
import BottomBar from '../components/BottomBar'
import {AuthContext} from '../context/auth'

const AppNavigationContainer = () => {
  const {user} = useContext(AuthContext)
  return (
    <NavigationContainer>
      {user.userId ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigationContainer
