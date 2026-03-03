import React from 'react'
import images from '../assets/assets'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Signup=()=> {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleUsername = (e)=>{
    setUsername(e.target.value)

  }
  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }
  const onSubmitForm = async (e)=>{
    e.preventDefault()
    const obj ={
      username,
      email,
      password
    }
    const options = {
      method : "POST",
       headers: {
    "Content-Type": "application/json"
  },

      body: JSON.stringify(obj)
    }

   const response = await fetch("http://localhost:3000/api/auth/signup",options)
   const data = await response.json()


  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-6 relative"
      style={{ backgroundImage: `url(${images.background_image})` }}
    >
        <Link to='/'>
        <img src={images.logo} className="absolute top-6 left-6 w-24 sm:w-28 "/>
        </Link>
      <div className="w-full max-w-md bg-black/60 backdrop-blur-sm p-6 sm:p-8 rounded shadow-xl mt-40 mb-10">

        <h2 className="text-white text-xl sm:text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-3 sm:space-x-4" onSubmit={onSubmitForm}>

          <div>
            <label className="text-gray-300 text-sm">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter Username"
              required
              onChange={handleUsername} value={username}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your Email"
              required
              onChange={handleEmail}  value={email}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Password"
              required
              onChange={handlePassword} value={password}
            />
          </div>

          {/* <div>
            <label className="text-gray-300 text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirm Password"
              required
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition mt-2"
          >
            Create Account
          </button>

        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to='/login' className="text-red-500 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup