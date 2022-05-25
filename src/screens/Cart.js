import React from 'react'
import { Text, View, Button } from 'react-native'

export default function Cart({ navigation }) {
  return (
    <View
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Cart</Text>
      <Button
        onPress={() => {
          navigation.navigate('Menu', { screen: 'HistoryDetail' })
        }}
        title="OK"
      >
        OK324
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Payment')
        }}
        title="OK"
      >
        OK324
      </Button>
    </View>
  )
}
