import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Cookies from "js-cookie";
import Loader from "../components/Loader";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await fetch(
          "http://localhost:3000/api/movies?category=popular",
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

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 pt-32 pb-20">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Popular;