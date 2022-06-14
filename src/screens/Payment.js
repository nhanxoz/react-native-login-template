import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'

export default function Payment({ navigation }) {
  const { carts, authState, setCarts } = useContext(AuthContext)
  const [ten, onChangeten] = React.useState('')
  const [diachi, onChangediachi] = React.useState('')
  React.useEffect(() => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      Id: authState.user['_W'],
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('http://10.0.2.2:5000/api/user', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data)
        onChangeten(result.data.FullName)
        onChangediachi(result.data.Address)
      })
      .catch((error) => console.log('error', error))
  }, [])
  const formatConcurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const renderList = () => {
    return carts.map((item, index) => (
      <View
        key={index}
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: '#f0ebeb',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Image
          source={{
            uri: `http://10.0.2.2:8080/downloadFile/${item.image}`,
          }}
          style={{ width: 80, height: 80 }}
        />
        <View style={{ width: '80%', paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>{formatConcurrency(item.promotionPrice)} VND</Text>
            <Text>x{item.quantity}</Text>
          </View>
        </View>
      </View>
    ))
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        >
          Món ăn:
        </Text>
        {renderList()}
      </View>
      <View style={styles.container}>
        <Text>
          Tổng tiền{' '}
          {carts.reduce((a, b) => a + b.promotionPrice * b.quantity, 0)} VND
        </Text>
      </View>
      <View style={styles.container}>
        <Text>Điền thông tin đặt hàng:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeten}
          value={ten}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangediachi}
          value={diachi}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Đặt hàng"
          onPress={() => {
            const myHeaders1 = new Headers()

            myHeaders1.append('Content-Type', 'application/json')

            const raw = JSON.stringify({
              name: ten,
              address: diachi,
            })

            const requestOptions = {
              method: 'POST',
              headers: myHeaders1,
              body: raw,
              redirect: 'follow',
            }
            console.log(
              `http://10.0.2.2:8080/apiFood/paymentFromCart?user_id=${authState.user}`
            )
            fetch(
              `http://10.0.2.2:8080/apiFood/paymentFromCart?user_id=${authState.user}`,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => {
                console.log(result)
                setCarts([])
              })
              .catch((error) => console.log('error', error))

            const raw1 = JSON.stringify({
              Timestamp: '312',
              From: '4234',
              Message: 'New Order',
            })
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            const requestOptions1 = {
              method: 'POST',
              headers: myHeaders,
              body: raw1,
              redirect: 'follow',
            }

            fetch('http://10.0.2.2:9047/api/Test', requestOptions1)
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.log('error', error))
            alert('Yêu cầu đã được gửi cho nhân viên xử lý')
            navigation.navigate('Menu')
          }}
        />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
