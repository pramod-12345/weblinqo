// src/components/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const key = localStorage.getItem("x-admin-key");

  if (!key) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
