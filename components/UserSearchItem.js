import React from 'react'
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native'
import {Avatar} from 'react-native-paper'

const UserSearchItem = (props) => {
  return (
    <View>
      {/* <Avatar.Image size={24} source={require(props.image)} /> */}
      <Text style={styles.name}>{props.name}</Text>
      <TouchableOpacity>
        <Text>{props.mileStoneType} a MileStone</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
})

export default UserSearchItem
