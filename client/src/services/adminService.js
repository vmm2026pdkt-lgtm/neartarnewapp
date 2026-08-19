import axiosClient from '../api/axiosClient'

export function fetchDashboardStats() {
  return axiosClient.get('/admin/dashboard').then((res) => res.data)
}

export function fetchUsers(params = {}) {
  return axiosClient.get('/admin/users', { params }).then((res) => res.data)
}

export function toggleUserActive(userId) {
  return axiosClient.patch(`/admin/users/${userId}/toggle-active`).then((res) => res.data)
}

export function fetchAllBusinesses(params = {}) {
  return axiosClient.get('/admin/businesses', { params }).then((res) => res.data)
}

export function approveBusiness(businessId) {
  return axiosClient.patch(`/admin/businesses/${businessId}/approve`).then((res) => res.data)
}

export function rejectBusiness(businessId) {
  return axiosClient.patch(`/admin/businesses/${businessId}/reject`).then((res) => res.data)
}

export function fetchAllProducts(params = {}) {
  return axiosClient.get('/admin/products', { params }).then((res) => res.data)
}

export function fetchCategories() {
  return axiosClient.get('/categories').then((res) => res.data)
}

export function createCategory(payload) {
  return axiosClient.post('/categories', payload).then((res) => res.data)
}
