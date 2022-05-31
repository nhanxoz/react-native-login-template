import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default function CartegoryItem() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/breakfast.jpg')}
        />
      </View>
      <View style={styles.text}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Bữa sáng</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#ff0000',
    borderWidth: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ff8000',
    margin: 10,
    borderRadius: 10,
  },
  text: {
    margin: 5,
  },
})
