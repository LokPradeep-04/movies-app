import API_BASE_URL from "../config/config";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Cookies from "js-cookie";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await fetch(
          `${API_BASE_URL}/api/movies?category=popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMovies(data);
        }

      } catch (error) {
        console.log("Error fetching popular movies:", error);
      }

      setLoading(false);
    };

    fetchPopular();

  }, []);
  return (
    <div className="min-h-screen bg-[#181818]">

      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition mt-25 ml-9 text-white"
      >
        ← Back
      </button>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6  pb-20">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Popular;