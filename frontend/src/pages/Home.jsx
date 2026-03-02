import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrendingCarousel from '../components/TrendingCarousel'
import OriginalsCarousel from '../components/OriginalsCarousel'


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