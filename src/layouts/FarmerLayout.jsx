import React from 'react';
import FarmerNavbar from '../components/navbar/FarmerNavbar';

const FarmerLayout = ({ children }) => {
  return (
    <>
      <FarmerNavbar />
      <div className="p-4 bg-light min-vh-100">{children}</div>
    </>
  );
};

export default FarmerLayout;