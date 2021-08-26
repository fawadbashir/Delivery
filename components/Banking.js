import React from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
import {Card} from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import {Controller, useForm} from 'react-hook-form'

const Banking = (props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const onSubmit = (data) => {
    props.onSubmit(data)
    console.log(data, 'data')
  }
  console.log(errors)

  return (
    <Card style={styles.card}>
      <Controller
        name="name"
        control={control}
        rules={{required: true, pattern: /^([\w]{3,})+\s+([\w\s]{3,})+$/i}}
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={[styles.field, errors.fullName && styles.redBorder]}
            placeholder="Full Name"
          />
        )}
      />
      <Controller
        control={control}
        name="bank"
        rules={{required: true}}
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={[styles.field, errors.bank && styles.redBorder]}
            placeholder="Bank"
          />
        )}
      />
      <View>
        <Controller
          name="city"
          control={control}
          rules={{required: true}}
          render={({field: {value, onChange}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              style={[styles.field, errors.city && styles.redBorder]}
              placeholder="City"
            />
          )}
        />
      </View>
      <Controller
        name="accountType"
        control={control}
        rules={{required: true}}
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={[styles.field, errors.accountType && styles.redBorder]}
            placeholder="Account Type i.e Savings/Current"
          />
        )}
      />
      <Controller
        name="accountNumber"
        control={control}
        rules={{required: true, minLength: 16, maxLength: 16}}
        render={({field: {value, onChange}}) => (
          <TextInput
            spellCheck={false}
            value={value}
            onChangeText={onChange}
            style={[styles.field, errors.accountNumber && styles.redBorder]}
            placeholder="Account Number"
          />
        )}
      />

      <Controller
        control={control}
        name="ifsc"
        rules={{required: true}}
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={[styles.field, errors.ifsc && styles.redBorder]}
            placeholder="IFSC"
          />
        )}
      />

      <TouchableOpacity activeOpacity={0.6} onPress={handleSubmit(onSubmit)}>
        <LinearGradient
          colors={['#336CF9', '#1BE6D6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            alignSelf: 'center',
            width: '80%',
            height: 40,
            justifyContent: 'center',
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Poppins-Regular',
            }}>
            Save
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8faff',
    width: '95%',
    alignSelf: 'center',
    // paddingBottom: 10,
    padding: 20,
    marginBottom: 10,
    justifyContent: 'center',
  },
  field: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 2,
    fontSize: 16,
    borderBottomColor: '#cccc',
    marginTop: 10,
  },
  redBorder: {
    borderBottomColor: '#c12323',
  },
})

export default Banking
