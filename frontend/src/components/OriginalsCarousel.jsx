import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Cookies from "js-cookie";
import Slider from "react-slick";
import Loader from "./Loader";

const OriginalsCarousel = ()=> {
  const token = Cookies.get("abcde");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOriginals = async () => {
      setLoading(true);

      const response = await fetch(
        "https://apis.ccbp.in/movies-app/originals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setMovies(data.results || []);
      setLoading(false);
    };

    fetchOriginals();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };

  return (
    <div className="px-12 mb-20">
      <h2 className="text-white text-2xl mb-4">Originals</h2>

      {loading ? (
        <Loader/>

      ) : (
        <Slider {...settings}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default OriginalsCarousel;