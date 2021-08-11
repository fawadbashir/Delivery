import React from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ContactUs = () => {
  return (
    <View style={styles.screen}>
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
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
            <Image
              source={require('../assets/logoutIcon.png')}
              style={{width: 40, height: 30}}
            />
          </TouchableOpacity>
          <Text style={styles.actionText}>Log Out</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    backgroundColor: '#f8faff',
    // backgroundColor: 'grey',
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  actionsContainer: {
    // flexDirection: 'row',
    // marginTop: 10,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 40,
  },
  actionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#53AEFC',
    paddingTop: 10,
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

export default ContactUs
