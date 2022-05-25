import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import Axios from 'axios'

import HotelListItem from './ListProduct'

export default function AllProduct() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    Axios.get(
      'http://10.0.2.2:5000/api/FoodItems/vi-VN?CategoryId=1&PageIndex=1&PageSize=10'
    )
      .then((data1) => {
        setData(data1.data.items)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: 'white',
            paddingBottom: 20,
          }}
          data={data}
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString()
          }}
          renderItem={({ item }) => {
            console.log('item', item)
            return <HotelListItem {...item} />
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
    fontSize: 18,
    elevation: 8,
    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  searchBtn: {
    padding: 12,
    backgroundColor: '#54D3C2',
    borderRadius: 36,
  },
  headerDetailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerDetailTitle: {
    color: 'darkgrey',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'WorkSans-Regular',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: 'darkgrey',
    marginRight: 8,
    marginVertical: 8,
  },
  headerSectionContainer: { flex: 1, paddingHorizontal: 8, paddingVertical: 4 },
  stickyHeaderContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
    // marginHorizontal: 8,
  },
  hotelCountText: {
    flex: 1,
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'WorkSans-Regular',
  },
})
