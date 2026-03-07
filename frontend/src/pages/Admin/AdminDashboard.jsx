import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import AdminNavbar from "../../components/AdminNavbar"
import Loader from "../../components/Loader"
import API_BASE_URL from "../../config/config"

const AdminDashboard = () => {

    const [stats, setStats] = useState(null)

    const token = Cookies.get("accessToken")

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                if (response.ok) {
                    setStats(data)
                }
            } catch (error) {
                console.log("Error fetching stats:", error)
            }
        }
        fetchStats()
    }, [])

    if (!stats) return <Loader />

    return (
        <div className="min-h-screen bg-[#181818]">

            <AdminNavbar />

            <div className="pt-24 px-10">
                <div className="mb-10">
                    <h1 className="text-white text-3xl font-bold">
                        Welcome Admin 👋
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Here's what's happening in your app
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">
                            Total Movies
                        </p>
                        <h2 className="text-white text-4xl font-bold">
                            {stats.totalMovies}
                        </h2>
                    </div>

                   
                    <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">
                            Total Users
                        </p>
                        <h2 className="text-white text-4xl font-bold">
                            {stats.totalUsers}
                        </h2>
                    </div>
                    <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">
                            Trending Movies
                        </p>
                        <h2 className="text-white text-4xl font-bold">
                            {stats.categories.trending}
                        </h2>
                    </div>
                    <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">
                            Popular Movies
                        </p>
                        <h2 className="text-white text-4xl font-bold">
                            {stats.categories.popular}
                        </h2>
                    </div>
                    <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">
                            Originals Movies
                        </p>
                        <h2 className="text-white text-4xl font-bold">
                            {stats.categories.originals}
                        </h2>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminDashboard
