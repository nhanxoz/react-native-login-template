import React, { useState } from 'react'
import {
  View,
  Text,
  InputText,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Background from '../components/Background'
import { theme } from '../core/theme'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'

import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { AuthContext } from '../context/AuthContext'

const addValidator = (add) => {
  if (!add) return 'Địa chỉ không được để trống'
  return ''
}
export default function UpdateProfile({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [add, setadd] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { authState } = React.useContext(AuthContext)
  const onChangePress = () => {
    console.log('OK')
    const nameError = nameValidator(name.value)
    const addError = addValidator(name.value)
    const emailError = emailValidator(email.value)

    if (emailError || nameError || addError) {
      setName({ ...name, error: nameError })
      setadd({ ...add, error: addError })
      setEmail({ ...email, error: emailError })

      return
    }
    console.log('OK')
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      Id: authState.user,
      FullName: name.value,
      Address: add.value,
      Email: email.value,
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('http://10.0.2.2:5000/api/userChangeInfor', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      })
      .catch((error) => console.log('error', error))
    navigation.goBack()
  }
  return (
    <Background>
      <Logo />
      <Header>Chỉnh sửa thông tin</Header>
      <TextInput
        label="Họ và tên"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Địa chỉ"
        returnKeyType="next"
        value={add.value}
        onChangeText={(text) => setadd({ value: text, error: '' })}
        error={!!add.error}
        errorText={add.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button
        mode="contained"
        onPress={() => {
          onChangePress()
        }}
        style={{ marginTop: 24 }}
      >
        Thay đổi thông tin
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
