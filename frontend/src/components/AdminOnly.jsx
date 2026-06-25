import { Navigate } from "react-router-dom";

function AdminOnly({ children }) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminOnly;