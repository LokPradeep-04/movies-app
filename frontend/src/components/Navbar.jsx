import { Link, useNavigate, NavLink } from 'react-router-dom'
import images from '../assets/assets'
import { useLocation } from "react-router-dom";

const Navbar = (props) => {

  const { setSearchInput, searchInput, fetchedData } = props


  const navigate = useNavigate()

  const onClickSearchIcon = () => {
    navigate('/search')
  }

  const location = useLocation();

  const path = location.pathname


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
            className="px-3 py-1.5 bg-transparent text-gray-100  focus:outline-none"
          />
          <button
            type="button"
            onClick={onSearch}
            className="px-3"
          >
            <img src={images.search} className="w-4 " />
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


  return (
    <div className="absolute top-0 left-0 w-full bg-black/20 flex items-center justify-between px-16 py-6 z-50">
      <div className='flex items-center gap-12'>
        <Link to='/'>
          <img src={images.logo} className='w-28' />
        </Link>

        <NavLink
          to='/'
          className={({ isActive }) =>
            `hover:text-[#E50014] ${isActive ? "text-[#E50014]" : "text-[#F8FAFC]"
            } transition-colors duration-200`
          }
        >
          Home
        </NavLink>

        <NavLink
          to='/popular'
          className={({ isActive }) =>
            `hover:text-[#E50014] ${isActive ? "text-[#E50014]" : "text-[#F8FAFC]"
            } transition-colors duration-200`
          }
        >
          Popular
        </NavLink>
        <NavLink
          to='/watchlist'
          className={({ isActive }) =>
            `hover:text-[#E50014] ${isActive ? "text-[#E50014]" : "text-[#F8FAFC]"} transition-colors duration-200`
          }
        >
          Watchlist
        </NavLink>
      </div>

      <div className='flex items-center gap-10'>
        {renderSearchImage()}

        <button onClick={handleAvatar}><img src={images.avatar} className='w-9 h-9 rounded-full cursor-pointer' /></button>

      </div>

    </div>
  )
}

export default Navbar