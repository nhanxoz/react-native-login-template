import React, { useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, Button } from 'react-native'

export default function HistoryDetail({ route }) {
  const { item } = route.params
  const trangthai = 1
  const arr_status = ['Chờ xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy']
  const [order, setOrder] = React.useState([])
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    }
    console.log(item.id)
    fetch(
      'http://10.0.2.2:8080/apiFood/orderShort?id_order=' + item.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setOrder(result))
      .catch((error) => console.log('error', error))
  }, [])
  const formatConcurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const renderList = () => {
    return order.map((item_, index) => (
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
            uri: `http://10.0.2.2:8080/downloadFile/${item_.image}`,
          }}
          style={{ width: 80, height: 80 }}
        />
        <View style={{ width: '80%', paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>{item_.name}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>{formatConcurrency(item_.promotionPrice)} VND</Text>
            <Text>x{item_.quantity}</Text>
          </View>
        </View>
      </View>
    ))
  }
  return (
    <View>
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
          {formatConcurrency(
            order.reduce((a, b) => a + b.promotionPrice * b.quantity, 0)
          )}{' '}
          VND
        </Text>
      </View>
      <View style={styles.container}>
        <Text>Trạng thái: {arr_status[trangthai]}</Text>
      </View>
      <View style={styles.container}>
        <Button
          title="Báo lỗi"
          onPress={() => {
            alert('Yêu cầu đã được gửi cho nhân viên xử lý')
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
})
