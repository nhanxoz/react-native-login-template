import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const testURI = 'https://google.com'
export default function ProfileDetail({ navigation }) {
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
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Tên đăng nhập: </Text>
          <Text style={{ fontSize: 20 }}>phufava</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Họ tên: </Text>
          <Text style={{ fontSize: 20 }}>Phú Phạm Văn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Ngày sinh</Text>
          <Text style={{ fontSize: 20 }}>20/9/2000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={{ fontSize: 20 }}>Email</Text>
          <Text style={{ fontSize: 20 }}>phufava@gmail.com</Text>
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
