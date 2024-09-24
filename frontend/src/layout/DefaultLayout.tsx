import React, { useEffect, useState } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routePermissions } from '../common/constants';


// Function to match dynamic routes
const matchRoute = (pathname:any, route:any) => {
  const routeParts = route.split('/');
  const pathnameParts = pathname.split('/');

  if (routeParts.length !== pathnameParts.length) {
    return false;
  }

  return routeParts.every((part:any, index:any) => {
    return part.startsWith(':') || part === pathnameParts[index];
  });
};

const hasPermission = (pathname:any, userRole:any) => {
  for (const route in routePermissions) {
    if (matchRoute(pathname, route)) {
      return routePermissions[route].includes(userRole);
    }
  }
  return false;
};

const DefaultLayout: React.FC = () => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const user = useSelector((state: any) => state.auth.user);

  if (!loggedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!hasPermission(pathname, user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
