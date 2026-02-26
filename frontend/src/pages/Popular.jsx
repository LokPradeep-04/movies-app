import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
function Popular() {
  const [movies,setMovies] = useState([])
  useEffect(()=>{
    fetch("https://apis.ccbp.in/movies-app/popular-movies",{
      headers:{
         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
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