import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({allowedRoles }) => {
  const user = useSelector((state:any)=>state.auth.user)
  const isLoggedIn = useSelector((state:any)=>state.auth.isLoggedIn)
  

  if (!user || !isLoggedIn) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.user_role)) {
    return <Navigate to="/not-authorized" replace />;
  }

    // return <Navigate to="/unauthorized" replace />;
    return <Outlet />;
};

export default ProtectedRoute;
