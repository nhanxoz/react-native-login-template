import React from 'react'
import { Text, View } from 'react-native'
import Button from '../components/Button'

export default function HistoryOrder({ navigation }) {
  return (
    <View
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>History</Text>
      <Button
        onPress={() => {
          navigation.navigate('HistoryDetail')
        }}
      >
        OK
      </Button>
    </View>
  )
}
