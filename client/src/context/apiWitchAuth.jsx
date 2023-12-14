// AppWithAuth.jsx
import React from 'react';
import NavMenu from '../components/NavMenu.jsx';
import { useAuth } from './authContext.jsx';

const AppWithAuth = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <NavMenu />}
    </>
  );
};

export default AppWithAuth;
