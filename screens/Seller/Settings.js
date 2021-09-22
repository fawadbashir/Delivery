import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
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
  return (
    <>
      <Header />
      <ScrollView>
        <ShopDetails />
        <Categories />
        <GST />
        <PaymentMethod />
        <ShippingDelivery />
        <PolicyTerms />
      </ScrollView>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({})

export default Settings
