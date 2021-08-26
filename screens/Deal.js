import React, {useEffect, useRef, useState} from 'react'
import Header from '../components/Header'
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native'
import {io} from 'socket.io-client'

import CommonSearch from '../components/CommonSearch'
import BottomBar from '../components/BottomBar'

import {useHttpClient} from '../hooks/http-hook'

const Deal = (props) => {
  const [rooms, setRooms] = useState([])
  const socket = io('https://deliverypay.in', {
    extraHeaders: {
      test: '1',
      cookie:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkZWxpdmVyeVBheSIsInN1YiI6IjYxMjc2MzlkMGM5YTAzNTBhNDU1YjU5YSIsImlhdCI6MTYyOTk3MTQyMn0.vlQkrrstkcUmweaPRgoE8h7r5Dtrz4NgPvLs0_tU18c',
    },
  })
  // console.log(socket.id)
  socket.connect()
  // useEffect(() => {
  socket.on('connect', (response) => console.log(response, 'connect'))
  //   //socket.on('test', (r) => console.log(socket.id, 'test'))
  //   socket.on('connectedToRoom', (r) => setRooms(r))
  //   socket.emit('joinRooms', {rooms})
  //   socket.emit('initiateChat', {client_id: '610532208a12c6447ed42e4c'}, (y) =>
  //     console.log(y, 'initiateChat'),
  //   )
  //   socket.on('messageToUser', (response) =>
  //     console.log(response, 'messageToUser'),
  //   )
  //   socket.on('newChat', (payload) => console.log(payload, 'newChat'))
  // }, [])

  // socket.onC

  const [chats, setChats] = useState([])
  const oldChat = useRef()
  const window = useWindowDimensions()
  const {sendRequest, error, isLoading, clearError} = useHttpClient()

  const searchChat = (text) => {
    if (text) {
      setChats((oldChats) => [
        ...oldChats.filter((chat) =>
          chat.phone.toLowerCase().includes(text.toLowerCase()),
        ),
      ])
    } else {
      setChats(oldChat.current)
    }
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      try {
        // const response = await fetch('https://deliverypay.in/api/getChat')
        // // console.log(response)
        // // const response = await sendRequest('https://deliverypay.in/api/getChat')
        // const resData = await response.json()
        // socket.on('connect', (response) => console.log(response, 'connect'))
        // //socket.on('test', (r) => console.log(socket.id, 'test'))
        // socket.on('connectedToRoom', (r) => {
        //   console.log(r)
        //   setRooms(r)
        // })
        // socket.emit('joinRooms', {rooms})
        // socket.emit(
        //   'initiateChat',
        //   {client_id: '60f1f3e065c83205eb57c392'},
        //   (y) => console.log(y, 'initiateChat'),
        // )
        // socket.on('messageToUser', (response) =>
        //   console.log(response, 'messageToUser'),
        // )
        // socket.on('newChat', (payload) => console.log(payload, 'newChat'))
        // const validArray = response.map((chat) => ({
        //   id: chat._id,
        //   firstName: chat.client.firstName,
        //   lastName: chat.client.lastName,
        //   email: chat.client.email,
        //   phone: chat.client.phone,
        //   image: chat.client.profileImg,
        //   clientId: chat.client._id,
        // }))
        // console.log(resData)
        // // console.log(validArray)
        // if (error) {
        //   Alert.alert('Error', error, [{onPress: () => clearError()}])
        //   return
        // }
        // setChats(validArray)
        // oldChat.current = validArray
        // socket.emit(
        //   'joinRooms',
        //   {
        //     rooms: response.map((room) => room._id),
        //   },
        //   (response1) => console.log(response1, 'response1'),
        // )
      } catch (e) {
        // console.log(e)
      }
    })

    return unsubscribe
  }, [props.navigation])
  return (
    <>
      <Header />
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Start a Chat</Text>
          <Image
            style={styles.tileImage}
            source={require('../assets/icons/arrow.png')}
          />
        </View>
        <View style={styles.searchBarView}>
          <CommonSearch
            onChangeText={searchChat}
            placeholder={'Search with Skropay ID or Phone Number'}
          />
        </View>
        <View
          style={{
            height: window.height < 700 ? 315 : 388,
            // marginBottom: 10,
            paddingTop: 10,
            // paddingBottom: 10,
            // top: -10,
            paddingHorizontal: 10,
          }}>
          <FlatList
            // style={{marginBottom: 10}}
            data={chats}
            keyExtractor={(item, index) => item.id}
            //   numColumns={3}
            renderItem={({item}) => {
              // console.log(item)
              return (
                // <View style={styles.list}>
                <View style={styles.innerList}>
                  <View style={styles.imageView}>
                    <Image
                      style={styles.image}
                      source={{
                        uri:
                          item.image ||
                          'https://www.mountsinai.on.ca/wellbeing/our-team/team-images/person-placeholder/image_view_fullscreen',
                      }}
                    />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.name}>{item.firstName}</Text>
                    <Text style={styles.name}>{item.lastName}</Text>
                    <Text style={styles.phoneNumber}>{item.phone}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                  </View>
                  <View style={styles.requestStatusView}>
                    <Text style={styles.requestStatus}>
                      {item.requestStatus}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.chartStatusView}
                    onPress={() => {
                      console.log('es')
                      // socket.emit(
                      //   'initiateChat',
                      //   {client_id: '60f1f3e065c83205eb57c392'},
                      //   (y) => console.log(y, 'initiateChat'),
                      // )
                      // socket.on('connectedToRoom', (r) => console.log('test'))
                      // socket.on('messageToUser', (response) =>
                      //   console.log(response, 'messageToUser'),
                      // )

                      // props.navigation.navigate('chat', {
                      //   chatId: item.clientId,
                      // })
                    }}>
                    <Text style={styles.chartStatus}>Chat</Text>
                  </TouchableOpacity>
                </View>
                // </View>
              )
            }}
          />
        </View>
      </View>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#336CF9',
    fontFamily: 'Poppins-Regular',
  },
  titleImage: {},

  searchBarView: {
    paddingLeft: 10,
  },

  innerList: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-around',
    // justifyContent: 'flex-start',
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingTop: 30,
    paddingVertical: 10,
    paddingLeft: 20,
    marginTop: 10,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  details: {
    paddingLeft: 40,
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
    paddingBottom: 50,
    paddingRight: 40,
  },
  requestStatus: {
    fontSize: 11,
    color: '#707070',
  },
  chartStatusView: {
    paddingRight: 20,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  chartStatus: {
    color: '#707070',
    fontSize: 11,
    borderColor: '#5ab1fc',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
  },
})

export default Deal
