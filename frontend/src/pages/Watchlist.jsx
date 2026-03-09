import API_BASE_URL from "../config/config";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");

  const token = Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {

    const fetchWatchlist = async () => {

      try {

        const response = await fetch(
          `${API_BASE_URL}/api/watchlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMovies(data);
          setStatus("success");
        } else {
          setStatus("error");
        }

      } catch {
        setStatus("error");
      }

    };

    fetchWatchlist();

  }, [token]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return (
      <p className="text-red-500 pt-28 px-6">
        Failed to load watchlist
      </p>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="pt-24 px-4 sm:px-8 md:px-12 pb-16">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          My Watchlist
        </h1>

        {movies.length === 0 ? (

          <p className="text-gray-400 text-center pt-10 text-lg">
            Your watchlist is empty.
          </p>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">

            {movies.map((movie) => (
              <MovieCard
                key={movie.movieId}
                movie={{ ...movie, _id: movie.movieId }}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Watchlist;