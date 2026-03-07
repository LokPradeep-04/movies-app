import API_BASE_URL from "../config/config";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Hero = () => {

  const [movie, setMovie] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  const token = Cookies.get("accessToken");

  useEffect(() => {

    const fetchHeroMovie = async () => {

      const res = await fetch(
        `${API_BASE_URL}/api/movies?category=popular`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      

      setMovie(data[0]);

      const watchlistRes = await fetch(
        `${API_BASE_URL}/api/watchlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const watchlist = await watchlistRes.json();

      const exists = watchlist.some(
        (item) => item.movieId === heroMovie._id
      );

      setInWatchlist(exists);
    };

    fetchHeroMovie();

  }, [token]);



  const addToWatchlist = async () => {

    const movieData = {
      movieId: movie._id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path
    };

    try {

      const res = await fetch(
        `${API_BASE_URL}/api/watchlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(movieData)
        }
      );

      if (res.ok) {
        toast.success("Added to Watchlist ");
        setInWatchlist(true);
      }

    } catch {
      toast.error("Something went wrong");
    }

  };


  if (!movie) return null;

  return (
    <div
      className="relative w-full h-[85vh] bg-cover bg-center flex items-center px-12"
      style={{ backgroundImage: `url(${movie.backdrop_path})` }}
    >
      <div className="text-white max-w-xl">

        <h1 className="text-5xl font-semibold mb-4">
          {movie.title}
        </h1>

        <p className="text-gray-200 mb-6">
          {movie.overview}
        </p>

        <div className="flex gap-4">

          <a
            href={movie.trailer_url}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition"
          >
            ▶ Play
          </a>

          {inWatchlist ? (

            <button
              className="bg-gray-600 px-6 py-2 rounded cursor-not-allowed"
            >
              ✓ In Watchlist
            </button>

          ) : (

            <button
              onClick={addToWatchlist}
              className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition"
            >
              + Watchlist
            </button>

          )}

        </div>

      </div>
    </div>
  );
};

export default Hero;