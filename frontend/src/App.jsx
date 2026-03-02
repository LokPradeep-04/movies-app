import Login from './pages/Login'
import Signup from './pages/Signup'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Popular from './pages/Popular'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'

import Search from './pages/Search'

const  App =()=> {



  return (
    
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='/popular' element={<ProtectedRoute><Popular/></ProtectedRoute>}/>
    <Route path="/movies/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
    <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}/>
    <Route path='*' element={<NotFound/>} />
   </Routes>
  
  )
}

export default App