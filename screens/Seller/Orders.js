import React, {useEffect, useState, useCallback, useMemo} from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
} from 'react-native'
import {URL} from 'react-native-url-polyfill'

import BottomBar from '../../components/BottomBar'
import Header from '../../components/Header'
import {useHttpClient} from '../../hooks/http-hook'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import {ActivityIndicator, Portal, Modal} from 'react-native-paper'
import colors from '../../constants/colors'
import CommonSearch from '../../components/CommonSearch'
import DateRangePicker from 'react-native-daterange-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Picker} from '@react-native-picker/picker'

const url = new URL('https://deliverypay.in/api/getOrders?user=seller')
const Orders = ({navigation}) => {
  const {sendRequest, error, isLoading, clearError} = useHttpClient()
  const [orders, setOrders] = useState([])
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [date, setDate] = useState()
  const [displayedDate] = useState(moment())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [status, setStatus] = useState('')

  const getOrders = useCallback(async () => {
    try {
      const response = await sendRequest(url)

      const validOrders = response.orders.map((order) => ({
        id: order._id,
        total: order.total,
        purchaseDate: moment(order.createdAt).format('DD MMM YYYY'),
        status: order.status,
      }))
      setOrders(validOrders)

      console.log(response)
      console.log(error)
    } catch (e) {
      e
    }
  }, [error, sendRequest])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const requestCancellation = async () => {
    try {
      const response = await fetch(
        'https://deliverypay.in/api/requestCancellation',
        {
          method: 'PATCH',
          body: JSON.stringify({
            _id: orderId,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      const resData = await response.json()
      if (!response.ok) {
        console.log(JSON.stringify(resData))
        throw new Error(resData)
      }
      Alert.alert('Success', resData.message)
    } catch (e) {
      console.log(e)
      Alert.alert('Error', e.message)
    }
  }

  const detailModal = () => {
    return (
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={styles.modalContainer}
          dismissable={true}
          onDismiss={() => setVisible(false)}>
          <View style={styles.modalHeadingContainer}>
            <Text style={styles.modalHeading}>Order Actions</Text>
          </View>
          <View>
            <LinearGradient
              colors={['#2598b6', '#1be6d6']}
              end={{x: 1, y: 2}}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('orders/summary', {id: orderId})
                  setVisible(false)
                }}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#2598b6', '#1be6d6']}
              end={{x: 1, y: 2}}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  requestCancellation()
                  setVisible(false)
                }}>
                <Text style={styles.buttonText}>request Cancellation</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>
      </Portal>
    )
  }

  return (
    <>
      {detailModal()}

      <Header />
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <CommonSearch style={{borderRadius: 10, width: '80%', marginTop: 0}} />
        <DateRangePicker
          onChange={(dates) => {
            console.log(dates)
            setDate((prev) => ({...prev, ...dates}))
          }}
          backdropStyle={{
            flexGrow: 1,
          }}
          displayedDate={displayedDate}
          range={true}
          startDate={date?.startDate}
          endDate={date?.endDate}
          moment={moment}>
          <Icon name="calendar-today" color={colors.blue} size={30} />
        </DateRangePicker>
      </View>
      <View
        style={{
          // alignItems: 'center',
          alignSelf: 'center',
          marginBottom: 10,
          width: 300,
        }}>
        <Picker
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
          }}
          mode="dropdown"
          selectedValue={status}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
          {[
            'pending',
            'approved',
            'cancelled',
            'hold',
            'shipped',
            'delivered',
            'refund',
          ].map((status) => (
            <Picker.Item key={status} value={status} label={status} />
          ))}
        </Picker>
      </View>
      <View style={styles.orderItemContainer}>
        <Text style={styles.order}>Order</Text>
        <Text style={styles.order}>Purchase Date</Text>
        <Text style={styles.order}>Total</Text>
        <Text style={styles.order}>Status</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator
          color={colors.primary}
          style={{flexGrow: 1, backgroundColor: 'white'}}
        />
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <View style={styles.emptyListView}>
              <Text style={styles.emptyListText}>
                There are no orders. How about starting adding some?
              </Text>
            </View>
          }
          style={{backgroundColor: 'white'}}
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.orderItemContainer}
              onPress={() => {
                setVisible(true)
                setOrderId(itemData.item.id)
              }}>
              <Text style={styles.order}>
                {itemData.item?.id.substring(0, 10)}
              </Text>
              <Text style={styles.order}>{itemData.item.purchaseDate}</Text>
              <Text style={styles.order}>₹{itemData.item.total}</Text>
              <Text style={styles.order}>{itemData.item.status}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  orderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',

    paddingVertical: 15,
  },
  order: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyListView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  modalHeadingContainer: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 2,
    width: '100%',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },

  modalContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 20,
  },
  button: {
    // width: '40%',
    borderRadius: 50,
    marginVertical: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
})

export default Orders
