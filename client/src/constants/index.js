export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const AUTH_TOKEN_KEY = 'neartar_access_token'
export const AUTH_REFRESH_KEY = 'neartar_refresh_token'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DIRECTORIES: '/directories',
  BUSINESS: '/business/:id',
  BUY_SELL: '/buy-sell',
  REQUIREMENTS: '/requirements',
  CHAT: '/chat',
  LEADS: '/leads',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: '/admin',
}
