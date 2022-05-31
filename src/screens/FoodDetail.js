import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import Carousel from 'react-native-banner-carousel'

const images = [
  require('../assets/banner/271691.jpg'),
  require('../assets/banner/271841.jpg'),
  require('../assets/banner/271864.jpg'),
]
const renderPage = (image, index) => {
  return (
    <View key={index}>
      <Image style={{ width: 500, height: 300 }} source={image} />
    </View>
  )
}
export default function FoodDetail() {
  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={500}>
          {images.map((image, index) => renderPage(image, index))}
        </Carousel>
      </View>
      <View
        style={{ flex: 3, margin: 10, backgroundColor: '#fff', padding: 10 }}
      >
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 30 }}>Mý Ý Spaghetti</Text>
          <Text
            style={{
              fontSize: 20,
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}
          >
            Giá gốc: 89000VNĐ
          </Text>
          <Text style={{ fontSize: 20, color: 'red' }}>
            Giá khuyến mãi: 64000VNĐ
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            margin: 5,
          }}
          onPress={() => {
            alert('Đã thêm vào giỏ hàng')
          }}
        >
          <Text style={{ fontSize: 18 }}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, margin: 20 }}>
          {`      Mỳ Spaghetti thậm chí còn được gọi là mỳ Italia bởi sự đặc trưng của nó tại quốc gia này. Với sự tiện lợi, dễ nấu, dễ ăn`}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'primary',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            margin: 5,
          }}
          onPress={() => {
            alert('Không có comment nào cạ')
          }}
        >
          <Text style={{ fontSize: 18 }}>Xem Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  carousel: {
    flex: 2,
  },
})
