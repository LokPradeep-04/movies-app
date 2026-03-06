import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

const MovieDetailCard = ({ movie }) => {

  const navigate = useNavigate();

  if (!movie) return null;

  const addToWatchlist = async () => {

    const token = Cookies.get("accessToken");

    const movieData = {
      movieId: movie._id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path
    };

    try {

      const res = await fetch(
        "http://localhost:3000/api/watchlist",
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
        toast.success("Added to Watchlist ❤️");
      } else {
        toast.error(data.message);
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
              onClick={addToWatchlist}
              className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Add to Watchlist
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

        <h2 className="text-xl font-semibold mb-6">
          More Like This
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

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