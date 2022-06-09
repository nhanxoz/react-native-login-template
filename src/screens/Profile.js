import React, { useContext } from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'


export default function Profile({ navigation }) {
  const [user, setUser] = React.useState({ FullName: '' })
  const { logoutUser, authState } = useContext(AuthContext)
  const { height, width } = Dimensions.get('window')
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
        setUser(result.data)
      })
      .catch((error) => console.log('error', error))
  }, [])
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
      }}
    >
      <Image
        style={{ borderRadius: 50, width: 100, height: 100, paddingTop: 10 }}
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
        <TouchableOpacity
          style={styles.row}
          onPress={() =>
            navigation.navigate('Chi tiết thông tin cá nhân', { user })
          }
        >
          <Text style={{ fontSize: 20 }}>Chi tiết tài khoản</Text>
          <MaterialCommunityIcons name="arrow-right" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('Lịch sử đặt món')}
        >
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
