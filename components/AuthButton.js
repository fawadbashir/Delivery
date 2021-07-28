import React from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Colors from '../constants/colors'

const AuthButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
      <LinearGradient
        colors={[Colors.primary, '#192f6a']}
        style={{...styles.authButton, ...props.authButton}}>
        <Text style={{...styles.authButtonText, ...props.authButtonText}}>
          {props.children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  authButton: {
    padding: 10,
    width: '60%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  authButtonText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 18,
    // backgroundColor: 'transparent',
  },
})

export default AuthButton
