import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const renderCost = (value) => value.toLocaleString('vi-VN')
export default function CartItem({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <View>
        <Image style={styles.image} source={require('../assets/omelete.jpg')} />
      </View>
      <View style={styles.text}>
        <Text>Trứng ốp</Text>
      </View>
      <View style={{ marginTop: 10, color: 'red' }}>
        <Text style={{ color: 'red', fontSize: 20 }}>
          {renderCost(69000)} VND
        </Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 6,
    borderColor: '#ff0000',
    borderWidth: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#f00',
    margin: 10,
    borderRadius: 2,
    width: '45%',
    height: 250,
  },
  text: {
    margin: 5,
  },
})
