import React from 'react';
import BankNavbar from '../components/navbar/BankNavbar';

const BankLayout = ({ children }) => {
  return (
    <>
      <BankNavbar />
      <div className="p-4 bg-light min-vh-100">{children}</div>
    </>
  );
};

export default BankLayout;
