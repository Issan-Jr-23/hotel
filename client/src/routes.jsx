import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import {CircularProgress} from "@nextui-org/react";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="w-full min-h-screen flex justify-center items-center "><CircularProgress label="Loading..." /></div>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};
