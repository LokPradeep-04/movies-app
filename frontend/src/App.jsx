import { Toaster } from "sonner";
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Popular from './pages/Popular'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import AdminProtectedRoute from './ProtectedRoute/AdminProtectedRoute'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import Watchlist from "./pages/Watchlist"
import Search from './pages/Search'
import Account from './pages/Account'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMovies from './pages/admin/AdminMovies'
import AdminUsers from './pages/admin/AdminUsers'
import Chatbot from './components/Chatbot'
const App = () => {
  return (
    <>
      <Routes>

        
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/popular' element={<ProtectedRoute><Popular /></ProtectedRoute>} />
        <Route path="/movies/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />

        {/* ── Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path='/admin/movies' element={<AdminProtectedRoute><AdminMovies /></AdminProtectedRoute>} />
        <Route path='/admin/users' element={<AdminProtectedRoute><AdminUsers /></AdminProtectedRoute>} />

        
        <Route path='*' element={<NotFound />} />

      </Routes>
      <Toaster position="top-right" richColors />
      <Chatbot />
    </>
  )
}

export default App
