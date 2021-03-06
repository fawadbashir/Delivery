import React, {useEffect, useState} from 'react'
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

import BottomBar from '../components/BottomBar'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../constants/colors'
import {useHttpClient} from '../hooks/http-hook'
import {Modal, Portal} from 'react-native-paper'

const Data = [
  {
    id: '1',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    role: 'Buyer',
    transactionId: '9598464165',
    product: 'Mobile',
    status: 'Released',
  },

  {
    id: '2',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    role: 'Seller',
    transactionId: '9598464165',
    product: 'Mobile',
    status: 'Released',
  },
  {
    id: '3',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    role: 'Buyer',
    transactionId: '9598464165',
    product: 'Mobile',
    status: 'Manual Verification',
  },
  {
    id: '4',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    role: 'Buyer',
    transactionId: '9598464165',
    product: 'Seller',
    status: 'Hold',
  },
  {
    id: '5',
    image: require('../assets/profile.jpg'),
    name: 'Teja Pujari',
    role: 'Seller',
    transactionId: '9598464165',
    product: 'Mobile',
    status: 'Hold',
  },
]
const Hold = (props) => {
  const window = useWindowDimensions()
  const [milestones, setMilestones] = useState([])
  const [milestoneId, setMilestoneId] = useState()
  const [visible, setVisible] = useState(false)

  const {sendRequest, error, clearError, isLoading} = useHttpClient()
  const {
    sendRequest: requestCancel,
    error: cancellationError,
    clearError: clearCancelError,
    isLoading: cancelLoading,
  } = useHttpClient()

  const cancelRequest = async (id) => {
    try {
      const response = await requestCancel(
        'https://deliverypay.in/api/cancelMilestoneReques',
        'DELETE',
        JSON.stringify({
          _id: id,
        }),
        {
          'Content-Type': 'application/json',
        },
      )
      console.log(response)
      if (cancellationError)
        Alert.alert('Error', cancellationError, [
          {
            onPress: () => clearCancelError(),
          },
        ])
    } catch (e) {
      e
    }
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      try {
        const response = await sendRequest(
          'https://deliverypay.in/api/milestone',
        )

        console.log(response)

        const validMileStones = response.milestones.map((milestone) => ({
          id: milestone._id,
          status: milestone.status,
          amount: milestone.amount,
          description: milestone.dscr,
          date: milestone.createdAt,
          firstName: milestone.client.firstName,
          lastName: milestone.client.lastName,
          image: milestone.client.profileImg,
          role: milestone.role,
        }))
        setMilestones(validMileStones)
        if (error) {
          Alert.alert('Error', error, [{onPress: () => clearError()}])
        }
      } catch (e) {
        e
      }
    })

    return unsubscribe
  }, [clearError, error, props.navigation, sendRequest])

  return (
    <>
      <Header />
      <View style={styles.screen}>
        <View style={styles.secureTransactionView}>
          <Text style={styles.secureTransactionTitle}>
            Secure Your transactions
          </Text>
          <Text style={styles.secureTransactionsubTitle}>
            All payments and transactions come here
          </Text>
        </View>
        <View style={styles.listHeading}>
          <Text style={styles.headingText}>Name</Text>
          <Text style={styles.headingText}>Role</Text>
          <Text style={styles.headingText}>TransactionId</Text>
          <Text style={styles.headingText}>Product</Text>
          <Text style={styles.headingText}>Status</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            initialNumToRender={7}
            data={milestones}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return (
                <View>
                  <View style={styles.innerList}>
                    <View style={styles.nameView}>
                      <Image style={styles.image} source={{uri: item.image}} />
                      <Text style={styles.name}>
                        {`${item.firstName}
                        `}
                        {/* ${item.lastName}  */}
                      </Text>
                    </View>
                    <View style={styles.roleView}>
                      <Text style={styles.role}>{item.role}</Text>
                    </View>
                    <View style={styles.transactionIdView}>
                      <Text style={styles.transactionId}>
                        {item.id.substring(0, 9)}
                      </Text>
                    </View>
                    <View style={styles.productView}>
                      <Text style={styles.product}>{item.description}</Text>
                    </View>
                    {(item.status === 'pending' || 'pendingRelease') && (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={cancelRequest.bind(this, item.id)}>
                        {/* <View style={styles.statusView}> */}
                        <LinearGradient
                          colors={
                            item.status == 'Hold'
                              ? ['#336CF9', '#1BE6D6']
                              : ['#1BE6D6', '#013B67']
                          }
                          // start={{x: 0, y: 0}}
                          // end={{x: 1, y: 0}}
                          style={styles.statusView}>
                          <Text style={styles.status}>Release Requested</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                    {item.status === 'declined' && (
                      <TouchableOpacity
                        disabled={true}
                        activeOpacity={0.6}
                        onPress={cancelRequest.bind(this, item.id)}>
                        {/* <View style={styles.statusView}> */}
                        <LinearGradient
                          colors={
                            item.status == 'Hold'
                              ? ['#336CF9', '#1BE6D6']
                              : ['#1BE6D6', '#013B67']
                          }
                          // start={{x: 0, y: 0}}
                          // end={{x: 1, y: 0}}
                          style={styles.statusView}>
                          <Text style={styles.status}>Declined</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* <View style={styles.roleCheckMainView}>
                    <View style={styles.roleCheckView}> */}
                  {/* {item.role == 'Seller' ? (
                        <View>
                          <Text style={styles.roleCheckText}>
                            Are you confrim to release money.
                          </Text>
                          <View style={styles.roleOptions}>
                            <TouchableOpacity>
                              <LinearGradient
                                // colors={['#0A0A0A', '#0091FF', '#BCE0FD']}
                                colors={['#0091FF', '#BCE0FD']}
                                style={styles.statusView}
                                // start={{x: 0, y: 0}}
                                // end={{x: 1, y: 0}}
                              >
                                <Text style={styles.optionText}>Confirm</Text>
                              </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <LinearGradient
                                colors={['#336CF9', '#F64BBD']}
                                style={styles.statusView}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}>
                                <Text style={styles.optionText}>Decline</Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View>
                          <Text style={styles.roleCheckText}>
                            You feel like you are getting scammed?
                          </Text>
                          <View style={styles.roleOptions}>
                            <TouchableOpacity>
                              <LinearGradient
                                colors={['#0091FF', '#BCE0FD']}
                                style={styles.statusView}
                                // start={{x: 0, y: 0}}
                                // end={{x: 1, y: 0}}
                              >
                                <Text style={styles.optionText}>Yes</Text>
                              </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <LinearGradient
                                colors={['#336CF9', '#F64BBD']}
                                style={styles.statusView}
                                // start={{x: 0, y: 0}}
                                // end={{x: 1, y: 0}}
                              >
                                <Text style={styles.optionText}>No</Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )} */}
                  {/* </View>
                  </View> */}
                </View>
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
    // paddingTop: 30,
  },
  secureTransactionView: {
    backgroundColor: '#F9EAF4',
    borderRadius: 10,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureTransactionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    color: '#0D0E0F',
    paddingBottom: 10,
    textAlign: 'center',
  },
  secureTransactionsubTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#707070',
    paddingTop: 10,
    textAlign: 'center',
  },
  listHeading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  headingText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#2020D5',
  },
  list: {
    // marginVertical: 30,
    paddingBottom: 240,
    paddingHorizontal: 10,
    // marginLeft: 10,
    // marginTop: 20,
    // paddingTop: 30,
  },
  innerList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // paddingVertical: 20,
    paddingBottom: 50,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  nameView: {
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#2A2A2A',
    textAlign: 'center',
  },
  roleView: {
    paddingRight: 10,
  },
  role: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#53AEFC',
  },
  transactionId: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#2A2A2A',
  },
  productView: {
    paddingLeft: 15,
    // paddingRight: 5,
  },
  product: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2A2A2A',
  },

  statusView: {
    width: 80,
    // height: 200,
    paddingLeft: 5,
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#1BE6D6',
  },
  status: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#F8FAFF',
  },
  roleCheckMainView: {
    paddingBottom: 50,
    paddingLeft: 100,
    paddingRight: 10,
    // borderRadius: 10,
  },
  roleCheckView: {
    flexDirection: 'row-reverse',
    // width: 100,
    backgroundColor: '#F9EAF4',
    // paddingLeft: 40,
    // marginRight: 100,
    height: 150,
    borderRadius: 10,
    // marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  roleCheckText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#2A2A2A',
  },
  roleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  optionText: {
    color: 'white',
  },
})

export default Hold
