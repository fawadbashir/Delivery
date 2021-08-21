import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native'
import {BarChart} from 'react-native-chart-kit'

import Colors from '../constants/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CreditCard from '../components/CreditCard'

import LinearGradient from 'react-native-linear-gradient'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [
        75 * 10,
        Math.random() * 100,
        Math.random() * 100,
        95 * 100,
        Math.random() * 100,
        25 * 100,
        Math.random() * 100,
      ],
      color: '#ACC4FF',
    },
  ],
}

const Wallet = () => {
  const window = useWindowDimensions()

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.bluebackground}>
        <View style={styles.topRow}>
          <View style={styles.userInfoView}>
            <TouchableOpacity style={styles.personButton} activeOpacity={0.6}>
              <Icon name="person" color="#2699FB" size={30} />
            </TouchableOpacity>
            <View style={styles.userTextContainer}>
              <Text style={[styles.userText, {fontFamily: 'Poppins-Light'}]}>
                Hello
              </Text>
              <Text style={styles.userText}>Swati Mishra</Text>
            </View>
          </View>
          <Icon name="person" color="#2699FB" size={30} />
        </View>
        <Text style={styles.heading}>Wallet Balance</Text>
        <Text style={styles.balance}>₹0</Text>
      </View>
      <View style={styles.whiteBackground}>
        <View style={styles.paymentMethodContainer}>
          <TouchableOpacity>
            <Image
              source={require('../assets/addpayment.png')}
              style={{width: 21, height: 21}}
            />
          </TouchableOpacity>
          <View style={{top: -20}}>
            <CreditCard />
          </View>
          <TouchableOpacity>
            <Image
              source={require('../assets/nextpayment.png')}
              style={{width: 21, height: 21}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.analytics}>Analytics</Text>
        <BarChart
          data={data}
          width={window.width} // from react-native
          height={220}
          yAxisLabel="₹"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          withInnerLines={false}
          // withCustomBarColorFromData={true}
          flatColor={true}
          withHorizontalLabels={false}
          showBarTops={false}
          chartConfig={{
            backgroundColor: '#000',
            propsForHorizontalLabels: {
              fontFamily: 'Poppins-Regular',
            },
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2, // optional, defaults to 2dp
            stackedBar: false,
            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            fillShadowGradient: '#ACC4FF',
            fillShadowGradientOpacity: 1,
            backgroundGradientFromOpacity: 1,
            backgroundGradientToOpacity: 1,

            style: {},

            propsForLabels: {
              disabled: true,
            },
          }}
          // bezier
          style={{
            // marginVertical: 8,
            // paddingLeft: -20,
            paddingRight: 20,
            borderRadius: 16,
          }}
        />
        {/* Add Money View */}
        <View style={{...styles.moneyView, backgroundColor: '#e7f6fc'}}>
          <Text style={styles.moneyViewHeading}>Add Money</Text>
          <View style={styles.moneyActions}>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySybmol}>₹</Text>
              <TextInput
                placeholder="Enter Amount"
                keyboardType={'number-pad'}
                style={styles.amountInput}
              />
            </View>
            <TouchableOpacity style={{width: 82}} activeOpacity={0.6}>
              <LinearGradient
                colors={['#0091FF', '#0A425D']}
                style={styles.moneyProceedButton}>
                <Text style={styles.proceedText}>Proceed</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/* Withdraw View */}
        <View style={[styles.moneyView, {backgroundColor: '#f9eaf4'}]}>
          <Text style={styles.moneyViewHeading}>Withdraw</Text>
          <View style={styles.moneyActions}>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySybmol}>₹</Text>
              <TextInput
                placeholder="Enter Amount"
                keyboardType={'number-pad'}
                style={styles.amountInput}
              />
            </View>
            <TouchableOpacity style={{width: 82}} activeOpacity={0.6}>
              <LinearGradient
                colors={['#336CF9', '#F64BBD']}
                start={{x: -1, y: 0}}
                end={{x: 1, y: 3}}
                style={styles.moneyProceedButton}>
                <Text style={styles.proceedText}>Proceed</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.transactionView} activeOpacity={0.4}>
          <Text
            style={{
              fontFamily: 'Poppins Regular',
              fontSize: 18,
            }}>{`See all transaction history & Rewards `}</Text>
          <Image
            source={require('../assets/nextpayment.png')}
            style={{width: 21, height: 21}}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 30,
  },
  bluebackground: {
    // height: '35%',
    flex: 1,
    backgroundColor: Colors.lightBlue,
    paddingTop: 15,
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  whiteBackground: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    // borderWidth: 10,
    backgroundColor: 'white',
    top: -20,
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  userInfoView: {
    flexDirection: 'row',
  },
  personButton: {
    backgroundColor: '#fff',
    // padding: 10,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
    width: 47,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTextContainer: {
    marginLeft: 10,
  },
  userText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  heading: {
    fontFamily: 'Poppins-Light',
    fontSize: 24,
    marginTop: 20,
  },
  balance: {
    fontFamily: 'Poppins-Regular',
    fontSize: 40,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  analytics: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginRight: 20,
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  moneyView: {
    width: '70%',
    height: 165,
    alignSelf: 'center',
    borderRadius: 30,
    padding: 20,

    marginTop: 20,
  },
  moneyViewHeading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 23,
    marginLeft: 30,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySybmol: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  amountInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    flexBasis: '60%',
  },
  moneyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  moneyProceedButton: {
    // paddingVertical: 10,
    height: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 14,
  },
  transactionView: {
    marginTop: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
})

export default Wallet