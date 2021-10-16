import React from 'react'
import {List} from 'react-native-paper'

const TermsCondition = () => {
  return (
    <List.Accordion
      expanded={false}
      style={{
        // borderRadius: 10,
        backgroundColor: 'white',
      }}
      // titleStyle={{borderRadius: 10}}
      title="Terms Condition"></List.Accordion>
  )
}

export default TermsCondition
