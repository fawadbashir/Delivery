import React, {useState, useEffect} from 'react'
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'

import {useHttpClient} from '../../hooks/http-hook'
import UserSearchItem from '../../components/UserSearchItem'
import CommonSearch from '../../components/CommonSearch'
import {Avatar} from 'react-native-paper'

const StartTransaction = () => {
  const {sendRequest, error, clearError} = useHttpClient()
  const [users, setUsers] = useState([])
  const [payments, setPayments] = useState([])
  const window = useWindowDimensions()

  const fetchUsers = async (query) => {
    if (query === '') {
      return setUsers([])
    }
    try {
      const response = await sendRequest(
        `https://deliverypay.in/api/getUsers?q=${query}`,
      )

      setUsers(
        response.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.profileImg,
          id: user._id,
        })),
      )

      // eslint-disable-next-line no-empty
    } catch (e) {
      // Alert.alert('Error', error, [{onPress: clearError(), text: 'Okay'}])
    }
  }

  useEffect(() => {
    const getRecentPayments = async () => {
      try {
        const response = await sendRequest(
          'https://deliverypay.in/api/recentPayments',
        )

        console.log(response)
        setPayments(response)
      } catch (e) {
        e
      }
    }
    getRecentPayments()
  }, [sendRequest])

  return (
    <>
      <KeyboardAvoidingView keyboardVerticalOffset={1} behavior={'position'}>
        <Header />
        <View style={styles.screen}>
          <Text style={styles.heading}>Start transcations with</Text>
          <Text style={styles.heading}>Delivery Pay</Text>
          <Text style={styles.secondHeading}>
            Let us help you make the safest transaction
          </Text>
          <Text style={styles.thirdHeading}>
            Start buying with Delivery Pay
          </Text>

          <CommonSearch
            placeholder="Search with Delivery Pay ID or Phone Number"
            onChangeText={fetchUsers}
          />

          <View
            style={{
              height: window.height < 700 ? 182 : 255,
            }}>
            {users.length > 1 ? (
              <FlatList
                style={{paddingHorizontal: 10}}
                data={users}
                key={(item) => item.id}
                renderItem={(itemData) => {
                  return (
                    <UserSearchItem
                      image={itemData.item.image}
                      firstName={itemData.item.firstName}
                      lastName={itemData.item.lastName}
                      milestoneType="Create"
                    />
                  )
                }}
              />
            ) : (
              <View style={styles.paymentsView}>
                {payments.map((payment) => (
                  <View style={{alignItems: 'center'}} key={payment._id}>
                    <Avatar.Image source={{uri: payment.profileImg}} />
                    <Text
                      style={{
                        fontSize: 16,
                      }}>{`${payment.firstName} ${payment.lastName}`}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
  },
  secondHeading: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  thirdHeading: {
    color: '#3c3cda',

    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    marginTop: 15,
  },
  inputContainer: {
    width: '90%',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#5ab1fc',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 25,
  },
  input: {
    color: '#707070',
    fontFamily: 'Seoge-UI',
    fontSize: 14,
    flexGrow: 1,
  },
  paymentContainer: {},
  paymentsView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
})

export default StartTransaction
