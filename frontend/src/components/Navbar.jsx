import { Link, useNavigate, NavLink } from 'react-router-dom'
import images from '../assets/assets'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import API_BASE_URL from '../config/config';

const Navbar = (props) => {

  const { setSearchInput, searchInput, fetchedData } = props

  const navigate = useNavigate()
  const location = useLocation();
  const path = location.pathname

  const [isAdmin, setIsAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const token = Cookies.get("accessToken")

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (res.ok && data.user.role === "admin") {
          setIsAdmin(true)
        }
      } catch (error) {
        console.log("Error checking admin role:", error)
      }
    }
    checkAdmin()
  }, [token])

  // close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [path])

  const onClickSearchIcon = () => {
    navigate('/search')
  }

  const onChangeInput = (event) => {
    setSearchInput(event.target.value)
  }

  const onSearch = () => {
    fetchedData()
  }

  const onEnter = (event) => {
    if (event.key === "Enter") {
      fetchedData()
    }
  }

  const renderSearchImage = () => {
    if (path === "/search") {
      return (
        <div className="flex items-center border border-gray-500 rounded-md overflow-hidden focus-within:border-red-600">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={onChangeInput}
            onKeyDown={onEnter}
            className="px-3 py-1.5 bg-transparent text-gray-100 focus:outline-none w-32 md:w-auto"
          />
          <button
            type="button"
            onClick={onSearch}
            className="px-3"
          >
            <img src={images.search} className="w-4" />
          </button>
        </div>
      )
    } else {
      return (
        <button type="button" onClick={onClickSearchIcon}>
          <img src={images.search} className="w-5 cursor-pointer" />
        </button>
      )
    }
  }

  const handleAvatar = () => {
    navigate('/account')
  }

  const navLinkClass = ({ isActive }) =>
    `hover:text-[#E50014] ${isActive ? "text-[#E50014]" : "text-[#F8FAFC]"} transition-colors duration-200`

  return (
    <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent z-50">

      <div className="flex items-center justify-between px-6 md:px-16 py-4 md:py-6">


        <div className='flex items-center gap-6 md:gap-12'>

          <Link to='/'>
            <img src={images.logo} className='w-20 md:w-28' />
          </Link>

      
          <div className='hidden md:flex items-center gap-8 lg:gap-12'>
            <NavLink to='/' className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to='/popular' className={navLinkClass}>
              Popular
            </NavLink>
            <NavLink to='/watchlist' className={navLinkClass}>
              Watchlist
            </NavLink>
            {isAdmin && (
              <NavLink to='/admin/dashboard' className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
          </div>

        </div>


        <div className='flex items-center gap-4 md:gap-10'>

          {renderSearchImage()}

          <button onClick={handleAvatar}>
            <img
              src={images.avatar}
              className='w-8 h-8 md:w-9 md:h-9  cursor-pointer'
            />
          </button>

          <button
            className='md:hidden text-white focus:outline-none'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
             
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-black/90 px-6 py-4 flex flex-col gap-4">
          <NavLink to='/' className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to='/popular' className={navLinkClass}>
            Popular
          </NavLink>
          <NavLink to='/watchlist' className={navLinkClass}>
            Watchlist
          </NavLink>
          {isAdmin && (
            <NavLink to='/admin/dashboard' className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </div>
      )}

    </div>
  )
}

export default Navbar