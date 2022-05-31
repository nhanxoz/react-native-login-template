import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

import Carousel from 'react-native-banner-carousel'

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

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
export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Đặt món với Pegasus</Header>

      <View style={styles.carousel}>
        <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={500}>
          {images.map((image, index) => renderPage(image, index))}
        </Carousel>
      </View>

      <Button mode="outlined" onPress={() => navigation.navigate('AllProduct')}>
        ok
      </Button>
      <Button onPress={() => navigation.navigate('Menu')}>Menu</Button>
      <Button onPress={() => navigation.navigate('Blogs')}>Blog</Button>
    </Background>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  carousel: {
    flex: 1,
  },
})
