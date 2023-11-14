import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { CircularProgress } from "@nextui-org/react";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="w-full min-h-screen flex justify-center items-center">
      <CircularProgress label="Loading..." />
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
