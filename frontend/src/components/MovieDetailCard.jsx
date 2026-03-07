import API_BASE_URL from "../config/config";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const MovieDetailCard = ({ movie }) => {

  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const token = Cookies.get("accessToken");

  if (!movie) return null;

  useEffect(() => {

    const checkWatchlist = async () => {

      try {

        const res = await fetch(
          `${API_BASE_URL}/api/watchlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (res.ok) {

          const exists = data.some(
            (item) => item.movieId === movie._id
          );

          setIsSaved(exists);

        }

      } catch (error) {
        console.log(error);
      }

    };

    checkWatchlist();

  }, [movie._id, token]);



  const toggleWatchlist = async () => {

    try {

      if (isSaved) {


        const res = await fetch(
          `${API_BASE_URL}/api/watchlist/${movie._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.ok) {
          toast.success("Removed from Watchlist");
          setIsSaved(false);
        }

      } else {

        // ADD MOVIE
        const movieData = {
          movieId: movie._id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path
        };

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

        const data = await res.json();

        if (res.ok) {
          toast.success("Added to Watchlist ");
          setIsSaved(true);
        } else {
          toast.error(data.message);
        }

      }

    } catch {
      toast.error("Something went wrong");
    }

  };


  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      >

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

        <div className="relative z-10 flex flex-col justify-center h-full px-10 max-w-2xl">

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            {movie.title}
          </h1>

          <p className="text-gray-300 mb-5 text-sm">
            {movie.runtime} • {movie.release_date}
          </p>

          <p className="text-gray-200 mb-7 leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex gap-4">

            <a
              href={movie.trailer_url}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              ▶ Play Trailer
            </a>

            <button
              onClick={toggleWatchlist}
              className={`px-6 py-2 rounded transition ${
                isSaved
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isSaved ? " Remove from Watchlist" : " Add to Watchlist"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Go Back
            </button>

          </div>

        </div>
      </div>

      <div className="px-10 py-12">

        <h2 className="text-xl font-semibold mb-8">
          More Like This
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {movie.similar_movies?.map((item, index) => (
            <img
              key={index}
              src={item.poster_path}
              alt={item.title}
              onClick={() => navigate(`/movies/${item._id}`)}
              className="rounded cursor-pointer hover:scale-105 transition duration-300"
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default MovieDetailCard;