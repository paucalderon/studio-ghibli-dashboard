
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  function MovieScoresChart({ movies }) {
    const scoredMovies = movies
      .filter((movie) => movie.rt_score !== "" && movie.rt_score != null)
      .map((movie) => ({
        title: movie.title,
        score: Number(movie.rt_score),
      }))
      .sort((a, b) => b.score - a.score);
  
    return (
      <div className="chart-card">
        <h2>⭐ Rotten Tomatoes Movie Scores</h2>
  
        <ResponsiveContainer
          width="100%"
          height={Math.max(300, scoredMovies.length * 35)}
        >
          <BarChart
            data={scoredMovies}
            layout="vertical"
            margin={{ left: 20, right: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="title"
              width={140}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
            <Bar dataKey="score" fill="#e8a0a0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default MovieScoresChart;
  