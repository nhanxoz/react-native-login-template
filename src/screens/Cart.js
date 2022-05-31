import React, { useState } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native'
import CartItem2 from '../components/CartItem2'

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
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
)
export default function Cart({ navigation }) {
  const [selectedId, setSelectedId] = useState(null)

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff'
    const color = item.id === selectedId ? 'white' : 'black'

    return (
      <CartItem2
        item={item}
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
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text>Tổng tiền: </Text>
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
