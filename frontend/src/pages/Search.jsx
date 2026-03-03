import { useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import SearchNotFound from '../components/SearchNotFound'
import Loader from '../components/Loader'

const Search = () => {
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searched, setSearched] = useState(false)
  const [emptySearch, setEmptySearch] = useState(false)
  const [loading, setLoading] = useState(false)

  const token = Cookies.get("accessToken")

  const fetchedData = async () => {

    if (searchInput.trim() === '') {
      setMovies([])
      setSearched(false)
      setEmptySearch(true)
      return
    }

    setEmptySearch(false)
    setSearched(true)
    setLoading(true)
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
    setLoading(false)
  }
  
  return (
    <div className='min-h-screen bg-[#181818]'>
      <Navbar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        fetchedData={fetchedData}
      />
      {emptySearch ? (
        <div className="flex justify-center items-center pt-70">
          <p className="text-gray-400 text-xl">
            Please enter a movie name to search
          </p>
        </div>
      ) : loading ?(
        <Loader/>
      ):movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 pt-32 pb-20">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

      ) : searched ? (
        <SearchNotFound />
      ) : null}
    </div>
  )
}

export default Search