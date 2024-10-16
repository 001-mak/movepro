import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';
import { selectAccessToken, selectUserData } from '../redux/authSlice';
interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const accessToken = useSelector((state: RootState) => selectAccessToken(state));
    const userData = useSelector((state: RootState) => selectUserData(state));

    const userRole = userData ? userData.user_role : null;

  if (!accessToken) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!allowedRoles.includes(userRole || '')) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
