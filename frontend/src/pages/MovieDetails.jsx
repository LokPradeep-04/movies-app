import API_BASE_URL from "../config/config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "../components/Loader";
import MovieDetailCard from "../components/MovieDetailCard";

const MovieDetails = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("loading");

  const token = Cookies.get("accessToken");

  useEffect(() => {

    const fetchMovie = async () => {

      try {

        const res = await fetch(
          `${API_BASE_URL}/api/movies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setMovie(data);
          setStatus("success");
        } else {
          setStatus("error");
        }

      } catch {
        setStatus("error");
      }
    };

    fetchMovie();

  }, [id]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <p className="text-red-500 p-10">Failed to load movie</p>;
  }

  return <MovieDetailCard movie={movie} />;
};

export default MovieDetails;