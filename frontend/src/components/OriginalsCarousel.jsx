import API_BASE_URL from "../config/config";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Cookies from "js-cookie";
import Slider from "react-slick";
import Loader from "./Loader";

const OriginalsCarousel = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOriginals = async () => {

      try {

        const token = Cookies.get("accessToken");

        const response = await fetch(
          `${API_BASE_URL}/api/movies?category=originals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMovies(data);
        }

      } catch (error) {
        console.log(error);
      }

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
    responsive: [

      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 }
      },

      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },

      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },

      {
        breakpoint: 640,
        settings: { slidesToShow: 2 }
      },

      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }

    ]
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 mb-20">

      <h2 className="text-white text-lg sm:text-xl md:text-2xl mb-4">
        Originals
      </h2>

      {loading ? (
        <Loader />
      ) : (

        <Slider {...settings}>

          {movies.map((movie) => (

            <div key={movie._id} className="px-2">
              <MovieCard movie={movie} />
            </div>

          ))}

        </Slider>

      )}

    </div>
  );
};

export default OriginalsCarousel;