import React, {useContext, useEffect, useRef, useState} from 'react'
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

import {useRoute} from '@react-navigation/native'
import {io} from 'socket.io-client'

import CommonSearch from '../components/CommonSearch'
import BottomBar from '../components/BottomBar'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DocumentPicker from 'react-native-document-picker'

import {AppContext} from '../context/auth'

const ChatScreen = (props) => {
  const window = useWindowDimensions()
  const {user} = useContext(AppContext)
  const {clientId, name, email} = props.route.params
  const {socket, rooms} = props
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const listRef = useRef()

  const filePickerHandler = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [
          // DocumentPicker.types.pdf,
          // DocumentPicker.types.docx,
          // DocumentPicker.types.doc,
          DocumentPicker.types.images,
        ],
        mode: 'import',
      })

      // images[fileIndex] = {
      //   uri: response.uri,
      //   type: response.type,
      //   fileName: response.name,
      // }
      console.log(response[0])
      const formData = new FormData()
      formData.append('file')
      const imageResponse = await fetch(`https://cdn.deliverypay.in/`, {
        body: formData,
        method: 'POST',
      })
      const resData = await imageResponse.json()
      if (!response.ok) {
        console.log(resData)
      }
      console.log(resData)
      console.log(resData)
    } catch (e) {
      // setVisible(false)
      console.log(e)
    }
  }

  useEffect(() => {
    listRef.current.scrollToEnd()
  }, [])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setMessages(props.route.params.messages)

      socket.emit('initiateChat', {client_id: clientId}, (y) =>
        console.log(y, 'initiateChat'),
      )
      socket.on('messageToUser', (response) => {
        console.log(response, 'messageToUserfromChatSceen')

        setMessages((prev) => prev.concat(response))
        listRef.current.scrollToEnd()
      })
    })

    return unsubscribe
  }, [clientId, props.navigation, props.route.params.messages, socket])

  const sendMessage = () => {
    socket.emit(
      'messageToServer',
      {
        rooms,
        message: {
          text: message,
          to: clientId,
        },
      },
      (r) => console.log(r),
    )

    setMessage('')
  }

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

            <View
              style={{
                marginRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.name}>{user.firstName}</Text>
                {/* <Text style={[styles.name, {marginTop: -5}]}>
                  {user.lastName}
                </Text> */}
              </View>

              <TouchableOpacity style={styles.personButton} activeOpacity={0.6}>
                <Icon name="person" color="#2699FB" size={30} />
              </TouchableOpacity>
              {/* <View style={{flexDirection: 'row'}}></View> */}
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
              <Text style={styles.name}>{`${name}`}</Text>
              <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>
              <Text style={styles.email}>{email}</Text>
              <Text style={styles.address}>Mumbai India</Text>
            </View>
            <View style={styles.requestStatusView}>
              <Text style={styles.requestStatus}>Connected</Text>
            </View>
            <TouchableOpacity
              style={{width: '25%'}}
              activeOpacity={0.6}
              onPress={() => props.navigation.navigate('wallet')}>
              <LinearGradient
                colors={['#336CF9', '#1BE6D6']}
                style={styles.optionsView}
                start={{x: 0, y: 0}}
                end={{x: 1.2, y: 0}}>
                <Text style={styles.optionText}>Pay</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.payView}>
            {/* <View style={{width: '75%'}}> */}
            <Text style={styles.payText}>
              Click on pay if your deal is done it will be debited to Delivery
              Pay wallet with {name}
            </Text>
            {/* </View> */}
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
              height: window.height < 700 ? 314 : 385,
              // marginVertical: 5,
            }}>
            <FlatList
              // initialNumToRender={50}
              data={messages}
              extraData={true}
              ref={(ref) => (listRef.current = ref)}
              keyExtractor={(item, index) => item._id}
              renderItem={({item}) => {
                if (item.media) {
                  console.log(item.media)
                }
                return item.from !== props.route.params.clientId ? (
                  <>
                    {/* {item.media ? (
                      <Image
                        source={{
                          uri: item.media,
                        }}
                        style={{width: 15, height: 15}}
                      />
                    ) : ( */}
                    {item.media ? (
                      <Image
                        source={{uri: item.media}}
                        resizeMethod="scale"
                        style={{
                          width: 200,
                          height: 200,
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <View
                        style={[
                          styles.messageContainer,
                          {alignItems: 'flex-end'},
                        ]}>
                        <View
                          style={[
                            styles.messageView,
                            {
                              backgroundColor: '#F9EAF4',
                              borderBottomLeftRadius: 0,
                            },
                          ]}>
                          <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                        {/* <Text style={styles.timeText}>{item.time}</Text> */}
                      </View>
                    )}
                    {/* )} */}
                  </>
                ) : (
                  <>
                    {item.media ? (
                      <Image
                        source={{uri: item.media}}
                        resizeMethod="scale"
                        style={{
                          width: 200,
                          height: 200,
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <View style={styles.messageContainer}>
                        <View
                          style={[
                            styles.messageView,
                            {
                              // marginBottom: 0,
                              backgroundColor: '#BCE0FD',
                              borderBottomRightRadius: 0,
                            },
                          ]}>
                          <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                        {/* <Text style={styles.timeText}>{item.time}</Text> */}
                      </View>
                    )}
                  </>
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
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <TouchableOpacity onPress={filePickerHandler}>
              <Icon name="attach-file" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!message}
              style={styles.sendButton}
              onPress={sendMessage}>
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
    marginTop: 5,
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
    // paddingTop: 5,
    marginVertical: 5,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
    // marginRight: 10,
  },
  details: {
    // paddingLeft: 5,
    // marginLeft: 10,
  },
  name: {
    fontSize: 12,
    color: '#2A2A2A',
    fontFamily: 'Poppins-Regular',
  },
  phoneNumber: {
    fontSize: 12,
    color: '#2A2A2A',
    fontFamily: 'Poppins-Regular',
  },
  email: {
    fontSize: 12,
    color: '#707070',
    fontFamily: 'Poppins-Regular',
  },
  address: {
    fontSize: 12,
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
    fontSize: 12,
    textAlign: 'center',
  },
  requestView: {
    marginTop: 5,
    // marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestText: {
    marginLeft: 20,
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  searchBarContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchBarView: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  input: {
    color: '#707070',
    fontFamily: 'Poppins-Regular',
    // fontSize: 16,
    textAlignVertical: 'center',
  },
  sendButton: {
    // marginLeft: 10,
    backgroundColor: '#336CF9',
    width: 45,
    height: 45,
    borderRadius: 100,

    alignItems: 'center',
    justifyContent: 'center',
  },

  messageContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  messageView: {
    borderRadius: 35,
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: '80%',
  },
  messageText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
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
