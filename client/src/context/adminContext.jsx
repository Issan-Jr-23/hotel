// AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext.jsx';

 function AdminRoute({ children }) {
  const { isAdmin } = useAuth();

  return isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute
