import API_BASE_URL from "../config/config";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Cookies from "js-cookie";
import Carousel from "react-multi-carousel";
import Loader from "./Loader";

const TrendingCarousel = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTrending = async () => {

      const token = Cookies.get("accessToken");

      const response = await fetch(
        `${API_BASE_URL}/api/movies?category=trending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setMovies(data);
      setLoading(false);

    };

    fetchTrending();

  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 6
    },
    laptop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 768, min: 640 },
      items: 3
    },
    smallMobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 mt-10 mb-8">

      <h2 className="text-white text-lg sm:text-xl md:text-2xl mb-4">
        Trending Now
      </h2>

      {loading ? (
        <Loader />
      ) : (

       <Carousel
  responsive={responsive}
  infinite={false}
  swipeable
  draggable
  keyBoardControl
  arrows
  renderButtonGroupOutside={false}
  containerClass="carousel-container"
  itemClass="px-2"
>

          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}

        </Carousel>

      )}

    </div>
  );
};

export default TrendingCarousel;