import React, { useState } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'

export default function CartItem2() {
  const [number, onChangeNumber] = React.useState(null)
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={{ width: 100, height: 100 }}
          source={require('../assets/omelete.jpg')}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>Trứng ốp la</Text>
        <View>
          <Text>69000 VND</Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.del}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
  },
  image: {},
  del: {
    backgroundColor: 'red',
    padding: 20,
  },
  content: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    width: 45,
    alignItems: 'center',
    backgroundColor: '#aaa',
  },
  text: {
    fontSize: 30,
  },
})
