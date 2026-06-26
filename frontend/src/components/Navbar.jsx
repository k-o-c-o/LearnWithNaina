import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">

        <div className="navbar-content">

            <Link to="/dashboard" className="logo">
                Learn<span>with Naina</span>
            </Link>

            <div className="nav-links">

                <Link to="/dashboard">
                    My Courses
                </Link>

                <Link to="/add-courses">
                    Add Courses
                </Link>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>

    </nav>
);
}

export default Navbar;