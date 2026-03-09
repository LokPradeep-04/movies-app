import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import AdminNavbar from "../../components/AdminNavbar"
import Loader from "../../components/Loader"
import API_BASE_URL from "../../config/config"

const AdminUsers = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const token = Cookies.get("accessToken")

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (response.ok) {
          setUsers(data)
        }

      } catch (error) {
        console.log("Error fetching users:", error)
      }

      setLoading(false)

    }

    fetchUsers()

  }, [token])

  if (loading) return <Loader />

  return (

    <div className="min-h-screen bg-[#181818]">

      <AdminNavbar />

      <div className="pt-24 px-4 sm:px-8 md:px-12 pb-20">

        <div className="mb-8">

          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Users
          </h1>

          <p className="text-gray-400 mt-2 text-sm md:text-base">
            {users.length} users registered
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm md:text-base">

            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-gray-400 pb-4">Username</th>
                <th className="text-gray-400 pb-4">Email</th>
                <th className="text-gray-400 pb-4">Role</th>
                <th className="text-gray-400 pb-4">Joined</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-b border-gray-800 hover:bg-[#242424] transition"
                >

                  <td className="py-4 text-white">
                    {user.username}
                  </td>

                  <td className="py-4 text-gray-300">
                    {user.email}
                  </td>

                  <td className="py-4">

                    <span className={`px-3 py-1 rounded-full text-xs md:text-sm capitalize
                      ${user.role === "admin"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-gray-600/20 text-gray-400"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="py-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {users.length === 0 && (
            <p className="text-gray-400 text-center py-10">
              No users found
            </p>
          )}

        </div>

      </div>

    </div>

  )
}

export default AdminUsers