import React, {useState} from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  FlatList,
} from 'react-native'
import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {useHttpClient} from '../../hooks/http-hook'
import UserSearchItem from '../../components/UserSearchItem'

const StartTransaction = () => {
  const {sendRequest} = useHttpClient()
  const [users, setUsers] = useState([])

  const fetchUsers = async (query) => {
    try {
      const response = await sendRequest(
        `https://deliverypay.in/api/getUsers?q=${query}`,
      )
      // setUsers(response)
      console.log(
        response.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
        })),
      )
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  return (
    <>
      <Header />
      <View style={styles.screen}>
        <Text style={styles.heading}>Start transcations with</Text>
        <Text style={styles.heading}>Delivery Pay</Text>
        <Text style={styles.secondHeading}>
          Let us help you make the safest transaction
        </Text>
        <Text style={styles.thirdHeading}>Start buying with Delivery Pay</Text>
        <View style={styles.inputContainer}>
          <Icon name="search" color="#707070" size={25} />
          <TextInput
            placeholder="Search with Delivery Pay ID or Phone Number"
            style={styles.input}
            placeholderTextColor="#707070"
            onChangeText={fetchUsers}
          />
        </View>
        <FlatList
          data={users}
          renderItem={(item) => {
            console.log(item)
            return <Text>hello</Text>
          }}
          // keyboardDismissMode="interactive"
        />
      </View>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    marginTop: 15,
  },
  secondHeading: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  thirdHeading: {
    color: '#3c3cda',

    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    marginTop: 25,
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
    marginBottom: 20,
  },
  input: {
    color: '#707070',
    fontFamily: 'Seoge-UI',
    fontSize: 14,
    flexGrow: 1,
  },
})

export default StartTransaction
