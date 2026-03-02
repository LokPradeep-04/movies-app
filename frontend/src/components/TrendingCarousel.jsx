import { useState,useEffect } from 'react'
import MovieCard from './MovieCard'
import  Cookies from 'js-cookie'
import Slider from "react-slick";
function TrendingCarousel() {
  const [movies,setMovies] = useState([])
  useEffect(()=>{
    const token = Cookies.get("abcde")
    fetch("https://apis.ccbp.in/movies-app/trending-movies",{
      headers :{
        Authorization : `Bearer ${token}`
      }
    })
    .then(res=>res.json())
    .then(data=>setMovies(data.results))
  },[])
   const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };
  return (
  <div className='px-12 mb-8 mt-10'>
    <h2 className="text-white text-2xl mb-4">Trending Now</h2>

    <Slider {...settings}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </Slider>

  </div>
)
}

export default TrendingCarousel