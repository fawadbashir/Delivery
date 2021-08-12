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

const EditAddress = () => {
  const fullNameRef = useRef()

  const [fullName, setFullName] = useState('')
  const updateFullName = (text) => {
    setFullName(text)
  }
  const [mobileNo, setMobileNo] = useState('')
  const updateMobileNo = (text) => {
    setMobileNo(text)
  }

  const [alternatePhone, setAlternatePhone] = useState('')
  const updateAlternatePhone = (text) => {
    setAlternatePhone(text)
  }
  const [address, setAddress] = useState('')
  const updateAddress = (text) => {
    setAddress(text)
  }
  const [city, setCity] = useState('')
  const updateCity = (text) => {
    setCity(text)
  }

  const [landmark, setLandmark] = useState('')
  const updateLandmark = (text) => {
    setLandmark(text)
  }

  const [locality, setLocality] = useState('')
  const updateLocality = (text) => {
    setLocality(text)
  }

  const [pinCode, setpinCode] = useState('')
  const updatePinCode = (text) => {
    setpinCode(text)
  }

  const [state, setState] = useState('')
  const updateState = (text) => {
    setState(text)
  }

  const [country, setCountry] = useState('')
  const updateCountry = (text) => {
    setCountry(text)
  }
  return (
    <View style={styles.screen}>
      <Image
        style={{marginBottom: 30}}
        source={require('../assets/signupImage.png')}
      />
      <ScrollView contentContainerStyle={styles.fieldsContainer}>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Full Name'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={fullName}
            onChangeText={updateFullName}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Mobile No'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={mobileNo}
            onChangeText={updateMobileNo}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Alternate Phone No.'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={alternatePhone}
            onChangeText={updateAlternatePhone}
          />
        </View>
        <View style={[styles.fieldView, {height: '30%'}]}>
          <TextInput
            placeholder={'Address'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={address}
            multiline={true}
            onChangeText={updateAddress}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'City'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={city}
            onChangeText={updateCity}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Landmark'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={landmark}
            onChangeText={updateLandmark}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Locality'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={locality}
            onChangeText={updateLocality}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Pin Code'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={pinCode}
            onChangeText={updatePinCode}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'State'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={state}
            onChangeText={updateState}
          />
        </View>
        <View style={styles.fieldView}>
          <TextInput
            placeholder={'Country'}
            style={styles.input}
            placeholderTextColor="#2699FB"
            value={country}
            onChangeText={updateCountry}
          />
        </View>
      </ScrollView>
      <View style={styles.options}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#336CF9', '#1BE6D6']}
            style={styles.optionsView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.optionText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={['#336CF9', '#F64BBD']}
            style={styles.optionsView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.optionText}>Cancel</Text>
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
    paddingBottom: 230,
  },
  fieldView: {
    borderColor: '#BCE0FD',
    borderWidth: 1,
    width: '80%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 30,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2699FB',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingTop: 40,
    // paddingHorizontal: 30,
    width: '60%',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  optionsView: {
    width: 80,
    // height: 200,
    paddingLeft: 5,
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#1BE6D6',
  },
  optionText: {
    color: 'white',
  },
})
export default EditAddress
