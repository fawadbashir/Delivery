import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import {Card, RadioButton} from 'react-native-paper'
import UpiCard from '../components/UpiCard'
import Header from '../components/Header'
import BottomBar from '../components/BottomBar'

import LinearGradient from 'react-native-linear-gradient'
import {useForm} from 'react-hook-form'
import DebitCardForm from '../components/DebitCardForm'
import Banking from '../components/Banking'

const PaymentMethod = () => {
  const [method, setMethod] = useState('upi')
  const window = useWindowDimensions()

  const onSubmit = () => {}
  return (
    <View>
      <Header />
      <ScrollView
        style={[styles.mainView, {height: window.height < 700 ? 342 : 504}]}>
        <Text style={styles.heading}>Add Money</Text>
        <View style={styles.optionView}>
          <RadioButton
            value="upi"
            color="#2699fb"
            status={method === 'upi' ? 'checked' : 'unchecked'}
            onPress={() => setMethod('upi')}
          />
          <Text style={styles.methodText}>UPI</Text>
        </View>

        {method === 'upi' && <UpiCard style={{marginVertical: 20}} />}
        <View style={styles.optionView}>
          <RadioButton
            value="card"
            color="#2699fb"
            status={method === 'card' ? 'checked' : 'unchecked'}
            onPress={() => setMethod('card')}
          />

          <Text style={styles.methodText}>Add Debit/Credit Card</Text>
        </View>
        {method === 'card' && <DebitCardForm />}
        <View style={styles.optionView}>
          <RadioButton
            value="banking"
            color="#2699fb"
            status={method === 'banking' ? 'checked' : 'unchecked'}
            onPress={() => setMethod('banking')}
          />

          <Text style={styles.methodText}>Net Banking</Text>
        </View>
        {method === 'banking' && <Banking />}
      </ScrollView>
      <BottomBar />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    color: '#4075f9',

    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    marginTop: 15,
  },
  mainView: {
    // paddingHorizontal: 10,
    paddingHorizontal: 10,
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
  },
  upiCard: {
    backgroundColor: '#f8faff',
    width: '100%',
    height: 170,
    borderRadius: 10,
    padding: 20,
  },
  upiText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  upiFieldContainer: {
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d8d9da',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
})

export default PaymentMethod
