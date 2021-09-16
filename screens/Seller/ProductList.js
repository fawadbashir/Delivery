import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import CommonSearch from '../../components/CommonSearch'
import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'
import {useHttpClient} from '../../hooks/http-hook'
import ProductItem from '../../components/ProductItem'

const ProductList = ({navigation}) => {
  const {query, setQuery} = useState('')
  const {sendRequest, isLoading, error, clearError} = useHttpClient()
  const [products, setProducts] = useState([])

  const getProducts = useCallback(async () => {
    try {
      const response = await sendRequest(
        `https://deliverypay.in/api/getProducts?seller=60f1f3e065c83205eb57c392&perPage=20&sort=createdAt&order=dsc&category=Electronics&page=1`,
      )

      console.log(response)
      setProducts(response.products)
    } catch (e) {
      e
    }
  }, [sendRequest])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(item) => item._id}
        data={products}
        renderItem={({item}) => (
          <ProductItem
            name={item.name}
            uri={item.images[0]}
            price={item.price}
            onPress={() =>
              navigation.navigate('singleProduct', {
                id: item._id,
              })
            }
          />
        )}
        ListHeaderComponent={
          <>
            <Header />
            <CommonSearch style={{alignSelf: 'center'}} />
          </>
        }
      />
      <BottomBar />
    </View>
  )
}

export default ProductList
