import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate()
  var hour = a.getHours()
  var min = a.getMinutes()
  var sec = a.getSeconds()
  var time = date + ' ' + month + ' ' + year
  return time
}

export default function ProfileDetail({ navigation, route }) {
  const { user } = route.params
  const { height, width } = Dimensions.get('window')
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        style={{ borderRadius: 50, width: 100, height: 100 }}
        source={require('../assets/phu.jpg')}
      />

      <Text style={{ fontSize: 32 }}>{user.FullName}</Text>
      <View
        style={{
          marginTop: 32,
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Mã khách hàng</Text>
          <Text style={{ fontSize: 20 }}>{user.id}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Email: </Text>
          <Text style={{ fontSize: 20 }}>{user.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Họ tên: </Text>
          <Text style={{ fontSize: 20 }}>{user.fullName}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Địa chỉ</Text>
          <Text style={{ fontSize: 20 }}>{user.address}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            margin: 20,
            backgroundColor: '#2fabed',
            padding: 20,
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('Chỉnh sửa thông tin')
          }}
        >
          <Text style={{ fontSize: 20 }}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    padding: 20,
    borderColor: '#999',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
