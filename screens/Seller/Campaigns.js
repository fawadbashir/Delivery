import React, {useCallback, useEffect, useState} from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
} from 'react-native'

import BottomBar from '../../components/BottomBar'
import Header from '../../components/Header'
import {useHttpClient} from '../../hooks/http-hook'
import moment from 'moment'
import {ActivityIndicator} from 'react-native-paper'
import colors from '../../constants/colors'
import CouponModal from '../../components/CouponModal'

const Campaigns = ({navigation}) => {
  const {sendRequest, error, isLoading, clearError} = useHttpClient()
  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState()
  const [campaigns, setCampaigns] = useState([])
  const goToOrder = (id) => navigation.navigate('orders/summary', {id})

  const getCoupons = useCallback(async () => {
    setLoading(true)

    try {
      const response = await fetch(
        'https://deliverypay.in/api/getCoupons?page=1&perPage=20&sort=createdAt',
        {
          method: 'GET',
        },
      )
      const resData = await response.json()
      if (!response.ok) {
        throw new Error(resData.message)
      }

      console.log(resData.coupons, 'coupons')
      const validOrders = resData.coupons.map((coupon) => ({
        id: coupon._id,
        title: coupon.title,
        date: moment(coupon.createdAt).format('DD MMM YYYY'),
        code: coupon.code,
        discount: coupon.amount,
        maxDiscount: coupon.maxDiscount,
        threshold: coupon.threshold,
        accept: coupon.accept,
        status: coupon.status,
        validity: `${moment(coupon.date.to).format('DD MMM YYYY')}-${moment(
          coupon.date.from,
        ).format('DD MMM YYYY')}`,
      }))
      console.log(validOrders)
      setCampaigns(validOrders)
    } catch (e) {
      alert('Error', e.message)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getCoupons()
  }, [getCoupons])

  const acceptCoupon = async () => {
    try {
      console.log(coupon)

      const response = await sendRequest(
        `https://deliverypay.in/api/declineCoupon`,
        'POST',
        JSON.stringify({
          _id: coupon.id,
        }),
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      )
      if (error) {
        return Alert.alert('Error', error, [{onPress: () => clearError()}])
      }
      Alert.alert('Success', 'Coupon Activated')
      setCoupon((prev) => ({...prev, accept: true}))
      getCoupons()

      console.log(response)
    } catch (e) {
      e
    }
  }
  const declineCoupon = async () => {
    try {
      console.log(coupon)

      const response = await sendRequest(
        `https://deliverypay.in/api/declineCoupon`,
        'POST',
        JSON.stringify({
          _id: coupon.id,
        }),
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      )
      if (error) {
        return Alert.alert('Error', error, [{onPress: () => clearError()}])
      }
      Alert.alert('Success', 'Coupon Disabled')

      setCoupon((prev) => ({...prev, accept: false}))
      getCoupons()

      console.log(response)
    } catch (e) {
      e
    }
  }

  return (
    <>
      {coupon && (
        <CouponModal
          open={!!coupon}
          coupon={coupon}
          setCoupon={setCoupon}
          acceptCoupon={coupon?.accept === false ? acceptCoupon : declineCoupon}
          isLoading={isLoading}
        />
      )}

      <Header />

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
                There are no campaigns available.
              </Text>
            </View>
          }
          data={campaigns}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <TouchableOpacity
              style={styles.itemContainer}
              activeOpacity={0.6}
              onPress={() => setCoupon(itemData.item)}>
              <View style={styles.orderItemContainer}>
                <View>
                  <Text style={styles.order}>Date</Text>
                  <Text style={styles.order}>{itemData.item.date}</Text>
                </View>
                <View>
                  <Text style={styles.order}>Title</Text>
                  <Text style={styles.order}>{itemData.item.title}</Text>
                </View>
                <View>
                  <Text style={styles.order}>Status</Text>
                  <Text style={styles.order}>{itemData.item.status}</Text>
                </View>

                <View>
                  <Text style={styles.order}>Code</Text>
                  <Text style={styles.order}>{itemData.item.code}</Text>
                </View>
              </View>
              <View style={styles.orderItemContainer}>
                <View>
                  <Text style={styles.order}>Discount</Text>

                  <Text style={styles.order}>
                    {`${itemData.item.discount}%`}
                  </Text>
                  <Text style={{fontSize: 12, textAlign: 'center'}}>
                    {`Up To ₹${itemData.item.maxDiscount}`}
                  </Text>
                </View>
                <View>
                  <Text style={styles.order}>Threshold</Text>
                  <Text style={styles.order}>{itemData.item.threshold}</Text>
                </View>
                <View>
                  <Text style={styles.order}>Validity</Text>
                  <Text style={[styles.order, {fontSize: 14}]}>
                    {itemData.item.validity}
                  </Text>
                </View>

                <View>
                  <Text style={styles.order}>Accept</Text>
                  <Text style={styles.order}>
                    {itemData.item.accept === true ? 'Yes' : 'No'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {/* </ScrollView> */}
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  orderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingVertical: 15,
  },
  order: {
    marginHorizontal: 10,
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
  itemContainer: {
    backgroundColor: '#BCE0FD',
    width: '100%',
    elevation: 5,
    marginTop: 10,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    borderRadius: 10,
  },
})

export default Campaigns
