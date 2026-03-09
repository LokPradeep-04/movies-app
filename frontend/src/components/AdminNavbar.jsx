import { NavLink, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useState } from "react"

const AdminNavbar = () => {

  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const onLogout = () => {
    Cookies.remove("accessToken")
    navigate("/admin/login")
  }

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-red-500" : "text-gray-300 hover:text-white"
    }`

  return (

    <div className="fixed top-0 left-0 w-full bg-[#242424] z-50 shadow-md">

      <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 py-4">

        <h1 className="text-white text-lg md:text-xl font-bold">
          🎬 Admin Panel
        </h1>

        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/movies" className={navLinkClass}>
            Movies
          </NavLink>

          <NavLink to="/admin/users" className={navLinkClass}>
            Users
          </NavLink>

        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={onLogout}
            className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Logout
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >

            {menuOpen ? (

              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>

            ) : (

              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>

            )}

          </button>

        </div>

      </div>

      {menuOpen && (

        <div className="md:hidden bg-[#242424] px-6 pb-6 flex flex-col gap-4">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/movies" className={navLinkClass}>
            Movies
          </NavLink>

          <NavLink to="/admin/users" className={navLinkClass}>
            Users
          </NavLink>

          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition w-fit"
          >
            Logout
          </button>

        </div>

      )}

    </div>
  )
}

export default AdminNavbar