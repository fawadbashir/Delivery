import React, {useState} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native'
import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'
import {useForm} from 'react-hook-form'
import ShopDetails from '../../components/Seller/ShopDetails'
import Categories from '../../components/Seller/Categories'
import GST from '../../components/Seller/GST'
import PaymentMethod from '../../components/Seller/PaymentMethod'
import ShippingDelivery from '../../components/Seller/ShippingDelivery'
import PolicyTerms from '../../components/Seller/PolicyTerms'

const Settings = () => {
  const window = useWindowDimensions()
  return (
    <>
      <Header />
      <View style={{height: window.height < 700 ? 314 : 500}}>
        <ScrollView>
          <ShopDetails />
          <Categories />
          <GST />
          <PaymentMethod />
          <ShippingDelivery />
          <PolicyTerms />
        </ScrollView>
      </View>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({})

export default Settings
