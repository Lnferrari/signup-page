import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

export const signupUser = async (userData) => {
  try {
    const resApi = await (await axios.post(
      `/signup`,
      userData
    )).data
    return resApi
  } catch (err) {
    return err.response.data
  }
}