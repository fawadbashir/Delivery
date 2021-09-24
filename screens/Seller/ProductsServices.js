import React, {useCallback, useEffect, useState} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'

import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'
import ProductServiceItem from '../../components/Seller/ProductServiceItem'
import AddProductService from '../../components/Seller/AddProductService'
import moment from 'moment'
import colors from '../../constants/colors'
import {useHttpClient} from '../../hooks/http-hook'
import {useFocusEffect} from '@react-navigation/native'

const ProductsServices = (props) => {
  const [BatchVisible, setBatchVisible] = useState(false)
  const {sendRequest, error, clearError, isLoading} = useHttpClient()
  const {
    sendRequest: batchRequest,
    error: batchError,
    clearError: clearBatchError,
    isLoading: batchUploading,
  } = useHttpClient()
  const [addProductVisible, setAddProductVisble] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const getProducts = useCallback(async () => {
    try {
      const response = await fetch('https://deliverypay.in/api/products')

      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.message)
      }
      console.log(resData)
      setProducts(resData.products)
    } catch (e) {
      alert('Error', e)
    }
  }, [])

  const onSubmit = async (data) => {
    const body = {
      available: data.available,
      type: data.productType,
      category: data.category,
      name: data.name,
      dscr: data.description,
      price: data.price,
      images: data.files.length > 0 ? data.files : [],
      gst: 0,
      tags: data.tags,
      discount: {
        type: data.discountType,
        amount: data.discountAmount,
        dscr: data.discountDescription,
      },
    }
    console.log(data)
    console.log(body)
    try {
      const response = await sendRequest(
        'https://deliverypay.in/api/addProduct',
        'POST',
        JSON.stringify(body),
        {
          'Content-Type': 'application/json',
        },
      )
      console.log(response)
      if (error) {
        console.log(error)
      }
    } catch (e) {
      e
    }
  }
  // const uploadBatch = async (data) => {
  //   try {
  //     const response = await batchRequest(
  //       'https://deliverypay.in/api/addProduct',
  //       'POST',
  //       // JSON.stringify(body),
  //       {
  //         'Content-Type': 'application/json',
  //       },
  //     )
  //     console.log(response)
  //     console.log(error)
  //   } catch (e) {
  //     e
  //   }
  // }

  useFocusEffect(
    useCallback(() => {
      getProducts()
      getCategories()
    }, [getCategories, getProducts]),
  )
  const getCategories = useCallback(async () => {
    try {
      const response = await fetch('https://deliverypay.in/api/categories')
      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.message)
      }

      setCategories(resData.categories)
    } catch (e) {
      Alert.alert(e)
    }
  }, [])

  return (
    <>
      {/* <AddBatchUpload
        open={BatchVisible}
        onDismiss={setBatchVisible}
        onSubmit={uploadBatch}
      /> */}
      <AddProductService
        isLoading={isLoading}
        open={addProductVisible}
        onDismiss={setAddProductVisble}
        categories={categories}
        onSubmit={onSubmit}
      />
      <Header />
      <FlatList
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.heading}>Product Management</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={setAddProductVisble.bind(this, true)}>
              <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={setBatchVisible.bind(this, true)}>
              <Text style={styles.buttonText}>Batch Upload</Text>
            </TouchableOpacity> */}
          </View>
        }
        data={products}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View>
            <Text>No Products or Services Available</Text>
          </View>
        }
        renderItem={({item}) => (
          <ProductServiceItem
            onPress={() => {
              props.navigation.navigate('shop/singleProduct', {id: item._id})
            }}
            image={item.images[0]}
            date={moment(item.createAt).format('DD MM YY')}
            name={item.name}
            type={item.type}
            fbMarketId={item.fbMarketId}
            available={item.available}
            price={item.price}
            gst={item.gst}
            discount={item.discount}
          />
        )}
      />
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Regulat',
    fontSize: 15,
    color: '#fff',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // padding: 10,
    paddingTop: 5,
  },
  heading: {
    fontSize: 17,
  },
})

export default ProductsServices
