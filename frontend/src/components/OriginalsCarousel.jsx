import { useState, useEffect, use } from "react";
import MovieCard from "./MovieCard";
import Slider from "react-slick";
function OriginalsCarousel() {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    fetch("https://apis.ccbp.in/movies-app/originals", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
      }
    })
      .then(res => res.json())
      .then(data => setMovies(data.results));  
  }, []);
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };
  return (
    <div className="px-12 mb-20 ">
      <h2 className="text-white text-2xl mb-4">Originals</h2>
      <Slider {...settings}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </Slider>
    </div>
  );
}

export default OriginalsCarousel;