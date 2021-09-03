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
} from 'react-native'
import {rosybrown} from 'color-name'
import CommonSearch from '../components/CommonSearch'
import BottomBar from '../components/BottomBar'

const Data = [
  {
    id: '1',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    phoneNumber: '+9187725777',
    email: 'tejap@gmail.com',
    address: 'Mumbai India',
    requestStatus: 'Request send',
    chartStatus: 'chart',
  },
  {
    id: '2',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    phoneNumber: '+9187725777',
    email: 'tejap@gmail.com',
    address: 'Mumbai India',
    requestStatus: 'Request send',
    chartStatus: 'chart',
  },
  {
    id: '3',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    phoneNumber: '+9187725777',
    email: 'tejap@gmail.com',
    address: 'Mumbai India',
    requestStatus: 'Request send',
    chartStatus: 'chart',
  },
  {
    id: '4',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    phoneNumber: '+9187725777',
    email: 'tejap@gmail.com',
    address: 'Mumbai India',
    requestStatus: 'Request send',
    chartStatus: 'chart',
  },
  {
    id: '5',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    phoneNumber: '+9187725777',
    email: 'tejap@gmail.com',
    address: 'Mumbai India',
    requestStatus: 'Request send',
    chartStatus: 'chart',
  },
]

const Deal = () => {
  const window = useWindowDimensions()
  return (
    <>
      <Header />
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Start a Chart</Text>
          <Image
            style={styles.tileImage}
            source={require('../assets/icons/arrow.png')}
          />
        </View>
        <View style={styles.searchBarView}>
          <CommonSearch
            placeholder={'Search with Skropay ID or Phone Number'}
          />
        </View>
        <View
          style={{
            height: window.height < 700 ? 315 : 365,
            // marginBottom: 10,
            paddingTop: 10,
            // paddingBottom: 10,
            // top: -10,
            paddingHorizontal: 10,
          }}>
          <FlatList
            // style={{marginBottom: 10}}
            data={Data}
            keyExtractor={(item, index) => item.id}
            //   numColumns={3}
            renderItem={({item}) => {
              // console.log(item)
              return (
                // <View style={styles.list}>
                <View style={styles.innerList}>
                  <View style={styles.imageView}>
                    <Image style={styles.image} source={item.image} />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                  </View>
                  <View style={styles.requestStatusView}>
                    <Text style={styles.requestStatus}>
                      {item.requestStatus}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.chartStatusView}>
                    <Text style={styles.chartStatus}>{item.chartStatus}</Text>
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
