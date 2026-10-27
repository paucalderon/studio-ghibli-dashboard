
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "../App.css";

function NotFound() {
  return (
    <div className="not-found-layout">
      <Sidebar />

      <main className="not-found-page">
        <h1>🌿 Oops! You've wandered off the path.</h1>

        <p>
          This page doesn't exist, but there's always another
          adventure waiting in the world of Studio Ghibli.
        </p>

        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
      </main>
    </div>
  );
}

export default NotFound;

