function MovieCard({ movie }) {
  return (
    <div className="min-w-50 cursor-pointer transition-transform duration-300 hover:scale-110 px-3">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="h-80 w-70 rounded-lg shadow-lg"
      />
    </div>
  );
}

export default MovieCard;