import React, {useState, useEffect, useContext, useCallback} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import colors from '../../constants/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import fetch from 'node-fetch'

import {AuthContext} from '../../context/auth'

import {sendRequest} from '../../hooks/http-hook'

const OtpScreen = (props) => {
  const [otp, setOtp] = useState([])
  const {user} = useContext(AuthContext)

  const addToOtp = (value) => {
    setOtp((prevOtp) => [...prevOtp, value])
  }

  const clearOtpValue = () => {
    const lastValue = otp.pop()

    setOtp((prevOtp) => prevOtp.filter((item) => item !== lastValue))
  }

  const submitUserOtp = () => {
    sendRequest(
      'https://deliverypay.in/api/submitUserOTP',
      'POST',
      JSON.stringify({code: otp.join(','), phone: user.userPhone}),
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    ).then((response) => console.log(response))
  }

  const fetchOtp = useCallback(async () => {
    try {
      const response = await fetch(
        'https://deliverypay.in/api/sendUserOTP',
        {
          method: 'POST',
          body: JSON.stringify({phone: user.userPhone}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
        [user.userPhone],
      )
      console.log(response)
      const resData = await response.json()
      console.log(resData)
    } catch (e) {
      console.log(e)
    }
  }, [user.userPhone])

  useEffect(() => {
    fetchOtp()
    console.log(user)
  }, [fetchOtp])

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.topView}>
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => props.navigation.navigate('login')}>
          <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.mainView}>
        <Text style={styles.mainHeading}>Verify Otp</Text>
        <Text style={styles.infoText}>
          We have sent you an SMS on 878812916
        </Text>
        <Text style={styles.infoText}>with six digit verification code</Text>
        <View style={styles.otpNumbersView}>
          <Text style={styles.otpNumberText}>{otp[0] ? otp[0] : '____'}</Text>
          <Text style={styles.otpNumberText}>{otp[1] ? otp[1] : '____'}</Text>
          <Text style={styles.otpNumberText}>{otp[2] ? otp[2] : '____'}</Text>
          <Text style={styles.otpNumberText}>{otp[3] ? otp[3] : '____'}</Text>
          <Text style={styles.otpNumberText}>{otp[4] ? otp[4] : '____'}</Text>
          <Text style={styles.otpNumberText}>{otp[5] ? otp[5] : '____'}</Text>
        </View>
        <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
          <Text style={styles.mainHeading}>Re-send Otp</Text>
        </TouchableOpacity>
        <View style={styles.buttonsView}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 1)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 2)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 3)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 4)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 5)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 6)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 7)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 8)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 9)}
              disabled={otp.length === 6}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={clearOtpValue}
              disabled={otp.length === 0}>
              {/* <Text style={styles.buttonText}>1</Text> */}
              <Icon name="close" size={20} style={styles.iconText} />
              {/* <Icon */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={addToOtp.bind(this, 0)}
              disabled={otp.length === 7}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              disabled={otp.length < 7}
              onPress={submitUserOtp}>
              <Icon name="done" size={20} style={styles.iconText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
  topView: {
    backgroundColor: colors.lightBlue,
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    textAlignVertical: 'center',
    width: '100%',
    position: 'relative',
    zIndex: -1,
    marginBottom: -20,
  },
  loginText: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    textAlignVertical: 'top',
    marginLeft: 20,
  },
  mainView: {
    backgroundColor: '#e7f6fc',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderRadius: 20,
    // top: '20%',
    paddingTop: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  mainHeading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  infoText: {
    color: '#9fa5a7',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 14,
  },
  otpNumbersView: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop: 40,
    paddingBottom: 20,
    marginBottom: 20,
  },
  otpNumberText: {
    marginHorizontal: 10,
    width: 30,
    fontSize: 16,
    // fontFamily: 'Poppins-Regular',
  },
  buttonsView: {
    paddingHorizontal: 40,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    // width: '70%',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    width: '30%',
    height: 50,
    // alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  iconText: {
    backgroundColor: colors.lightBlue,
    borderRadius: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    width: 30,
    height: 30,
  },
})

export default OtpScreen
