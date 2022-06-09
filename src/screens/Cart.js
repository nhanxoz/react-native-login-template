import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native'
import Axios from 'axios'
import CartItem2 from '../components/CartItem2'
import { AuthContext } from '../context/AuthContext'



export default function Cart({ navigation }) {
  const [selectedId, setSelectedId] = useState(null)
  const { authState, carts, setCarts } = React.useContext(AuthContext)

  useEffect(() => {
    console.log(authState)
    Axios.get(`http://10.0.2.2:5000/api/user/cart?id=${authState.user['_W']}`)
      .then((r) => r.data.data)
      .then((d) => setCarts(d))
  }, [])

  const deleteItem = (item) => {
    const requestOptions = {
      method: 'POST',
    }

    fetch(
      `http://10.0.2.2:5000/api/user/deleteCartItem?id=${authState.user['_W']}&idItem=${item.ID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
    setCarts(carts.filter((i) => i.ID !== item.ID))
  }
  const tang = (item, sl) => {
    const newcart = carts
    const ide = newcart.findIndex((obj) => obj.ID === item.ID)
    newcart[ide].Quantity = item.Quantity + sl < 1 ? 1 : item.Quantity + sl
    console.log(newcart)
    setCarts([...newcart])
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff'
    const color = item.id === selectedId ? 'white' : 'black'

    return (
      <CartItem2
        item={item}
        delet={deleteItem}
        tang={tang}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
        <FlatList
          data={carts}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text>
          Tổng tiền:{' '}
          {carts.reduce((a, b) => a + b.PromotionPrice * b.Quantity, 0)} VND
        </Text>
        <Button
          onPress={() => {
            navigation.navigate('Menu', { screen: 'HistoryDetail' })
          }}
          title="Tiếp tục chọn món"
        >
          OK324
        </Button>
        <Button
          onPress={() =>
            !carts.reduce((a, b) => a + b.PromotionPrice * b.Quantity, 0)
              ? alert('Bạn chưa đặt món')
              : navigation.navigate('Thanh toán')
          }
          title="Thanh toán"
          color="red"
        >
          OK324
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemHorizontal: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
})
