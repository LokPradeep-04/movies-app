import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrendingCarousel from '../components/TrendingCarousel'
import OriginalsCarousel from '../components/OriginalsCarousel'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const  Home=() =>{

  
  return (
    <div className='min-h-screen bg-[#181818] pb-20'>
        <Navbar/>
        <Hero/>
        <TrendingCarousel/>
        <OriginalsCarousel/>
    </div>
  )
}

export default Home