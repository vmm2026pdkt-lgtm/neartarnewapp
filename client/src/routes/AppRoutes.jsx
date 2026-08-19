import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import Directories from '../pages/Directories/Directories'
import Business from '../pages/Business/Business'
import BusinessDetails from '../pages/BusinessDetails/BusinessDetails'
import BuySell from '../pages/BuySell/BuySell'
import Requirements from '../pages/Requirements/Requirements'
import Chat from '../pages/Chat/Chat'
import Leads from '../pages/Leads/Leads'
import Profile from '../pages/Profile/Profile'
import Settings from '../pages/Settings/Settings'
import Admin from '../pages/Admin/Admin'
import CreatePost from '../pages/CreatePost/CreatePost'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/directories" element={<Directories />} />
      <Route path="/business/add" element={<Business />} />
      <Route path="/business/:id" element={<BusinessDetails />} />
      <Route path="/buy-sell" element={<BuySell />} />
      <Route path="/requirements" element={<Requirements />} />
      <Route path="/chat" element={<Chat />} />
      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/settings" element={<Settings />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
    </Routes>
  )
}
