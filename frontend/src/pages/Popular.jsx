import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import Cookies from 'js-cookie'
const Popular=()=> {
  const token = Cookies.get("abcde")
  const [movies,setMovies] = useState([])


  useEffect(()=>{
    fetch("https://apis.ccbp.in/movies-app/popular-movies",{
      headers:{
         Authorization: `Bearer ${token}`
      }
    })
    .then(res=>res.json())
    .then(data=>setMovies(data.results))
  },[])

  return (
    <div className='min-h-screen bg-[#181818] '>
      <Navbar/>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 pt-32 pb-20">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
    </div>
  )
}

export default Popular