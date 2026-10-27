
import { NavLink } from "react-router-dom";
import "../App.css";

function Sidebar() {
  return (
    <aside className="left-sidebar">
      <h2>🌱 Ghibli Movies</h2>

      <nav className="sidebar-nav">
        <NavLink to="/" end>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/search">
          🔎 Search
        </NavLink>

        <NavLink to="/about">
          🌿 About
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
