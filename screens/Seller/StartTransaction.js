import React, {useState} from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  FlatList,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native'
import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {useHttpClient} from '../../hooks/http-hook'
import UserSearchItem from '../../components/UserSearchItem'
import CommonSearch from '../../components/CommonSearch'

const StartTransaction = () => {
  const {sendRequest} = useHttpClient()
  const [users, setUsers] = useState([])
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
    } catch (e) {}
  }

  return (
    <>
      <KeyboardAvoidingView keyboardVerticalOffset={1} behavior={'position'}>
        <Header />
        <View style={styles.screen}>
          {/* <KeyboardAvoidingView
            contentContainerStyle={styles.screen}
            behavior={'position'}> */}
          <Text style={styles.heading}>Start transcations with</Text>
          <Text style={styles.heading}>Delivery Pay</Text>
          <Text style={styles.secondHeading}>
            Let us help you make the safest transaction
          </Text>
          <Text style={styles.thirdHeading}>
            Start selling with Delivery Pay
          </Text>
          {/* <View style={styles.inputContainer}>
            <Icon name="search" color="#707070" size={25} />
            <TextInput
              placeholder="Search with Delivery Pay ID or Phone Number"
              style={styles.input}
              placeholderTextColor="#707070"
              onChangeText={fetchUsers}
            />
          </View> */}
          <CommonSearch
            placeholder="Search with Delivery Pay ID or Phone Number"
            onChangeText={fetchUsers}
          />
          {/* </KeyboardAvoidingView> */}
          <View
            style={{
              height: window.height < 700 ? 182 : 200,
              // paddingHorizontal: 20,
            }}>
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
                    milestoneType="Request"
                  />
                )
              }}
              // keyboardDismissMode="interactive"
            />
          </View>
        </View>
        {/* <View style={{bottom: 0, top: -20}}> */}
      </KeyboardAvoidingView>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    // flexGrow: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    // paddingBottom: 10,
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    // marginTop: 5,
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
    // marginBottom: 20,
  },
  input: {
    color: '#707070',
    fontFamily: 'Seoge-UI',
    fontSize: 14,
    flexGrow: 1,
  },
})

export default StartTransaction
