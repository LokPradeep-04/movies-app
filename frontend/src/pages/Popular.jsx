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

      {/* Back Button */}
      <div className="pt-24 px-4 sm:px-8 md:px-12">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition text-white"
        >
          ← Back
        </button>
      </div>

      {loading ? (

        <Loader />

      ) : (

        <div className="px-4 sm:px-8 md:px-12 pb-20 mt-6">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">

            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}

          </div>

        </div>

      )}

    </div>

  );
};

export default Popular;