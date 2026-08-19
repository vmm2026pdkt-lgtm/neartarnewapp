import axiosClient from '../api/axiosClient'

export function registerUser({ fullName, email, phone, password }) {
  return axiosClient
    .post('/auth/register', { full_name: fullName, email, phone, password })
    .then((res) => res.data)
}

export function loginUser({ email, password }) {
  return axiosClient.post('/auth/login', { email, password }).then((res) => res.data)
}

export function fetchCurrentUser() {
  return axiosClient.get('/users/me').then((res) => res.data)
}
