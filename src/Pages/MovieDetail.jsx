import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://ghibliapi.dev/films");
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        const foundMovie = data.find((item) => item.id === id);

        if (!foundMovie) {
          throw new Error("Movie not found");
        }

        setMovie(foundMovie);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <p className="loading-message">Loading movie...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard">
    <Sidebar />
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="movie-detail-card">
        <img
          className="movie-detail-poster"
          src={movie.movie_banner || movie.image}
          alt={`Poster for ${movie.title}`}
        />

        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <p><strong>Original title:</strong> {movie.original_title}</p>
          <p><strong>Release year:</strong> {movie.release_date}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Producer:</strong> {movie.producer}</p>
          <p><strong>Rotten Tomatoes score:</strong> {movie.rt_score}%</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Running time:</strong> {movie.running_time} minutes</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
