import API_BASE_URL from "../config/config";
import { useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import SearchNotFound from "../components/SearchNotFound";
import Loader from "../components/Loader";

const Search = () => {

  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("accessToken");

  const fetchedData = async () => {

    if (searchInput.trim() === "") {
      setMovies([]);
      setSearched(false);
      setEmptySearch(true);
      return;
    }

    setEmptySearch(false);
    setSearched(true);
    setLoading(true);

    const response = await fetch(
      `${API_BASE_URL}/api/movies/search?q=${searchInput}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    setMovies(data);
    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-[#181818]">

      <Navbar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        fetchedData={fetchedData}
      />

      
      {emptySearch ? (

        <div className="flex justify-center items-center pt-32 px-4 text-center">
          <p className="text-gray-400 text-lg md:text-xl">
            Please enter a movie name to search
          </p>
        </div>

      ) : loading ? (

        <Loader />

      ) : movies.length > 0 ? (

        <div className="pt-28 px-4 sm:px-8 md:px-12 pb-20">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">

            {movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}

          </div>

        </div>

      ) : searched ? (

        <div className="pt-28">
          <SearchNotFound />
        </div>

      ) : null}

    </div>

  );
};

export default Search;