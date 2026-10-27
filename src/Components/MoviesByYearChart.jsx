
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  function MoviesByYearChart({ movies }) {
    const moviesByYear = Object.values(
      movies.reduce((yearCounts, movie) => {
        const year = movie.release_date;
  
        if (!yearCounts[year]) {
          yearCounts[year] = { year, count: 0 };
        }
  
        yearCounts[year].count += 1;
        return yearCounts;
      }, {})
    ).sort((a, b) => Number(a.year) - Number(b.year));
  
    return (
      <div className="chart-card">
        <h2>🎬 Movies Released by Year</h2>
  
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moviesByYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8fbf88" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default MoviesByYearChart;
  