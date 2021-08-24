import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {Controller, useForm} from 'react-hook-form'
import BottomBar from '../components/BottomBar'

const AccountSettings = () => {
  const [edit, setEdit] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
  })

  const onSubmit = (data) => {
    setEdit(false)
    // props.onSubmit(data)
    console.log(data, 'data')
  }

  console.log(errors)

  useEffect(() => {
    reset({
      fullName: 'Swati Mishra',
      email: 'swatimishra0809@mail.com',
      phoneNo: '8637089615',
      password: '12345',
      deliveryPayId: 'Tejapujari2@gmail.com',
    })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Image
          style={{marginBottom: 10}}
          source={require('../assets/signupImage.png')}
        />
        <ScrollView contentContainerStyle={styles.fieldsContainer}>
          <Text style={styles.title}>Account Setting</Text>

          <View style={[styles.fieldView, errors.fullName && styles.redBorder]}>
            {edit === false ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.fieldEdit}>Full Name</Text>
                <Text style={styles.fieldEdit}>Swati Mishra</Text>
                <TouchableOpacity
                  onPress={() => {
                    setEdit(true)
                  }}>
                  <Text style={styles.fieldEdit}>Edit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Controller
                  control={control}
                  name="fullName"
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Full Name"
                      placeholderTextColor="#2699FB"
                      style={styles.input}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text style={[styles.fieldEdit]}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={[styles.fieldView, errors.email && styles.redBorder]}>
            {edit === false ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.fieldEdit}>Email</Text>
                <Text style={styles.fieldEdit}>swatimishr0809@mail.com</Text>
                <TouchableOpacity
                  onPress={() => {
                    setEdit(true)
                  }}>
                  <Text style={styles.fieldEdit}>Edit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  }}
                  render={({field: {value, onChange}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Email"
                      placeholderTextColor="#2699FB"
                      style={styles.input}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text style={[styles.fieldEdit]}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={[styles.fieldView, errors.phoneNo && styles.redBorder]}>
            {edit === false ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.fieldEdit}>PhoneNo</Text>
                <Text style={styles.fieldEdit}>8637089615</Text>
                <TouchableOpacity
                  onPress={() => {
                    setEdit(true)
                  }}>
                  <Text style={styles.fieldEdit}>Edit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Controller
                  control={control}
                  name="phoneNo"
                  rules={{required: true, type: 'number'}}
                  render={({field: {value, onChange}}) => (
                    <TextInput
                      value={value}
                      keyboardType="number-pad"
                      onChangeText={onChange}
                      placeholder="PhoneNo"
                      placeholderTextColor="#2699FB"
                      style={styles.input}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text style={[styles.fieldEdit]}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={[styles.fieldView, errors.password && styles.redBorder]}>
            {edit === false ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.fieldEdit}>Password</Text>
                <Text style={styles.fieldEdit}>12345</Text>
                <TouchableOpacity
                  onPress={() => {
                    setEdit(true)
                  }}>
                  <Text style={styles.fieldEdit}>Edit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Controller
                  control={control}
                  name="password"
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Password"
                      placeholderTextColor="#2699FB"
                      style={styles.input}
                      secureTextEntry={true}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text style={[styles.fieldEdit]}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={[
              styles.fieldView,
              errors.deliveryPayId && styles.redBorder,
            ]}>
            {edit === false ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.fieldEdit}>Email</Text>
                <Text style={styles.fieldEdit}>Tejapujari2@gmail.com</Text>
                <TouchableOpacity
                  onPress={() => {
                    setEdit(true)
                  }}>
                  <Text style={styles.fieldEdit}>Edit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Controller
                  control={control}
                  name="deliveryPayId"
                  rules={{
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  }}
                  render={({field: {value, onChange}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Delivery Pay Id"
                      placeholderTextColor="#2699FB"
                      style={styles.input}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text style={[styles.fieldEdit]}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <BottomBar />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: '#F6F6FA',
    backgroundColor: '#F8FAFF',
  },
  fieldsContainer: {
    alignItems: 'center',
  },
  redBorder: {
    borderColor: '#c12323',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    color: '#0C0B0B',
  },
  fieldView: {
    // flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    borderColor: '#BCE0FD',
    borderWidth: 1.5,
    width: 300,
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 20,
    // flexBasis: '90%',
  },
  fieldEdit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2699FB',
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2699FB',
    width: '80%',
  },
})
export default AccountSettings
