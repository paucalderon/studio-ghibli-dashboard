
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://ghibliapi.dev/films");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesYear =
      selectedYear === 0 ||
      Number(movie.release_date) >= selectedYear;

    return matchesSearch && matchesYear;
  });

  const years = [...new Set(movies.map((movie) => movie.release_date))]
    .sort((a, b) => Number(a) - Number(b));

  const minYear = Number(years[0] || 1984);
  const maxYear = Number(years[years.length - 1] || 2023);

  const moviesShown = filteredMovies.length;

  const moviesWithScores = filteredMovies.filter(
    (movie) => movie.rt_score !== "" && movie.rt_score != null
  );

  const averageScore =
    moviesWithScores.length > 0
      ? Math.round(
          moviesWithScores.reduce(
            (total, movie) => total + Number(movie.rt_score),
            0
          ) / moviesWithScores.length
        )
      : 0;

  const highestScore =
    moviesWithScores.length > 0
      ? Math.max(
          ...moviesWithScores.map((movie) => Number(movie.rt_score))
        )
      : 0;

  return (
    <div className="dashboard">
      <h1>🌱 Studio Ghibli Movie Dashboard 🍃</h1>

      <p className="subtitle">
        ✨ A little collection of stories, magic and adventure ✨
      </p>

      <div className="stats-container">
        <div className="stat-card">
          <h2>🎬 Movies Shown</h2>
          <p>{moviesShown}</p>
        </div>

        <div className="stat-card">
          <h2>⭐ Average Score</h2>
          <p>
            {moviesWithScores.length > 0 ? `${averageScore}%` : "—"}
          </p>
        </div>

        <div className="stat-card">
          <h2>🏆 Highest Score</h2>
          <p>
            {moviesWithScores.length > 0 ? `${highestScore}%` : "—"}
          </p>
        </div>
      </div>

      <div className="controls-panel">
        <input
          type="text"
          placeholder="🔎 Search movies by title..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <div className="year-filter">
          <label htmlFor="year-slider">
            🌸 Release year:{" "}
            {selectedYear === 0 || selectedYear === minYear
              ? "All years"
              : `${selectedYear} and later`}
          </label>

          <input
            id="year-slider"
            type="range"
            min={minYear}
            max={maxYear}
            step="1"
            value={selectedYear || minYear}
            onChange={(event) =>
              setSelectedYear(Number(event.target.value))
            }
          />
        </div>
      </div>

      {loading && (
        <p className="loading-message">Loading movies...</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && !error && (
        filteredMovies.length === 0 ? (
          <p className="no-results">
            No movies found. Try another search or release year.
          </p>
        ) : (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className="poster-wrapper">
                  <img
                    className="movie-poster"
                    src={movie.image}
                    alt={`Poster for ${movie.title}`}
                  />

                  <span className="score-badge">
                    ⭐ {movie.rt_score}%
                  </span>
                </div>

                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>
                    <strong>📅 Release year:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>🍅 Rotten Tomatoes:</strong> {movie.rt_score}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default App;


