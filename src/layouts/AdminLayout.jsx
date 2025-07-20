import React from 'react';
import GovernmentNavbar from '../components/navbar/GovernmentNavbar';

const AdminLayout = ({ children }) => {
  return (
    <>
      <GovernmentNavbar />
      <div className="p-4 bg-light min-vh-100">{children}</div>
    </>
  );
};

export default AdminLayout;