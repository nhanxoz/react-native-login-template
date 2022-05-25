import React from 'react'
import { Provider } from 'react-native-paper'
import { Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from './src/core/theme'
import AuthContextProvider from './src/context/AuthContext'

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

const Stack = createStackNavigator()
const StackHistory = createStackNavigator()
const StackProfile = createStackNavigator()
const StackCart = createStackNavigator()
const CartPaymentStack = () => (
  <StackCart.Navigator initialRouteName="History">
    <StackCart.Screen
      options={{ tabBarLabel: 'Cart' }}
      name="Cart"
      component={Cart}
    />
    <StackCart.Screen
      options={{ tabBarLabel: 'Payment' }}
      name="Payment"
      component={Payment}
    />
  </StackCart.Navigator>
)
const MenuStack = createStackNavigator()
const BottomTab = createBottomTabNavigator()
const ProfileInfoStack = () => (
  <StackProfile.Navigator initialRouteName="History">
    <StackProfile.Screen
      options={{ tabBarLabel: 'History' }}
      name="History"
      component={HistoryOrder}
    />
    <StackProfile.Screen
      options={{ tabBarLabel: 'HistoryDetail' }}
      name="HistoryDetail"
      component={HistoryDetail}
    />
  </StackProfile.Navigator>
)

const MenuFoodStack = () => (
  <MenuStack.Navigator initialRouteName="Menu">
    <MenuStack.Screen
      options={{
        tabBarLabel: 'Menu',

        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Blog"
            color="#000"
            border
          />
        ),
      }}
      name="Menu"
      component={HistoryOrder}
    />
    <MenuStack.Screen
      options={{ tabBarLabel: 'HistoryDetail' }}
      name="HistoryDetail"
      component={HistoryDetail}
    />
  </MenuStack.Navigator>
)
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
      options={{ tabBarLabel: 'Home' }}
      name="Dashboard"
      component={Dashboard}
    />
    <BottomTab.Screen
      options={{ tabBarLabel: 'Menu' }}
      name="Menu"
      component={MenuFoodStack}
    />
    <BottomTab.Screen
      options={{ tabBarLabel: 'Cart' }}
      name="Cart"
      component={CartPaymentStack}
    />
    <BottomTab.Screen
      options={{ tabBarLabel: 'Profile' }}
      name="Profile"
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
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="AllProduct" component={AllProduct} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Blogs" component={Blogs} />
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
