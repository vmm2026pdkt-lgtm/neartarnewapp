import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, fetchCurrentUser } from '../../services/authService'
import { AUTH_TOKEN_KEY, AUTH_REFRESH_KEY } from '../../constants'

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await loginUser(credentials)
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Login failed')
  }
})

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    return await registerUser(payload)
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Registration failed')
  }
})

export const loadCurrentUser = createAsyncThunk(
  'auth/loadCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCurrentUser()
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to load user')
    }
  },
)

const initialState = {
  user: null,
  accessToken: localStorage.getItem(AUTH_TOKEN_KEY),
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.accessToken = null
      state.status = 'idle'
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_REFRESH_KEY)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.accessToken = action.payload.access_token
        localStorage.setItem(AUTH_TOKEN_KEY, action.payload.access_token)
        localStorage.setItem(AUTH_REFRESH_KEY, action.payload.refresh_token)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.user = null
        state.accessToken = null
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_REFRESH_KEY)
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
