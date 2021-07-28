import React, {useRef} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import {useForm} from 'react-hook-form'

import AuthButton from '../../components/AuthButton'
import Input from '../../components/Input'
import Colors from '../../constants/colors'

const SignUp = () => {
  return <View style={styles.screen}></View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default SignUp
