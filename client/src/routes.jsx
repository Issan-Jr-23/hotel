import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
// import Lottie from "react-lottie";
// import loading_progress from "./images/Animation-loading.json"

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  // const [showLoading, setShowLoading] = useState(true);

  // const defaultOption = {
  //   loop: true,
  //   autoPlay: true,
  //   animationData: loading_progress,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // }

  // useEffect(() => {
  //   if (!loading) {
  //     const timer = setTimeout(() => {
  //       setShowLoading(false);
  //     }, 4000); 

  //     return () => clearTimeout(timer);
  //   }
  // }, [loading]);

  // if (showLoading) {
  //   return <div className="w-full min-h-screen flex justify-center items-center flex-col">
  //     <Lottie options={defaultOption} width={100} height={100}/>
  //     <p className="text-black">Cargando el token</p>
  //   </div>;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
