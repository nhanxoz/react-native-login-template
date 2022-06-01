import React, { useContext } from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'

const testURI = 'https://google.com'
export default function Profile({ navigation }) {
  const { logoutUser } = useContext(AuthContext)
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

      <Text style={{ fontSize: 32 }}>Phú Phạm Văn</Text>
      <View
        style={{
          marginTop: 32,
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('Chi tiết thông tin cá nhân')}
        >
          <Text style={{ fontSize: 20 }}>Chi tiết tài khoản</Text>
          <MaterialCommunityIcons name="arrow-right" size={28} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Lịch sử đơn hàng</Text>
          <MaterialCommunityIcons name="arrow-right" size={28} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Nạp tiền</Text>
          <MaterialCommunityIcons name="arrow-right" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }}
        >
          <Text style={{ fontSize: 20 }}>Đăng xuất</Text>
          <MaterialCommunityIcons name="arrow-right" size={28} />
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
