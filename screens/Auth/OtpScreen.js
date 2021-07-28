import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import colors from '../../constants/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const OtpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.topView}>
        <TouchableOpacity activeOpacity={0.1}>
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
          <Text style={styles.otpNumberText}>____</Text>
          <Text style={styles.otpNumberText}>____</Text>
          <Text style={styles.otpNumberText}>____</Text>
          <Text style={styles.otpNumberText}>____</Text>
          <Text style={styles.otpNumberText}>____</Text>
          <Text style={styles.otpNumberText}>____</Text>
        </View>
        <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
          <Text style={styles.mainHeading}>Re-send Otp</Text>
        </TouchableOpacity>
        <View style={styles.buttonsView}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              {/* <Text style={styles.buttonText}>1</Text> */}
              <Icon name="close" size={20} style={styles.iconText} />
              {/* <Icon */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}>
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
