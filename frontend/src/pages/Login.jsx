import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";



function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
        );

        if (res.data.user.role === "admin") {
        navigate("/admin");
        } else {
        navigate("/dashboard");
        }
    } catch (error) {
        alert(
            error.response?.data?.message ||
            error.message ||
            "Server Error"
        );
    }
  };

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have an account?{" "}
            <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;