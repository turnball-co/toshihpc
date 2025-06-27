import axios from 'axios'

// add getUserById, getUserByUsername and getUserByEmail

const apiClient = axios.create({
  baseURL: process.env.BACKEND_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getUserById = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`)
  return response.data
}

export const getUserByUsername = async (username: string) => {
  const response = await apiClient.get(`/users/username/${username}`)
  return response.data
}

export const getUserByEmail = async (email: string) => {
  const response = await apiClient.get(`/users/email/${email}`)
  return response.data
}

export default apiClient
