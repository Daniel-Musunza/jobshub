import axios from 'axios'

// const API_URL = 'http://localhost:5000/api/users/'
const API_URL = 'https://njookaziapi.qualityasoftwares.com/api/users/'
const getUsers = async () => {
  const response = await axios.get(API_URL + 'getUsers/')
  if (response.data) {
    localStorage.setItem('profiles', JSON.stringify(response.data))
  }
  return response.data
}
// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
//update User

const updateUser = async (userData, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + userId, userData, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
const forgotpassword = async (userData) => {
  const response = await axios.post(API_URL + 'forgotpassword', userData)

  return response.data
}
const passwordreset = async (userData) => {
  const response = await axios.post(API_URL + 'passwordreset', userData)

  return response.data
}
// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  forgotpassword,
  passwordreset,
  login,
  getUsers,
  updateUser
}

export default authService
