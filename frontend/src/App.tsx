import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TenantAdmin from './pages/Tenant_Admin/index';
import SuperAdmin from './pages/Super_Admin/index';
import Driver from './pages/Driver';
import Crew from './pages/Crew';
import Signin from './pages/AuthenticationF/SigninForm';
import ProtectedRoute from './pages/ProtectedRoute'; 
import Signup from './pages/AuthenticationF/SignupForm';
import DefaultLayout from './layout/DefaultLayout';
import { MdDashboard } from 'react-icons/md';
import Dashboard from '../src/pages/Dashboard/ECommerce'
import usePreviousPath from './common/HistortTracker';
const App = () => {

   usePreviousPath();
    return (
        <Routes>
        <Route path="/" element={<Signin/>} />
        <Route element={<DefaultLayout/>}>
        {/* <Route path="/" element={<Signup/>} /> */}
        
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* Add other admin-specific routes here */}
        </Route>

        {/* Tenant Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['TENANT_ADMIN']} />}>
          <Route path="/tenantAdmin/dashboard" element={<Dashboard />} />
          {/* Add other tenant-admin-specific routes here */}
        </Route>

        {/* Driver Routes */}
        <Route element={<ProtectedRoute allowedRoles={['driver']} />}>
          <Route path="/driver/dashboard" element={<Driver />} />
          {/* Add other driver-specific routes here */}
        </Route>

        {/* Crew Routes */}
        <Route element={<ProtectedRoute allowedRoles={['crew']} />}>
          <Route path="/crew/dashboard" element={<Crew />} />
          {/* Add other crew-specific routes here */}
        </Route>
        </Route>
      </Routes>
    );
};

export default App;
