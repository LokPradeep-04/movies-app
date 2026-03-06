import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");

  const token = Cookies.get("accessToken");

  useEffect(() => {

    const fetchWatchlist = async () => {

      try {

        const response = await fetch(
          "http://localhost:3000/api/watchlist",
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

  }, []);
  console.log(movies)
  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <p className="text-red-500 p-10">Failed to load watchlist</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="px-10 py-10">

        <h1 className="text-3xl font-bold mb-10 pl-9 pt-17">
          My Watchlist
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-400 text-center pt-10">
            Your watchlist is empty.
          </p>
        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 ">

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