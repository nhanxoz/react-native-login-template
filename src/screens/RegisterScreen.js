import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import axios from 'axios'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { AuthContext } from '../context/AuthContext'

const repValidator = (rep, pass) => {
  if (rep !== pass) return 'Gõ lại mật khẩu sai rồi'
  return ''
}

export default function RegisterScreen({ navigation }) {
  const [rep, setrep] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { dispatch, userState } = useContext(AuthContext)
  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const repError = repValidator(rep.value, password.value)
    if (emailError || passwordError || repError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      Email: email.value,
      Password: password.value,
      ConfirmPassword: rep.value,
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('http://10.0.2.2:5000/Account/Register', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          dispatch({
            type: 'SET_AUTH',
            payload: {
              isAuthenticated: true,
              user: axios
                .get('http://10.0.2.2:5000/api/user?email=' + email.value)
                .then((data1) => {
                  console.log(data1.data.data[0].Id)

                  return data1.data.data[0].Id
                })
                .catch((error1) => console.error(error1)),
            },
          })
          console.log('OK')
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabNavigator', params: { token: '234324' } }],
          })
        }
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Tạo tài khoản mới</Header>

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
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Mật khẩu gõ lại"
        returnKeyType="done"
        value={rep.value}
        onChangeText={(text) => setrep({ value: text, error: '' })}
        error={!!rep.error}
        errorText={rep.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Đăng ký
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
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
