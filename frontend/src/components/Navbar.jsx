import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import images from '../assets/assets'

function Navbar() {
  return (
<div className="absolute top-0 left-0 w-full bg-black/20 flex items-center justify-between px-16 py-6 z-50">
        <div className='flex items-center gap-12'>
            <Link to='/'>
                <img src={images.logo} className='w-28'/> 
            </Link>

            <NavLink
              to='/'
              className={({isActive}) =>
                `hover:text-[#E50014] ${
                  isActive ? "text-[#E50014]" : "text-[#F8FAFC]"
                } transition-colors duration-200`
              }
            >
              Home
            </NavLink>

            <NavLink
              to='/popular'
              className={({isActive}) =>
                `hover:text-[#E50014] ${
                  isActive ? "text-[#E50014]" : "text-[#F8FAFC]"
                } transition-colors duration-200`
              }
            >
              Popular
            </NavLink>

        </div>

        <div className='flex items-center gap-10'>
            <img src={images.search} className='w-5 cursor-pointer'/>
            <img src={images.avatar} className='w-9 h-9 rounded-full cursor-pointer'/>
        </div>
        
    </div>
  )
}

export default Navbar