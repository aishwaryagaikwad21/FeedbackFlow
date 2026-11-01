import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("adminToken");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;