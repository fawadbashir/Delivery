import React from 'react'
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'

const BottomBar = () => {
  const window = useWindowDimensions()
  const buttonOnHeight = {
    width: window.height < 700 ? 37 : 47,
    height: window.height < 700 ? 33 : 44,
  }
  return (
    <View style={[styles.container, {height: window.height < 700 ? 80 : 100}]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.personButton, buttonOnHeight]}
          activeOpacity={0.7}>
          <Image source={require('../assets/homeIcon.png')} />
        </TouchableOpacity>
        <Text style={styles.iconText}>Home</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.personButton, buttonOnHeight]}
          activeOpacity={0.7}>
          <Image source={require('../assets/sendIcon.png')} />
        </TouchableOpacity>
        <Text style={styles.iconText}>Deals</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.personButton, buttonOnHeight]}
          activeOpacity={0.7}>
          <Image source={require('../assets/walletIcon.png')} />
        </TouchableOpacity>
        <Text style={styles.iconText}>Wallet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.personButton, buttonOnHeight]}
          activeOpacity={0.7}>
          <Image source={require('../assets/transactionIcon.png')} />
        </TouchableOpacity>
        <Text style={styles.iconText}>Transaction</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.personButton, buttonOnHeight]}
          activeOpacity={0.7}>
          <Image source={require('../assets/holdIcon.png')} />
        </TouchableOpacity>
        <Text style={styles.iconText}>Hold</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#5ab1fc',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#F8FAFF',

    // bottom: 0,
    // zIndex: -1,
  },
  buttonContainer: {
    alignItems: 'center',
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
  iconText: {fontFamily: 'Poppins-Light', marginTop: 10},
})

export default BottomBar
