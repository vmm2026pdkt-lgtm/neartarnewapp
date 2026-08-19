import { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AppRoutes from './routes/AppRoutes'
import { loadCurrentUser } from './redux/slices/authSlice'

function App() {
  const dispatch = useDispatch()
  const { accessToken, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(loadCurrentUser())
    }
  }, [accessToken, user, dispatch])

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-200 sm:py-6 sm:flex sm:justify-center">
        <div className="w-full max-w-[480px] min-h-screen bg-bg sm:shadow-2xl sm:min-h-0 sm:h-[calc(100vh-3rem)] sm:overflow-y-auto sm:rounded-[28px] relative">
          <AppRoutes />
        </div>
      </div>
    </HashRouter>
  )
}

export default App
