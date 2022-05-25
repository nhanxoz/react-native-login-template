import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Lấy được token <Text>41234iou132o4u1324</Text>
      </Paragraph>
      <Button mode="outlined" onPress={() => navigation.navigate('AllProduct')}>
        ok
      </Button>
      <Button onPress={() => navigation.navigate('Menu')}>Menu</Button>
      <Button onPress={() => navigation.navigate('Blogs')}>Blog</Button>
    </Background>
  )
}
