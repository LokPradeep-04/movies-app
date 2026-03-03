import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Cookies from "js-cookie";
import Slider from "react-slick";
import Loader from "./Loader";

const TrendingCarousel = () =>{
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);

      const token = Cookies.get("abcde");

      const response = await fetch(
        "https://apis.ccbp.in/movies-app/trending-movies",
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

    fetchTrending();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };

  return (
    <div className="px-12 mb-8 mt-10">
      <h2 className="text-white text-2xl mb-4">Trending Now</h2>

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

export default TrendingCarousel;