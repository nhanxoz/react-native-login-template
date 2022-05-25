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
  const loadUser = async () => {
    // if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    //   setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    // }

    try {
      const response = await fetch(`${apiUrl}/Product`)
    } catch (error) {
      //   localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
      setAuthToken(null)
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: true, user: null },
      })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  // Login
  const loginUser = async ({ email, password }) => {
    try {
      const form = new FormData()
      form.append('UserName', email.value)
      form.append('Passwrod', password.value)
      form.append('RememberMe', true)

      let json1 = {}
      await fetch(`${apiUrl}/Users/authenticate`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
        body: form,
      }).then((response) => {
        response.json().then((json) => {
          json1 = json
        })
      })

      await loadUser()
      return { ...json1, success: true }
    } catch (error) {
      if (error) return error
      return { success: true }
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

      await loadUser()

      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
      return { success: false, message: error.message }
    }
  }

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
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
