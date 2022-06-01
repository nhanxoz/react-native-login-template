import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constant'

import setAuthToken from '../utils/setAuthToken'

import { authReducer } from '../reducers/authReducer'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  })

  // Authenticate user

  // Login
  const loginUser = async ({ email, password }) => {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        Email: email.value,
        Password: password.value,
      })
      console.log(raw)
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        credentials: 'include',
      }

      return fetch(`${apiUrl}/Account/Login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          dispatch({
            type: 'SET_AUTH',
            payload: {
              isAuthenticated: true,
              user: axios
                .get('http://10.0.2.2:5000/api/user?email=Nhan9ckl1@gmail.com')
                .then((data1) => {
                  console.log(data1.data.data[0].Id)
                  return data1.data.data[0].Id
                })
                .catch((error) => console.error(error)),
            },
          })
          console.log(authState)
          return result
        })
        .catch((error) => console.log('error', error))
    } catch (error) {
      if (error) return error
      return { success: false }
    }
  }

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/Users/register`, userForm)
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        )

      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
      return { success: false, message: error.message }
    }
  }

  // Logout
  const logoutUser = () => {
    dispatch({
      type: 'SET_AUTH',
      payload: { isAuthenticated: false, user: null },
    })
  }

  // Context data
  const authContextData = { loginUser, registerUser, logoutUser, authState }

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
