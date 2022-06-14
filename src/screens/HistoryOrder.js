import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'

export default function HistoryOrder({ navigation }) {
  const [orders, setOrders] = React.useState([])
  const arr_status = ['Chờ xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy']
  const { authState } = React.useContext(AuthContext)
  React.useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }
    console.log(
      `http://10.0.2.2:8080/apiFood/allOrder?user_id=${authState.user}`
    )
    fetch(
      `http://10.0.2.2:8080/apiFood/allOrder?user_id=${authState.user}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setOrders(result))
      .catch((error) => console.log('error', error))
  }, [])
  const formatConcurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const renderItem = () => {
    return orders.map((item, index) => {
      return (
        <View
          style={{ backgroundColor: '#fff', padding: 10, margin: 5 }}
          key={index}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>Đơn hàng #{item.id}</Text>
            <Text>{arr_status[item.status]}</Text>
          </View>
          <Text>Phương thức thanh toán: {item.payment_method}</Text>
          <Text>Giá trị: {formatConcurrency(item.total_price)} VNĐ</Text>
          <Button
            onPress={() => {
              navigation.navigate('Chi tiết đơn hàng', { item })
            }}
          >
            Chi tiết
          </Button>
        </View>
      )
    })
  }
  return (
    <View
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollView>{renderItem()}</ScrollView>
    </View>
  )
}
