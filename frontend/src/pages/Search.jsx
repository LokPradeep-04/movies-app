import { useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'

const Search = () => {
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const token = Cookies.get("abcde")

  const fetchedData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`,
      options
    )

    const data = await response.json()
    setMovies(data.results || [])
  }
console.log(movies.length)
  return (
    <div className='min-h-screen bg-[#181818]'>
      <Navbar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        fetchedData={fetchedData}
      />
      <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 pt-32 pb-20">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search