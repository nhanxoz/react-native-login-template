import React, { useState, useContext } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'

export default function CartItem2({ item, delet, tang }) {
  const [number, onChangeNumber] = React.useState(String(item.quantity))
  const { authState } = useContext(AuthContext)
  React.useEffect(() => {
    onChangeNumber(String(item.quantity))
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
    }

    fetch(
      `http://10.0.2.2:8080/apiFood/updateCart?id_user=${authState.user}&id_food=${item.id}&quantity=${item.Quantity}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }, [item.quantity])
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: `http://10.0.2.2:8080/downloadFile/${item.image}`,
          }}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>{item.name}</Text>
        <View>
          <Text>{item.promotionPrice} VND</Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => tang(item, -1)}
          >
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              onChangeNumber(text)
              const requestOptions = {
                method: 'POST',
                redirect: 'follow',
              }

              fetch(
                `http://localhost:5000/api/user/updateQuantity?id=${authState.user}&idItem=${item.name}&nQuantity=${text}`,
                requestOptions
              )
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error))
            }}
            value={number}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={() => tang(item, 1)}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.del} onPress={() => delet(item)}>
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
