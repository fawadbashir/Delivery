import React from 'react'
import Header from '../components/Header'
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  requireNativeComponent,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {rosybrown} from 'color-name'
import CommonSearch from '../components/CommonSearch'
import BottomBar from '../components/BottomBar'
import LinearGradient from 'react-native-linear-gradient'
import {useState} from 'react/cjs/react.development'

const ChatScreen = () => {
  const [buyerState, setBuyerState] = useState(false)
  const [BuyerMessageText, setBuyerMessageText] = useState()

  const window = useWindowDimensions()

  const updateBuyerMessage = (text) => {
    setBuyerMessageText(text)
  }

  const BuyerMessage = () => {
    return buyerState === true ? (
      <View style={styles.messageContainer}>
        <View style={styles.messageView}>
          <Text style={[styles.messageText, {backgroundColor: '#F9EAF4'}]}>
            {/* Hello Mr.Teja Pujari, I want to buy a product as you are selling
            with Delivery Pay service */}
            {BuyerMessageText}
          </Text>
          <Text style={styles.timeText}>5 mins ago</Text>
        </View>
      </View>
    ) : null
  }

  return (
    <>
      <Header />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.screen}>
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

          <View style={styles.searchBarContainer}>
            <View style={styles.searchBarView}>
              <TextInput
                placeholder={'Type a message here'}
                style={styles.input}
                placeholderTextColor="#707070"
                multiline={true}
                value={BuyerMessageText}
                onChangeText={updateBuyerMessage}
              />
            </View>

            <TouchableOpacity
              style={styles.sendView}
              onPress={() => setBuyerState(true)}>
              <Image
                style={styles.tileImage}
                source={require('../assets/icons/sendMessage.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    paddingVertical: 10,
  },

  innerList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
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
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  payText: {
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  requestView: {
    marginTop: 30,
    alignItems: 'center',
  },
  requestText: {
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginTop: 10,
  },
  searchBarContainer: {
    // marginTop: 20,
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
    flexDirection: 'row-reverse',
  },
  messageView: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'flex-end',
  },
  messageText: {
    maxWidth: '95%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 35,
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    borderBottomLeftRadius: 0,
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
