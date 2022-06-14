import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native'
import Axios from 'axios'
import Carousel from 'react-native-banner-carousel'
import { AuthContext } from '../context/AuthContext'

export default function FoodDetail({ route }) {
  const { item } = route.params
  const { authState, carts, setCarts } = React.useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [cm, setCm] = useState('')
  const [comments, setComments] = useState([
    {
      DisplayOrder: 1,
      Content:
        'Làm ngon, giá cả phải chăng, đặt đồ ở đây nhiều lần rồi cảm thấy phục vụ rất tốt, tận tình. Cũng có lần ship nhầm món cho mình, khi mình nhắn tin hỏi thì thì nhân viên trả lời rất lịch sự.',
      CreatedBy: 'Nguyễn Hữu Nhân',
      CreatedDate: '2020-10-22T00:00:00',
    },
  ])
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(
      `http://10.0.2.2:5000/api/food/comment?idfood=${item.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setComments(result.data)
      })
      .catch((error) => console.log('error', error))
  }, [])
  const images = [
    `http://10.0.2.2:8080/downloadFile/${item.image}`,
    `http://10.0.2.2:8080/downloadFile/${item.alias}_2.jpg`,
    `http://10.0.2.2:8080/downloadFile/${item.alias}_3.jpg`,
  ]
  const renderPage = (image, index) => {
    return (
      <View key={index}>
        <Image style={{ width: 500, height: 300 }} source={{ uri: image }} />
      </View>
    )
  }
  const renderComment = () => {
    return comments.map((value, index) => (
      <View
        style={{ backgroundColor: '#f5f3f0', padding: 10, margin: 1 }}
        key={index}
      >
        <Text style={{ fontWeight: '200' }}>{value.CreatedBy}</Text>
        <Text>{value.Content}</Text>
      </View>
    ))
  }
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
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item.name}</Text>
          <Text
            style={{
              fontSize: 20,
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}
          >
            Giá gốc: {item.originPrice}VNĐ
          </Text>
          <Text style={{ fontSize: 20, color: 'red' }}>
            Giá khuyến mãi: {item.promotionPrice}VNĐ
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
            console.log(authState)
            const formdata = new FormData()
            formdata.append('id', authState.user)
            formdata.append('item', item.id)

            const requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
            }

            fetch(
              `http://10.0.2.2:8080/apiFood/addCart?id_user=${authState.user}&id_food=${item.id}`,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.log('error', error))
            const id = carts.findIndex((i) => i.name === item.name)
            console.log(item)
            if (id !== -1) {
              carts[id].quantity += 1
              setCarts([...carts])
            } else {
              setCarts([...carts, { ...item, quantity: 1 }])
            }
            alert('Đã thêm vào giỏ hàng')
          }}
        >
          <Text style={{ fontSize: 18 }}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, margin: 20 }}>
          {`      Mỳ Spaghetti thậm chí còn được gọi là mỳ Italia bởi sự đặc trưng của nó tại quốc gia này. Với sự tiện lợi, dễ nấu, dễ ăn`}
        </Text>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bình luận</Text>
              <ScrollView>{renderComment()}</ScrollView>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    width: 250,
                    borderRadius: 20,
                  }}
                  value={cm}
                  onChangeText={setCm}
                />
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { height: 40, backgroundColor: '#ebb58f' },
                  ]}
                  onPress={() => {
                    const formdata = new FormData()
                    formdata.append('id', authState.user['_W'])
                    formdata.append('idfood', String(item.ID))
                    formdata.append('content', cm)

                    const requestOptions = {
                      method: 'POST',
                      body: formdata,
                      redirect: 'follow',
                    }

                    fetch(
                      'http://10.0.2.2:5000/api/user/addComment',
                      requestOptions
                    )
                      .then((response) => response.text())
                      .then((result) => console.log(result))
                      .catch((error) => console.log('error', error))
                    alert('Bình luận đang chờ được kiểm duyệt')
                  }}
                >
                  <Text style={styles.textStyle}>Gửi </Text>
                </Pressable>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Ẩn</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            backgroundColor: '#a0c7fa',
            alignItems: 'center',
            padding: 2,
            borderRadius: 10,
            margin: 5,
          }}
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <Text style={{ fontSize: 18 }}>Bình luận</Text>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
})
