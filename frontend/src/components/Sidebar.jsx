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
          Dashboard
        </NavLink>

        <NavLink to="/admin">
          Courses
        </NavLink>

        <NavLink to="/admin/students">
          Students
        </NavLink>

        <NavLink to="/admin/grades">
          Grades
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;