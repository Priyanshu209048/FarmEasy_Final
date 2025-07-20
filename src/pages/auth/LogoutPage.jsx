import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
  useEffect(() => {
    localStorage.removeItem("token"); // or sessionStorage
    // Clear other user data if needed
  }, []);

  return <Navigate to="/" replace />;
};

export default LogoutPage;