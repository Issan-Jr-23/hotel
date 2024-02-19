import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

// Asumiendo que allowedRoles se pasa como prop
export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  
  if (loading) return ;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};
