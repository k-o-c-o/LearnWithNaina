import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        Learn With
        <br />
        Naina
      </div>

      <nav>

        <NavLink to="/admin">
          Courses
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;