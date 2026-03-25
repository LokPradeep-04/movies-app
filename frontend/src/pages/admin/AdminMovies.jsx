import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { toast } from "sonner"
import AdminNavbar from "../../components/AdminNavbar"
import Loader from "../../components/Loader"
import API_BASE_URL from "../../config/config"

const AdminMovies = () => {

    const [movies, setMovies] = useState([])
    const [view, setView] = useState("table")
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        title: "",
        poster_path: "",
        backdrop_path: "",
        overview: "",
        release_date: "",
        runtime: "",
        trailer_url: "",
        category: ""
    })

    const token = Cookies.get("accessToken")

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/movies`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.json()
            if (response.ok) {
                setMovies(data)
            }
        } catch (error) {
            console.log("Error fetching movies:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const resetForm = () => {
        setFormData({
            title: "",
            poster_path: "",
            backdrop_path: "",
            overview: "",
            release_date: "",
            runtime: "",
            trailer_url: "",
            category: ""
        })
        setSelectedMovie(null)
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/movies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Movie added successfully!")
                fetchMovies()
                setView("table")
                resetForm()
            } else {
                toast.error(data.message)
            }
        } catch {
            toast.error("Something went wrong")
        }
    }

    const onClickEdit = (movie) => {
        setSelectedMovie(movie)
        setFormData({
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: movie.release_date || "",
            runtime: movie.runtime || "",
            trailer_url: movie.trailer_url || "",
            category: movie.category
        })
        setView("edit")
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/admin/movies/${selectedMovie._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            )
            const data = await response.json()
            if (response.ok) {
                toast.success("Movie updated successfully!")
                fetchMovies()
                setView("table")
                resetForm()
            } else {
                toast.error(data.message)
            }
        } catch {
            toast.error("Something went wrong")
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/admin/movies/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            if (response.ok) {
                toast.success("Movie deleted successfully!")
                fetchMovies()
            }
        } catch {
            toast.error("Something went wrong")
        }
    }

    const renderForm = (isEdit) => (
        <div className="max-w-2xl mx-auto px-4">

            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => { setView("table"); resetForm() }}
                    className="text-gray-400 hover:text-white transition"
                >
                    ← Back
                </button>
                <h2 className="text-white text-xl md:text-2xl font-bold">
                    {isEdit ? "Edit Movie" : "Add New Movie"}
                </h2>
            </div>

            <form
                onSubmit={isEdit ? handleEdit : handleAdd}
                className="bg-[#242424] rounded-lg p-6 md:p-8 space-y-5"
            >

                <input type="text" name="title" value={formData.title} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="Movie title" required />

                <input type="text" name="poster_path" value={formData.poster_path} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="Poster URL" required />

                <input type="text" name="backdrop_path" value={formData.backdrop_path} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="Backdrop URL" required />

                <textarea name="overview" value={formData.overview} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" rows={4} placeholder="Overview" required />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="release_date" value={formData.release_date} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="Release Date" />
                    <input type="text" name="runtime" value={formData.runtime} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="Runtime" />
                </div>

                <input type="text" name="trailer_url" value={formData.trailer_url} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="Trailer URL" />

                <select name="category" value={formData.category} onChange={handleFormChange} className="w-full p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500" required>
                    <option value="">Select category</option>
                    <option value="trending">Trending</option>
                    <option value="popular">Popular</option>
                    <option value="originals">Originals</option>
                </select>

                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition">
                    {isEdit ? "Update Movie" : "Add Movie"}
                </button>

            </form>
        </div>
    )

    if (loading) return <Loader />

    return (
        <div className="min-h-screen bg-[#181818]">

            <AdminNavbar />

            <div className="pt-24 px-4 sm:px-8 md:px-12 pb-20">

                {view === "table" && (
                    <div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                            <h1 className="text-white text-2xl md:text-3xl font-bold">
                                Movies
                            </h1>
                            <button
                                onClick={() => setView("add")}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                            >
                                + Add Movie
                            </button>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full text-left text-sm md:text-base">

                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-gray-400 pb-4">Poster</th>
                                        <th className="text-gray-400 pb-4">Title</th>
                                        <th className="text-gray-400 pb-4">Category</th>
                                        <th className="text-gray-400 pb-4">Release</th>
                                        <th className="text-gray-400 pb-4">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {movies.map((movie) => (
                                        <tr key={movie._id} className="border-b border-gray-800 hover:bg-[#242424] transition">
                                            <td className="py-4">
                                                <img src={movie.poster_path} className="w-12 h-16 rounded object-cover" />
                                            </td>
                                            <td className="py-4 text-white">{movie.title}</td>
                                            <td className="py-4">
                                                <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs md:text-sm capitalize">
                                                    {movie.category}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-400">{movie.release_date || "—"}</td>
                                            <td className="py-4">
                                                <div className="flex gap-2 md:gap-3">
                                                    <button onClick={() => onClickEdit(movie)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs md:text-sm">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(movie._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs md:text-sm">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                            {movies.length === 0 && (
                                <p className="text-gray-400 text-center py-10">
                                    No movies found
                                </p>
                            )}

                        </div>

                    </div>
                )}

                {view === "add" && renderForm(false)}

                {view === "edit" && renderForm(true)}

            </div>

        </div>
    )
}

export default AdminMovies