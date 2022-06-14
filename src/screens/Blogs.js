import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  FlatList,
  Dimensions,
} from 'react-native'
import axios from 'axios'
import { WebView } from 'react-native-webview'
import BlogCard from '../components/BlogCard'

const { height, width } = Dimensions.get('window')
const testURI = 'https://google.com'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d6',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d4',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d45',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e293',
    title: 'Third Item',
  },
]
export default function Blogs() {
  const [isShowWebView, setIsShowWebView] = React.useState(false)
  const [blog, setBlog] = React.useState(null)
  React.useEffect(() => {
    axios
      .get('http://10.0.2.2:8080/apiFood/blogs1')
      .then((res) => setBlog(res.data.data))
  }, [])
  const [selectedId, setSelectedId] = React.useState(null)
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedId(item.id)}>
        <BlogCard item={item} />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: 'https://reactnative.dev/img/homepage/phones.png' }}
        style={{ width: 400, height: 400 }}
      /> */}
      <View style={{ flex: 2 }}>
        <FlatList
          data={blog}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID}
          extraData={selectedId}
          horizontal
        />
      </View>
      <View style={{ flex: 3 }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: '100%',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setIsShowWebView(!isShowWebView)
            console.log('-----------------------')
            console.log(selectedId)
          }}
        >
          <Text>Xem bài viết</Text>
        </TouchableOpacity>

        {isShowWebView && (
          <WebView
            style={{ height: height, width: width }}
            containerStyle={{ height: height, width: width }}
            source={{ html: blog[selectedId - 1].content }}
            renderError={(error) => (
              <View style={{ flex: 1 }}>
                <Text>{error}</Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent
              console.warn('WebView error: ', nativeEvent)
            }}
            onNavigatorStateChange={(event) => {
              if (event.url !== testURI) {
                Linking.openURL(event.url)
              }
            }}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
})
