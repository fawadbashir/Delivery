import React, {useCallback, useEffect, useState} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'
import ProductServiceItem from '../../components/Seller/ProductServiceItem'
import AddProductService from '../../components/Seller/AddProductService'
import moment from 'moment'
import colors from '../../constants/colors'
import {useHttpClient} from '../../hooks/http-hook'
import {useFocusEffect} from '@react-navigation/native'
import {DatePickerModal} from 'react-native-paper-dates'
import {Picker} from '@react-native-picker/picker'
import CommonSearch from '../../components/CommonSearch'

const ProductsServices = (props) => {
  const window = useWindowDimensions()
  // const [BatchVisible, setBatchVisible] = useState(false)
  const {sendRequest, error, clearError, isLoading} = useHttpClient()
  // const {
  //   sendRequest: batchRequest,
  //   error: batchError,
  //   clearError: clearBatchError,
  //   isLoading: batchUploading,
  // } = useHttpClient()
  const [search, setSearch] = useState('')
  const [range, setRange] = useState()
  const [addProductVisible, setAddProductVisble] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [category, setCategory] = useState('')

  const getProducts = useCallback(async () => {
    const startDate = moment(range?.startDate).format('YYYY-MM-DD')
    const endDate = moment(range?.endDate).format('YYYY-MM-DD')
    try {
      const response = await fetch(
        `https://deliverypay.in/api/products?${new URLSearchParams({
          user: 'seller',
          ...(search && {q: search}),

          ...(range && {
            dateFrom: startDate,
            dateTo: endDate,
          }),
          ...(category && {category}),
        })}`,
      )

      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.message)
      }
      console.log(resData)
      setProducts(resData.products)
    } catch (e) {
      alert('Error', e)
    }
  }, [range, search, category])

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
        `https://deliverypay.in/api/addProduct`,
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
  const onDismiss = React.useCallback(() => {
    setCalendarOpen(false)
  }, [setCalendarOpen])

  const onConfirm = React.useCallback(({startDate, endDate}) => {
    setCalendarOpen(false)
    setRange({startDate, endDate})

    // params.append('dateFrom', moment(startDate).format('YYYY-DD-MM'))
    // params.append('dateTo', moment(endDate).format('YYYY-DD-MM'))
    // dateFrom=2021-09-02&dateTo=2021-09-26
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

      <DatePickerModal
        disablecategoryBar
        animationType="slide"
        locale={'en'}
        mode="range"
        visible={calendarOpen}
        onDismiss={onDismiss}
        startDate={range?.startDate}
        endDate={range?.endDate}
        onConfirm={onConfirm}
      />
      <KeyboardAvoidingView behavior="padding">
        <Header />
        {/* <View style={styles.listHeader}>
        <Text style={styles.heading}>Product Management</Text> */}

        {/* <TouchableOpacity
              style={styles.button}
              onPress={setBatchVisible.bind(this, true)}>
              <Text style={styles.buttonText}>Batch Upload</Text>
            </TouchableOpacity> */}
        {/* </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <CommonSearch
            style={{borderRadius: 10, width: '80%', marginTop: 0}}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
          <TouchableOpacity onPress={() => setCalendarOpen(true)}>
            <Icon name="calendar-today" color={colors.blue} size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              // alignItems: 'center',
              alignSelf: 'center',
              marginBottom: 10,
              width: '60%',
            }}>
            <Picker
              style={{
                backgroundColor: '#fff',
                borderRadius: 30,
              }}
              mode="dropdown"
              selectedValue={category}
              onValueChange={(itemValue) => {
                setCategory(itemValue)
              }}>
              {categories &&
                categories.map((item) => (
                  <Picker.Item key={item} value={item} label={item} />
                ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={setAddProductVisble.bind(this, true)}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: window.height < 700 ? 295 : 365}}>
          <FlatList
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
                  props.navigation.navigate('shop/singleProduct', {
                    id: item._id,
                  })
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
        </View>
        <BottomBar />
      </KeyboardAvoidingView>
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
    height: 50,
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
