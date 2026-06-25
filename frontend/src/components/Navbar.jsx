import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard">My Courses</Link>

      <Link to="/add-courses">
        Add Courses
      </Link>

      <Link to="/grades">Grades</Link>

      <Link to="/login">Logout</Link>
    </nav>
  );
}

export default Navbar;