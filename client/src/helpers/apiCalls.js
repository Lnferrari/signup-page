import axios from 'axios'

axios.defaults.baseURL = 'https://signup-api.vercel.app'
axios.defaults.withCredentials = true

export const signupUser = async (userData) => {
  try {
    const resApi = await (
      await axios.post(
        `/users`,
        userData
      )
    ).data;
    return resApi
  } catch (err) {
    return err.response.data
  }
}

export const loginUser = async (userData) => {
  try {
    const resApi = await (
      await axios.post(
        `/users/login`,
        userData
      )
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}

export const getAllUsers = async () => {
  try {
    const resApi = await (
      await axios('/users')
    ).data;
    return resApi 
  } catch (err) {
    return err.response.data
  }
}

export const authenticateUser = async () => {
  try {
    const resApi = await (
      await axios.post(
        `/users/auth`
      )
    ).data;
    return resApi
  } catch (err) {
    return err.response.data
  }
}

export const logoutUser = async () => {
  try {
    const resApi = await (
      await axios(`/users/logout`)
    ).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}