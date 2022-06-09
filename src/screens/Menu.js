import React, { useState, useEffect, useContext } from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native'
import Axios from 'axios'
import CartItem from '../components/CartItem'
import CartegoryItem from '../components/CategoryItem'
import { AuthContext } from '../context/AuthContext'

const requestOptions = {
  method: 'GET',
}

const Category = [
  {
    id: 0,
    title: 'Tất cả',
    color: '#ee4035',
  },
  {
    id: 1,
    title: 'Bữa sáng',
    color: '#f37736',
  },
  {
    id: 2,
    title: 'Tráng miệng',
    color: '#fdf498',
  },
  {
    id: 3,
    title: 'Bữa tối',
    color: '#7bc043',
  },
  {
    id: 4,
    title: 'Đồ uống',
    color: '#0392cf',
  },
]
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
)
export default function Menu({ navigation }) {
  const [selectedId, setSelectedId] = useState(null)
  const [text, onChangeText] = useState(null)
  const [press, setPress] = useState(true)

  const { DATA_2, setData2, DATA, setData } = useContext(AuthContext)
  const [cat, setCat] = useState(0)
  useEffect(() => {
    Axios.get('http://10.0.2.2:5000/api/user/food')
      .then((data1) => {
        setData(data1.data.data)
        setData2(data1.data.data)
      })
      .catch((error) => console.error(error))
  }, [])
  useEffect(
    () =>
      cat === 0
        ? setData2(DATA)
        : setData2(DATA.filter((i) => i.CategoryID === cat)),
    [press]
  )
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCat(item.id)
          setPress(!press)
        }}
      >
        <CartegoryItem
          title={item.title}
          backgroundColor={item.color}
          color={item.id === 2 ? '#000' : '#fff'}
        />
      </TouchableOpacity>
    )
  }
  const renderItem2 = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff'
    const color = item.id === selectedId ? 'white' : 'black'

    return (
      <CartItem
        onPress={() => {
          navigation.navigate('FoodDetail', { item })
        }}
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 2 }}>
        <FlatList
          data={Category}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal
        />
      </View>
      <View style={{ flex: 4 }}>
        <FlatList
          data={DATA_2}
          renderItem={renderItem2}
          keyExtractor={(item) => item.ID}
          extraData={selectedId}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
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
