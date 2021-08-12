import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'

const AddAddress = () => {
  return (
    <View style={styles.screen}>
      <Image source={require('../assets/signupImage.png')} />
      <View style={styles.addressView}>
        <View style={styles.itemsView}>
          <Icon
            stlyle={{paddingBottom: 5}}
            name="add"
            color="#D3D3D3"
            size={35}
          />
          <Text style={styles.addText}>Add Address</Text>
        </View>
      </View>
      <View style={styles.options}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#336CF9', '#1BE6D6']}
            style={styles.optionsView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.optionText}>Edit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={['#336CF9', '#F64BBD']}
            style={styles.optionsView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.optionText}>Remove</Text>
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
  addressView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: '30%',
    marginTop: 40,
  },
  itemsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 21,
    color: '#2699FB',
    textAlignVertical: 'center',
    paddingTop: 5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
    // paddingHorizontal: 30,
    width: '60%',
    alignContent: 'center',
    alignSelf: 'center',
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
export default AddAddress
