import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { RoleProvider } from './context/RoleContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import DefaultNavbar from './components/navbar/DefaultNavbar';
import FarmerLayout from './layouts/FarmerLayout';
import BankLayout from './layouts/BankLayout';
import AdminLayout from './layouts/AdminLayout';
import LogoutPage from './pages/auth/LogoutPage';

import FarmerDashboard from './pages/farmer/Dashboard';
import LoanFormPage from './pages/farmer/LoanFormPage';
import GrievancesPage from './pages/farmer/GrievancesPage';
import SchemesPage from './pages/farmer/SchemesPage';
import UpdateLoanFormPage from './pages/farmer/UpdateLoanFormPage';
import FarmerLoanFormDetailPage from "./pages/farmer/FarmerLoanFormDetailPage";
import ApplyStatusPage from "./pages/farmer/ApplyStatusPage";
import SchemeDetailsPage from './pages/farmer/ScehemeDetailsPage';

import BankDashboard from './pages/bank/Dashboard';
import AddScheme from './pages/bank/AddScheme';
import ApplyRequestsPage from './pages/bank/ApplyRequestsPage';
import SchemeRulesPage from './pages/bank/SchemeRulesPage';
import BankSchemesPage from "./pages/bank/BankSchemesPage";
import LoanFormDetailPage from "./pages/bank/LoanFormDetailPage";
import BankGrievancesPage from "./pages/bank/BankGrievancesPage";
import EditSchemePage from './pages/bank/EditSchemePage';

import GovernmentDashboardPage from './pages/admin/GovernmentDashboardPage';
import GrievanceListPage from './pages/admin/GrievanceListPage';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<><DefaultNavbar /><HomePage /></>} />
          <Route path="/login" element={<><DefaultNavbar /><LoginPage /></>} />
          <Route path="/register" element={<><DefaultNavbar /><RegisterPage /></>} />
          <Route path="/dashboard" element={<><DefaultNavbar /><Dashboard /></>} />
          <Route path="/logout" element={<><DefaultNavbar /><LogoutPage /></>} />

          {/* Farmer Routes */}
          <Route path="/farmer/dashboard" element={<FarmerLayout><FarmerDashboard /></FarmerLayout>} />
          <Route path="/farmer/loan-form" element={<FarmerLayout><LoanFormPage /></FarmerLayout>} />
          <Route path="/farmer/grievances" element={<FarmerLayout><GrievancesPage /></FarmerLayout>} />
          <Route path="/farmer/view-schemes" element={<FarmerLayout><SchemesPage /></FarmerLayout>} />
          <Route path="/farmer/update-loan-form" element={<FarmerLayout><UpdateLoanFormPage /></FarmerLayout>} />
          <Route path="/farmer/view-loan-form" element={<FarmerLayout><FarmerLoanFormDetailPage /></FarmerLayout>} />
          <Route path="/farmer/apply-status" element={<FarmerLayout><ApplyStatusPage /></FarmerLayout>} />
          <Route path="/farmer/scheme/:id" element={<FarmerLayout><SchemeDetailsPage /></FarmerLayout>} />

          {/* Bank Routes */}
          <Route path="/bank/dashboard" element={<BankLayout><BankDashboard /></BankLayout>} />
          <Route path="/bank/add-scheme" element={<BankLayout><AddScheme /></BankLayout>} />
          <Route path="/bank/apply-requests" element={<BankLayout><ApplyRequestsPage /></BankLayout>} />
          <Route path="/bank/scheme-rules" element={<BankLayout><SchemeRulesPage /></BankLayout>} />
          <Route path="/bank/my-schemes" element={<BankLayout><BankSchemesPage /></BankLayout>} />
          <Route path="/bank/loan-form/:id" element={<BankLayout><LoanFormDetailPage /></BankLayout>} />
          <Route path="/bank/view-grievances" element={<BankLayout><BankGrievancesPage /></BankLayout>} />
          <Route path="/bank/edit-scheme/:id" element={<EditSchemePage />} />

          {/* Government Routes */}
          <Route path="/gov/dashboard" element={<AdminLayout><GovernmentDashboardPage /></AdminLayout>} />
          <Route path="/gov/grievences" element={<AdminLayout><GrievanceListPage /></AdminLayout>} />
        </Routes>
      </Router>
    </RoleProvider>
  );
}

export default App;
