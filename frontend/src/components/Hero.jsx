import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Hero = () => {

  const [movie, setMovie] = useState(null);
  const token = Cookies.get("accessToken");

  useEffect(() => {

    const fetchHeroMovie = async () => {

      const res = await fetch(
        "http://localhost:3000/api/movies?category=trending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setMovie(data[1]);
    };

    fetchHeroMovie();

  }, []);

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

        <a
          href={movie.trailer_url}
          target="_blank"
          rel="noreferrer"
          className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition"
        >
          Play
        </a>

      </div>
    </div>
  );
};

export default Hero;