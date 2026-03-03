import { Link, Navigate } from 'react-router-dom'
import images from '../assets/assets'
import { useState } from 'react'
import Cookies from 'js-cookie'

import { useNavigate } from 'react-router-dom'
const Login =()=> {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [eee, setEee] = useState('')
 const navigae =useNavigate()
  

const setCookies = (jwtToken) =>{
  Cookies.set("abcde",jwtToken , {expires:7})
  navigae('/')
}

  const onEmail =(e) =>{
    setEmail(e.target.value)
  }

  const errorMessage =(error) =>{
     setEee(error)
  } 
  const onPassword =(e) =>{
   setPassword(e.target.value)
  }
  const onSubmitForm = async(e) =>{
    e.preventDefault()
    const obj ={
      email,
      password
    }
    const options ={
      method:"POST",
      headers: {
    "Content-Type": "application/json"
  },

      body: JSON.stringify(obj)
    }

    const response = await fetch("http://localhost:3000/api/auth/login",options)
    const data = await response.json()

    if(response.ok){
       setCookies(data.jwt_token)
    }else{
     errorMessage(data.error_msg)
    }
   
  }

const token = Cookies.get("abcde")

if (token !== undefined){
  return <Navigate to="/" replace />
}
  return (
   
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-6 relative "
      style={{ backgroundImage: `url(${images.background_image})` }}
    >
        <Link to='/'>
        <img src={images.logo} className="absolute top-6 left-6 w-24 sm:w-28 "/>
        </Link>
    
      <div
        className="w-full max-w-md bg-black/60 backdrop-blur-sm p-6 sm:p-8 rounded shadow-xl"
      >
        <h2 className="text-white text-xl sm:text-2xl font-semibold text-center mb-6">
          Login
        </h2>
        <form className="space-y-3 sm:space-y-4" onSubmit={onSubmitForm}>
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="text"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your Email"
              required onChange={onEmail} value={email}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter Password"
              required onChange={onPassword} value={password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition mt-2"
          >
            Login
          </button>

        </form>
        <p className='text-center text-red-500'>{eee}</p>
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup"  className="text-red-500 hover:underline ">
            Signup
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login