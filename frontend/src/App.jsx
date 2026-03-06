import { Toaster } from "sonner";
import Login from './pages/Login'
import Signup from './pages/Signup'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Popular from './pages/Popular'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import Watchlist from "./pages/Watchlist"
import Search from './pages/Search'
import Account from './pages/Account'

const  App =()=> {



  return (
    <>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='/popular' element={<ProtectedRoute><Popular/></ProtectedRoute>}/>
    <Route path="/movies/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
    <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}/>
    <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path='*' element={<NotFound/>} />
   </Routes>
  <Toaster position="top-right" richColors />
  </>
  )
}

export default App