import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {useHttpClient} from '../../hooks/http-hook'
import {ShareDialog} from 'react-native-fbsdk-next'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {ActivityIndicator} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Header from '../../components/Header'
import BottomBar from '../../components/BottomBar'
import colors from '../../constants/colors'
import GroupsPages from '../../components/Seller/GroupsPages'
import AddProductService from '../../components/Seller/AddProductService'

const SingleProductService = (props) => {
  const {sendRequest, error, clearError, isLoading} = useHttpClient()
  const [pagesVisible, setPagesVisible] = useState(false)
  const {
    sendRequest: editRequest,
    error: editError,
    clearError: clearEditError,
    isLoading: editLoading,
  } = useHttpClient()
  const window = useWindowDimensions()
  const [editProductVisible, setEditProductVisible] = useState(false)
  const [product, setProduct] = useState({})
  const shareLinkContent = {
    contentType: 'link',
    contentUrl: `https://deliverypay.in/marketplace/${props.route.params.id}`,
    contentDescription: 'Wow, check out this great site!',
  }

  const onSubmit = async (data) => {
    console.log(data, 'data')
    const body = {
      available: data.available,
      type: data.productType,
      category: data.category,
      name: data.name,
      dscr: data.description,
      price: data.price,
      images: data?.files ? data.files : [],
      gst: 0,
      tags: data.tags,
      discount: {
        type: data.discountType,
        amount: data.discountAmount,
        dscr: data.discountDescription,
      },
      _id: props.route.params.id,
    }

    try {
      const response = await editRequest(
        `https://deliverypay.in/api/addProduct`,
        'PATCH',
        JSON.stringify(body),
        {
          'Content-Type': 'application/json',
        },
      )
      console.log(response)
      if (editError) {
        Alert.alert('Error', editError, [{onPress: () => clearEditError()}])
        console.log(editError)
        return
      }
      Alert.alert('success', response.message, [
        {onPress: () => props.navigation.navigate('shop/productsServices')},
      ])
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const getProduct = async () => {
        const response = await sendRequest(
          `https://deliverypay.in/api/singleProduct?_id=${props.route.params.id}`,
        )
        setProduct(response.product)
        console.log(response)
      }
      getProduct()
    }, [props.route.params.id, sendRequest]),
  )

  return (
    <>
      <GroupsPages
        visible={pagesVisible}
        onDismiss={() => setPagesVisible(false)}
      />
      {product != null ? (
        <AddProductService
          isLoading={isLoading}
          open={editProductVisible}
          onDismiss={setEditProductVisible}
          categories={props.route.params.categories}
          onSubmit={onSubmit}
          product={product}
          id={props.route.params.id}
        />
      ) : null}
      <Header />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.screen}>
          <SwiperFlatList
            style={{flex: 1}}
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={0}
            showPagination
            data={product.images}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={{width: window.width}} />
            )}
          />
        </View>
        {isLoading && <ActivityIndicator color={colors.primary} />}

        <View style={styles.detail}>
          {product && <Text style={styles.title}>{product.name}</Text>}
          {product && <Text style={styles.description}>{product.dscr}</Text>}
          {product && (
            <Text style={styles.price}>
              Available :{' '}
              <Text style={{fontFamily: 'Poppins'}}>{product.price}</Text>
            </Text>
          )}
          {product && (
            <Text style={styles.price}>Price: ₹{product.available}</Text>
          )}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setEditProductVisible(true)}>
              <Icon color={'white'} name="edit" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon color={'white'} name="delete" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon color={'white'} name="share" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.cartButton}
              onPress={() => {
                ShareDialog.canShow(shareLinkContent)
                  .then(function (canShow) {
                    if (canShow) {
                      return ShareDialog.show(shareLinkContent)
                    }
                  })
                  .then(
                    function (result) {
                      if (result.isCancelled) {
                        console.log('Share cancelled')
                      } else {
                        console.log(
                          'Share success with postId: ' + result.postId,
                        )
                      }
                    },
                    function (error) {
                      console.log('Share fail with error: ' + error)
                    },
                  )
              }}>
              <Text style={styles.cardButtonText}>Post on Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => setPagesVisible(true)}>
              <Text style={styles.cardButtonText}>Share on Social Media</Text>
            </TouchableOpacity>
          </View>

          {/* <Text style={styles.price}>{product.}</Text> */}
          {product.user && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                minWidth: '80%',
              }}>
              {product && (
                <Text style={styles.shopDetail}> Being Sold By: </Text>
              )}
              <Image
                source={{uri: product.user.shopInfo.logo}}
                style={{width: 40, height: 40}}
              />
              {product && (
                <Text style={styles.shopDetail}>
                  {product?.user.shopInfo.name}
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <BottomBar />
      {/* <Image source={{uri: product.}} /> */}
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },

  detail: {
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginTop: 10,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cartButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  cardButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  shopDetail: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  iconButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 100,
    marginRight: 10,
  },
})

export default SingleProductService
