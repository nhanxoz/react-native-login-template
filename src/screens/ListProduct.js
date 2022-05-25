import React, { useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  ListRenderItemInfo,
  useWindowDimensions,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export const IMAGENAME = require('../../assets/img/1_1.jpg')

const HotelListItem = (data) => {
  const { width } = useWindowDimensions()
  const item = data
  const translateY = new Animated.Value(0)
  const opacity = new Animated.Value(0)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: item.id * (400 / 3),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: item.id * (400 / 3),
        useNativeDriver: true,
      }),
    ]).start()
  })

  const imageSize = width - 48

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ translateY }] }]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={{ height: imageSize / 2, width: imageSize }}
          source={AppImages[item.id]}
          resizeMode="stretch"
        />
        <Icon
          style={{ position: 'absolute', right: 0, padding: 16 }}
          name="favorite-border"
          size={24}
          color="#54D3C2"
        />
      </View>
      <View style={{ padding: 8, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.name}>{item.description}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.details} numberOfLines={1}>
            {item.subTxt}
            <View style={{ width: 4 }} />
            <Icon name="location-pin" size={12} color="#54D3C2" />
            {item.originalPrice} VNĐ
          </Text>
          <Text style={styles.perNightText}>chiếc</Text>
        </View>
      </View>
    </Animated.View>
  )
}

const textStyle = {
  color: 'rgba(128,128,128, 0.46)',
  fontFamily: 'WorkSans-Regular',
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 16,
    // overflow: 'hidden',
    elevation: 8,
    shadowColor: 'grey',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  imageContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  title: { flex: 1, fontSize: 22 },
  subText: {
    ...textStyle,
    flex: 1,
    paddingRight: 4,
  },
  perNightText: { ...textStyle },
  review: {
    ...textStyle,
    marginLeft: 8,
  },
})
const AppImages = {
  2: require('../../assets/img/kimbap.jpg'),
  5: require('../../assets/img/bimbimbap.jpg'),
  6: require('../../assets/img/thitchiengion.jpg'),
}

export default HotelListItem
