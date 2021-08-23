import React, {useState, useRef} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import {add} from 'react-native-reanimated'
import Input from '../components/Input'

const AccountSettings = () => {
  // const navigation = useNavigation()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [password, setpassword] = useState('')
  const [deliveryId, setDeliveryId] = useState('')

  const [nameValid, setNameValid] = useState('')
  const [emailValid, setEmailValid] = useState('')
  const [phoneNoValid, setPhoneNoValid] = useState('')
  const [passwordValid, setPasswordValid] = useState('')
  const [deliveryIdValid, setDeliveryIdValid] = useState('')

  const updateFullName = (text) => {
    setFullName(text)
  }

  const updateEmail = (text) => {
    setEmail(text)
  }

  const updatePhoneNo = (text) => {
    setPhoneNo(text)
  }

  const updatePassword = (text) => {
    setpassword(text)
  }

  const updateDeliveryId = (text) => {
    setDeliveryId(text)
  }

  const proceedNext = () => {
    if (fullName === '') {
      setNameValid(true)
    } else {
      setNameValid(false)
    }

    if (email === '') {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }

    if (phoneNo === '') {
      setPhoneNoValid(true)
    } else {
      setPhoneNoValid(false)
    }

    if (password === '') {
      setPasswordValid(true)
    } else {
      setPasswordValid(false)
    }

    if (deliveryId === '') {
      setDeliveryIdValid(true)
    } else {
      setDeliveryIdValid(false)
    }
  }

  return (
    <View style={styles.screen}>
      <Image
        style={{marginBottom: 10}}
        source={require('../assets/signupImage.png')}
      />
      <ScrollView contentContainerStyle={styles.fieldsContainer}>
        <Text style={styles.title}>Account Settings</Text>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Full Name'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={fullName}
            onChangeText={updateFullName}
          />
        </View>

        {nameValid === true ? (
          <Text style={styles.errorText}>Please Fill It</Text>
        ) : null}

        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Email'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={email}
            onChangeText={updateEmail}
          />
        </View>

        {emailValid === true ? (
          <Text style={styles.errorText}>Please Fill It</Text>
        ) : null}

        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Phone No'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={phoneNo}
            onChangeText={updatePhoneNo}
            keyboardType="numeric"
            maxLength={12}
          />
        </View>

        {phoneNoValid === true ? (
          <Text style={styles.errorText}>Please Fill It</Text>
        ) : null}

        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Password'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={password}
            secureTextEntry={true}
            onChangeText={updatePassword}
          />
        </View>

        {passwordValid === true ? (
          <Text style={styles.errorText}>Please Fill It</Text>
        ) : null}
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Delivery Id'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={deliveryId}
            onChangeText={updateDeliveryId}
          />
        </View>

        {deliveryIdValid === true ? (
          <Text style={styles.errorText}>Please Fill It</Text>
        ) : null}
      </ScrollView>
      <View style={styles.options}>
        <TouchableOpacity onPress={proceedNext}>
          <LinearGradient
            colors={['#336CF9', '#1BE6D6']}
            style={styles.optionsView}
            start={{x: 0, y: 0}}
            end={{x: 1.2, y: 0}}>
            <Text style={styles.optionText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: '#F6F6FA',
    backgroundColor: '#F8FAFF',
  },
  fieldsContainer: {
    alignItems: 'center',
    // marginVertical: 10,
    // paddingTop: 30,
    // paddingBottom: 170,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    color: '#0C0B0B',
  },
  fieldView: {
    borderColor: '#BCE0FD',
    borderWidth: 1.5,
    width: '90%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 20,
    borderRadius: 20,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2699FB',
  },
  errorText: {
    paddingTop: 5,
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // paddingTop: 40,
    // paddingHorizontal: 30,
    // width: '60%',
    alignContent: 'center',
    // alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  optionsView: {
    textAlign: 'center',
    width: 120,
    // height: 200,
    paddingLeft: 5,
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#1BE6D6',
  },
  optionText: {
    color: 'white',
  },
})
export default AccountSettings
