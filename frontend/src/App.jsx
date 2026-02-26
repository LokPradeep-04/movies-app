import Login from './pages/Login'
import Signup from './pages/Signup'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Popular from './pages/Popular'

import ProtectedRoute from './ProtectedRoute'
function App() {
  return (
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='/popular' element={<ProtectedRoute><Popular/></ProtectedRoute>}/>
   </Routes>
  )
}

export default App