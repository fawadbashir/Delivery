import React from 'react'
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.headingContainer}>
          <Image
            source={require('../assets/appHeadingIcon.png')}
            // style={{marginRight: 10}}
            style={{width: 50, height: 50, marginRight: 10}}
          />
          <View>
            <Text style={styles.heading}>Delivery</Text>
            <Text style={[styles.heading, {marginTop: -15}]}>PAY</Text>
          </View>
        </View>
        <View style={styles.userDetailContainer}>
          <View style={{marginRight: 10}}>
            <Text style={styles.name}>Swati</Text>
            <Text style={[styles.name, {marginTop: -5}]}>Mishra</Text>
          </View>
          <TouchableOpacity style={styles.personButton} activeOpacity={0.6}>
            <Icon name="person" color="#2699FB" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        {/* <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="black"
            style={styles.input}
          />
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="settings-voice" color="#707070" size={25} />
          </TouchableOpacity>
        </View> */}
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
          <Image
            source={require('../assets/settingsIcon2.png')}
            style={{width: 25, height: 25, top: 2}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.5}>
          <Image
            source={require('../assets/customerServiceIcon2.png')}
            style={{width: 30, height: 30, top: -5}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFF',
    // backgroundColor: 'grey',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  top: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // textAlignVertical: 'center',
    paddingHorizontal: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Poppins-BoldItalic',
    fontSize: 22,
    color: '#5ab1fc',
  },
  userDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#5ab1fc',
    // textAlignVertical: 'bottom',
  },
  personButton: {
    backgroundColor: '#fff',
    // padding: 10,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
    width: 47,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 10,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    // flexGrow: 1,
    width: 281,
    height: 45,
  },
  input: {
    flexGrow: 1,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'center',
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 5,

    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
    width: 40,
    height: 40,
    alignItems: 'center',

    marginHorizontal: 5,
  },
})

export default Header
