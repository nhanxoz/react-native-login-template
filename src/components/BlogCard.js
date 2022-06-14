import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default function BlogCard({ item }) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/breakfast.jpg')}
        />
      </View>
      <View style={styles.text}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,

    borderColor: '#ff0000',
    borderWidth: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ff8000',
    margin: 10,
    borderRadius: 10,
    width: 150,
    height: 200,
  },
  text: {
    margin: 5,
  },
})
