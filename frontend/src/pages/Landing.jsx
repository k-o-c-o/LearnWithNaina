import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Learn</h1>

      <h2>with Naina</h2>

      <button
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  );
}

export default Landing;