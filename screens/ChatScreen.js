import React, {useContext} from 'react'
import Header from '../components/Header'
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {rosybrown} from 'color-name'
import CommonSearch from '../components/CommonSearch'
import BottomBar from '../components/BottomBar'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from '@react-navigation/native'

import {AuthContext} from '../context/auth'

const Data = [
  {
    id: '1',
    message:
      'Hello Mr.Teja Pujari, I want to buy a product as you are selling with Delivery Pay service',
    time: '5 mins ago',
    status: 'buyer',
  },
  {
    id: '2',
    message: 'Hello Miss Swati ',
    time: '2 mins ago',
    status: 'seller',
  },
  {
    id: '3',
    message:
      'Hello Mr.Teja Pujari, I want to buy a product as you are selling with Delivery Pay service',
    time: '5 mins ago',
    status: 'buyer',
  },
  {
    id: '4',
    message: 'Hello Miss Swati ',
    time: '2 mins ago',
    status: 'seller',
  },
  {
    id: '5',
    message:
      'Hello Mr.Teja Pujari, I want to buy a product as you are selling with Delivery Pay service',
    time: '5 mins ago',
    status: 'buyer',
  },
  {
    id: '6',
    message: 'Hello Miss Swati ',
    time: '2 mins ago',
    status: 'seller',
  },
  {
    id: '7',
    message:
      'Hello Mr.Teja Pujari, I want to buy a product as you are selling with Delivery Pay service',
    time: '5 mins ago',
    status: 'buyer',
  },
  {
    id: '8',
    message: 'Hello Miss Swati ',
    time: '2 mins ago',
    status: 'seller',
  },
  {
    id: '9',
    message:
      'Hello Mr.Teja Pujari, I want to buy a product as you are selling with Delivery Pay service',
    time: '5 mins ago',
    status: 'buyer',
  },
  {
    id: '10',
    message: 'Hello Miss Swati ',
    time: '2 mins ago',
    status: 'seller',
  },
  {
    id: '11',
    message:
      'Hello Mr.Teja Pujari, I want to buy a product as you are selling with Delivery Pay service',
    time: '5 mins ago',
    status: 'buyer',
  },
  {
    id: '12',
    message: 'Hello Miss Swati ',
    time: '2 mins ago',
    status: 'seller',
  },
]

const ChatScreen = () => {
  const window = useWindowDimensions()
  const {user} = useContext(AuthContext)
  const navigation = useNavigation()
  return (
    <>
      <KeyboardAvoidingView keyboardVerticalOffset={1} behavior={'position'}>
        <View style={styles.screen}>
          <View style={styles.headingContainer}>
            <View style={{flexDirection: 'row'}}>
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

            <View style={{marginRight: 10, top: -20}}>
              <View>
                <Text style={styles.name}>{user.firstName}</Text>
                <Text style={[styles.name, {marginTop: -5}]}>
                  {user.lastName}
                </Text>
              </View>

              <TouchableOpacity style={styles.personButton} activeOpacity={0.6}>
                <Icon name="person" color="#2699FB" size={30} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}></View>
            </View>
          </View>

          <View style={styles.innerList}>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={require('../assets/profile.jpg')}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>Teja Pujari</Text>
              <Text style={styles.phoneNumber}>+9187725777</Text>
              <Text style={styles.email}>tejap@gmail.com</Text>
              <Text style={styles.address}>Mumbai India</Text>
            </View>
            <View style={styles.requestStatusView}>
              <Text style={styles.requestStatus}>Connected</Text>
            </View>
            <TouchableOpacity style={styles.chartStatusView}>
              <Text style={styles.chartStatus}>Chart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.payView}>
            <TouchableOpacity style={{width: '25%'}}>
              <LinearGradient
                colors={['#336CF9', '#1BE6D6']}
                style={styles.optionsView}
                start={{x: 0, y: 0}}
                end={{x: 1.2, y: 0}}>
                <Text style={styles.optionText}>Pay</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{width: '75%'}}>
              <Text style={styles.payText}>
                Click on pay if your deal is done it will be debited to Delivery
                Pay wallet with teja pujari
              </Text>
            </View>
          </View>
          <View style={styles.requestView}>
            <Image
              style={styles.tileImage}
              source={require('../assets/icons/arrow.png')}
            />
            <Text style={styles.requestText}>Your request is pending</Text>
          </View>
          <View
            style={{
              height: window.height < 700 ? 315 : 260,
              marginVertical: 5,
            }}>
            <FlatList
              data={Data}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => {
                return item.status === 'buyer' ? (
                  <View
                    style={[styles.messageContainer, {alignItems: 'flex-end'}]}>
                    <View
                      style={[
                        styles.messageView,
                        {backgroundColor: '#F9EAF4', borderBottomLeftRadius: 0},
                      ]}>
                      <Text style={styles.messageText}>{item.message}</Text>
                    </View>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                ) : (
                  <View style={styles.messageContainer}>
                    <View
                      style={[
                        styles.messageView,
                        {
                          backgroundColor: '#BCE0FD',
                          borderBottomRightRadius: 0,
                        },
                      ]}>
                      <Text style={styles.messageText}>{item.message}</Text>
                    </View>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                )
              }}
            />
          </View>

          <View style={styles.searchBarContainer}>
            <View style={styles.searchBarView}>
              <TextInput
                placeholder={'Type a message here'}
                style={styles.input}
                placeholderTextColor="#707070"
                multiline={true}
                // value={BuyerMessageText}
                // onChangeText={}
              />
            </View>

            <TouchableOpacity
              style={styles.sendView}
              //   onPress={() => setBuyerState(true)}
            >
              <Image
                style={styles.tileImage}
                source={require('../assets/icons/sendMessage.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <BottomBar />

      {/* </TouchableWithoutFeedback> */}
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
  },
  headingContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Poppins-BoldItalic',
    fontSize: 22,
    color: '#5ab1fc',
  },
  innerList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 5,
    marginVertical: 5,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // marginRight: 10,
  },
  details: {
    paddingLeft: 5,
    // marginLeft: 10,
  },
  name: {
    fontSize: 15,
    color: '#2A2A2A',
    fontFamily: 'Poppins-Regular',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#2A2A2A',
    fontFamily: 'Poppins-Regular',
  },
  email: {
    fontSize: 14,
    color: '#707070',
    fontFamily: 'Poppins-Regular',
  },
  address: {
    fontSize: 14,
    color: '#707070',
    fontFamily: 'Poppins-Regular',
  },
  requestStatusView: {
    // paddingBottom: 50,
    // paddingRight: 40,
    left: -10,
    top: 10,
  },
  requestStatus: {
    fontSize: 11,
    color: '#2020D5',
  },

  chartStatusView: {
    width: '18%',
    height: 40,
    backgroundColor: '#BCE0FD',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  chartStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#0D0E0F',
  },
  optionsView: {
    textAlign: 'center',
    width: '90%',
    // height: 200,
    // paddingLeft: 5,
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#1BE6D6',
  },
  optionText: {
    color: 'white',
  },
  payView: {
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  payText: {
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  requestView: {
    marginTop: 10,
    // marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestText: {
    marginLeft: 20,
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  searchBarContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  searchBarView: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  input: {
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 19,
    textAlignVertical: 'center',
  },
  sendView: {
    // marginLeft: 10,
    backgroundColor: '#336CF9',
    width: '15%',
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  messageView: {
    borderRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '80%',
  },
  messageText: {
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  timeText: {
    marginTop: 10,
    color: '#2A2A2A',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginRight: 10,
  },
})

export default ChatScreen
