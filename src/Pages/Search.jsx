import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "../App.css";

function Search() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("https://ghibliapi.dev/films");
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar />

      <h1>🔎 Search Studio Ghibli Movies</h1>
      <p className="subtitle">Find your next magical adventure.</p>

      <div className="controls-panel">
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading-message">Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              className="movie-card"
              key={movie.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                className="movie-poster"
                src={movie.image}
                alt={`Poster for ${movie.title}`}
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>📅 Release year: {movie.release_date}</p>
              </div>
            </Link>
          ))}

          {filteredMovies.length === 0 && (
            <p className="no-results">No movies found...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
