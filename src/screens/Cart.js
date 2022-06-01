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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d6',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d4',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d45',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e293',
    title: 'Third Item',
  },
]

export default function Cart({ navigation }) {
  const [selectedId, setSelectedId] = useState(null)
  const { authState } = React.useContext(AuthContext)
  const [list, setList] = useState(null)
  const [carts, setCarts] = useState(null)
  useEffect(() => {
    console.log(authState)
    Axios.get(`http://10.0.2.2:5000/api/user/cart?id=${authState.user['_W']}`)
      .then((r) => r.data.data)
      .then((d) => setCarts(d))
  }, [])

  const deleteItem = (item) => {
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
          onPress={() => {
            navigation.navigate('Payment')
          }}
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
