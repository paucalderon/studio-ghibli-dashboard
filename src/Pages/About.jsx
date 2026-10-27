
import Sidebar from "../Components/Sidebar";
import "../App.css";

function About() {
  return (
    <div className="dashboard about-page">
      <Sidebar />

      <header className="about-header">
        <p className="about-eyebrow">OUR LITTLE CORNER OF MAGIC</p>
        <h1>About Studio Ghibli 🍃</h1>
        <p className="subtitle">
          A celebration of imagination, adventure, and the stories
          that stay with us.
        </p>
      </header>

      <section className="about-intro">
        <h2>Ghibli Movies</h2>
        <p>
          Studio Ghibli is a Japanese animation studio celebrated for
          its imaginative worlds, unforgettable characters, and
          thoughtful stories.
        </p>
      </section>

      <section className="about-features">
        <article className="about-feature">
          <span className="about-icon">🎬</span>
          <h3>Explore the films</h3>
          <p>
            Browse movie posters, release years, directors, and
            descriptions of Studio Ghibli films.
          </p>
        </article>

        <article className="about-feature">
          <span className="about-icon">📊</span>
          <h3>Discover the data</h3>
          <p>
            Compare Rotten Tomatoes scores and explore charts that
            reveal patterns across the movie collection.
          </p>
        </article>

        <article className="about-feature">
          <span className="about-icon">🔎</span>
          <h3>Find your favorite</h3>
          <p>
            Search for a movie by title and open its detail page to
            learn more about its story and creators.
          </p>
        </article>
      </section>

    </div>
  );
}

export default About;

