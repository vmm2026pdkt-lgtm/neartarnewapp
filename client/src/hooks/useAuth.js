import { useDispatch, useSelector } from 'react-redux'
import { login, register, logout } from '../redux/slices/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const { user, accessToken, status, error } = useSelector((state) => state.auth)

  return {
    user,
    isAuthenticated: Boolean(accessToken),
    status,
    error,
    login: (credentials) => dispatch(login(credentials)),
    register: (payload) => dispatch(register(payload)),
    logout: () => dispatch(logout()),
  }
}
