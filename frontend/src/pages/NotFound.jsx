import React from 'react'
import images from '../assets/assets'
import { useNavigate } from 'react-router'
const NotFound=()=> {
    const navigate = useNavigate()
  return (
    <div style={{ backgroundImage: `url(${images.not_found})` }} className="min-h-screen bg-cover bg-center flex flex-col  justify-center items-center px-4 sm:px-6">
        <h1 className="text-white text-6xl font-bold mb-8">Lost Your Way ?</h1>
        <p className="text-white mb-5">we are sorry the page you requested could not be found. Please go back to the homepage.</p>
        <button onClick={()=>navigate('/')} className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200">Go to Home</button>
    </div>
  )
}

export default NotFound