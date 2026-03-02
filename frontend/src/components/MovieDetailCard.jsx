import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function MovieDetailCard({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <>
      <Navbar />

      <div className="text-white">


        <div
          className="relative h-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop_path})` }}
        >
         <div className="absolute inset-0 bg-black/30"  />
          <div className="relative z-10 flex flex-col justify-center h-full px-10 max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

            <p className="text-gray-300 mb-3 text-sm">
              {movie.runtime} mins • {movie.release_date}
            </p>

            <p className="text-gray-100 mb-6 leading-relaxed text-sm">
              {movie.overview}
            </p>

            <button className="bg-white text-black px-5 py-2 rounded font-medium w-fit hover:bg-gray-200">
              Play
            </button>
          </div>
        </div>

  
        <div className="bg-black px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

          <div>
            <p className="text-gray-400 mb-2">Genres</p>
            {movie.genres?.map(g => (
              <p key={g.id} className="pb-0.5">{g.name}</p>
            ))}
          </div>

          <div>
            <p className="text-gray-400 mb-2">Languages</p>
            {movie.spoken_languages?.map(l => (
              <p key={l.id} className="pb-0.5">{l.english_name}</p>
            ))}
          </div>

          <div>
            <p className="text-gray-400 mb-2">Rating</p>
            <p>{movie.vote_average}</p>
            <p className="text-gray-400 mt-3 mb-1">Votes</p>
            <p>{movie.vote_count}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-2">Budget</p>
            <p>{movie.budget}</p>
            <p className="text-gray-400 mt-3 mb-1">Release</p>
            <p>{movie.release_date}</p>
          </div>
        </div>


        <div className="bg-black px-10 pb-12">
          <h2 className="text-xl font-semibold mb-5">More Like This</h2>

          <div className="flex gap-4 overflow-x-auto">
            {movie.similar_movies?.map(item => (
              <img
                key={item.id}
                src={item.poster_path}
                alt={item.title}
                onClick={() => navigate(`/movies/${item.id}`)}
                className="w-40 h-60 object-cover rounded cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default MovieDetailCard;