import React, { useContext } from 'react'
import { Provider } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Image,
  Button,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from './src/core/theme'
import AuthContextProvider, { AuthContext } from './src/context/AuthContext'

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  AllProduct,
} from './src/screens'
import HistoryOrder from './src/screens/HistoryOrder'
import HistoryDetail from './src/screens/HistoryDetail'
import Cart from './src/screens/Cart'
import Menu from './src/screens/Menu'
import Blogs from './src/screens/Blogs'
import Payment from './src/screens/Payment'
import Profile from './src/screens/Profile'
import ProfileDetail from './src/screens/ProfileDetails'
import FoodDetail from './src/screens/FoodDetail'
import UpdateProfile from './src/screens/UpdateProfile'

const Stack = createStackNavigator()
const StackHistory = createStackNavigator()
const StackProfile = createStackNavigator()
const SBlog = createStackNavigator()
const MDashboard = () => (
  <SBlog.Navigator initialRouteName="Trang chủ">
    <SBlog.Screen
      options={{ tabBarLabel: 'Chào mừng tới thiên đường ẩm thực' }}
      name="Trang chủ"
      component={Dashboard}
    />
    <SBlog.Screen
      options={{ tabBarLabel: 'Blogs' }}
      name="Blogs"
      component={Blogs}
    />
  </SBlog.Navigator>
)
const StackCart = createStackNavigator()
const CartPaymentStack = () => (
  <StackCart.Navigator initialRouteName="History">
    <StackCart.Screen
      options={{ tabBarLabel: 'Cart' }}
      name="Giỏ hàng"
      component={Cart}
    />
    <StackCart.Screen
      options={{ tabBarLabel: 'Thanh toán' }}
      name="Thanh toán"
      component={Payment}
    />
  </StackCart.Navigator>
)
const MenuStack = createStackNavigator()

const BottomTab = createBottomTabNavigator()
const ProfileInfoStack = () => (
  <StackProfile.Navigator initialRouteName="History">
    <StackProfile.Screen
      options={{ tabBarLabel: 'Profile' }}
      name="Thông tin tài khoản"
      component={Profile}
    />
    <StackProfile.Screen
      navigationOption={{ tabBarLabel: 'ProfileDetail' }}
      name="Chi tiết thông tin cá nhân"
      component={ProfileDetail}
    />
    <StackProfile.Screen
      options={{ tabBarLabel: 'UpdateProfile' }}
      name="Chỉnh sửa thông tin"
      component={UpdateProfile}
    />
    <StackProfile.Screen
      options={{ tabBarLabel: 'HistoryOrder' }}
      name="Lịch sử đặt món"
      component={HistoryOrder}
    />
    <StackProfile.Screen
      options={{ tabBarLabel: 'HistoryDetail' }}
      name="Chi tiết đơn hàng"
      component={HistoryDetail}
    />
  </StackProfile.Navigator>
)

const MenuFoodStack = () => {
  const { DATA, setData2 } = useContext(AuthContext)
  const [text, onChangeText] = React.useState(null)
  return (
    <MenuStack.Navigator initialRouteName="Menu">
      <MenuStack.Screen
        options={{
          tabBarLabel: 'Menu',

          headerRight: () => {
            return (
              <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  placeholder="nhập tên món"
                  value={text}
                />
                <TouchableOpacity
                  style={{
                    marginVertical: 10,
                    marginRight: 5,
                    padding: 5,
                    backgroundColor: '#2cfc03',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setData2(DATA.filter((i) => i.Name.indexOf(text) >= 0))
                  }}
                  title="Tìm"
                  border
                >
                  <Text>Tìm kiếm</Text>
                </TouchableOpacity>
              </View>
            )
          },
        }}
        name="Menu"
        component={Menu}
      />
      <MenuStack.Screen
        options={{ tabBarLabel: 'FoodDetail' }}
        name="FoodDetail"
        component={FoodDetail}
      />
    </MenuStack.Navigator>
  )
}

const HistoryOrderStack = () => (
  <StackHistory.Navigator initialRouteName="History">
    <StackHistory.Screen
      options={{ tabBarLabel: 'History' }}
      name="History"
      component={HistoryOrder}
    />
    <StackHistory.Screen
      options={{ tabBarLabel: 'HistoryDetail' }}
      name="HistoryDetail"
      component={HistoryDetail}
    />
  </StackHistory.Navigator>
)
const TabNavigator = () => (
  <BottomTab.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      tabBarInactiveTintColor: 'grey',

      headerShown: false,
    }}
  >
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Trang chủ',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
      name="Trang chủ"
      component={MDashboard}
    />
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Menu',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="menu" color={color} size={size} />
        ),
      }}
      name="Menu"
      component={MenuFoodStack}
    />
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Giỏ hàng',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart" color={color} size={size} />
        ),
      }}
      name="Giỏ hàng"
      component={CartPaymentStack}
    />
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Thông tin tài khoản',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
      name="Thông tin tài khoản"
      component={ProfileInfoStack}
    />
  </BottomTab.Navigator>
)
export default function App() {
  return (
    <AuthContextProvider>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerLeft: () => null,
              }}
            />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="AllProduct" component={AllProduct} />
            <Stack.Screen name="Menu" component={Menu} />

            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthContextProvider>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
})
