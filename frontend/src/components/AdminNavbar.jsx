import { NavLink, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const AdminNavbar = () => {

    const navigate = useNavigate()

    const onLogout = () => {
        Cookies.remove("accessToken")
        navigate("/admin/login")
    }

    return (
        <div className="fixed top-0 left-0 w-full bg-[#242424] px-10 py-4 flex items-center justify-between z-50 shadow-md">

            <div className="flex items-center gap-4">
                <h1 className="text-white text-xl font-bold">
                    🎬 Admin Panel
                </h1>
            </div>

            <div className="flex items-center gap-8">

                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `text-sm font-medium transition ${isActive
                            ? "text-red-500"
                            : "text-gray-300 hover:text-white"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/movies"
                    className={({ isActive }) =>
                        `text-sm font-medium transition ${isActive
                            ? "text-red-500"
                            : "text-gray-300 hover:text-white"
                        }`
                    }
                >
                    Movies
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `text-sm font-medium transition ${isActive
                            ? "text-red-500"
                            : "text-gray-300 hover:text-white"
                        }`
                    }
                >
                    Users
                </NavLink>

            </div>

            <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
                Logout
            </button>

        </div>
    )
}

export default AdminNavbar
