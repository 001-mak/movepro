import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from './layout/ProtectedRoute';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import DefaultLayout from './layout/DefaultLayout';

import Companies from './pages/Company/Companies';
import AECompany from './pages/Company/AECompany';
import ViewCompany from './pages/Company/ViewCompany';

import AllLeads from './pages/AllLeads/AllLeads';
import ViewLead from './pages/AllLeads/ViewLead';

import UsersLV from './pages/User/UsersLV';
import PaymentHistory from './pages/PaymentHistory/PaymentHistory';
import AEAdminUser from './pages/User/AEAdminUser';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import Packages from './pages/Package/Packages';
import AddPackage from './pages/Package/AddPackage';
import SupportLV from './pages/Support/SupportLV';
import ViewTransaction from './pages/PaymentHistory/ViewTransaction';
import EditCompany from './pages/Company/EditCompany';
import EmailTemplatesLV from './pages/EmailTemplates/EmailTemplatesLV';
import EditEmailTemplate from './pages/EmailTemplates/EditEmailTemplate';
import NotAuthorized from './pages/Authentication/NotAuthorized';
import NotFound from './pages/Authentication/NotFound';
import ChatCard from './components/Chat/ChatCard';
import ProfileSettings from './pages/ProfileSettings';
import CompanyUsersLV from './pages/Company/CompanyUsersLV';
import MaterialsLV from './pages/TenantPages/Materials/MaterialsLV';
import AEMaterial from './pages/TenantPages/Materials/AEMaterial';
import AEDeposit from './pages/TenantPages/Deposits/AEDeposit';
import DepositsLV from './pages/TenantPages/Deposits/DepositsLV';
import AEDiscount from './pages/TenantPages/Discounts/AEDiscount';
import DiscountsLV from './pages/TenantPages/Discounts/DiscountsLV';
import AdditionalServicesLV from './pages/TenantPages/AdditionalServices/AdditionalServicesLV';
import AEAdditionalService from './pages/TenantPages/AdditionalServices/AEAdditionalService';
import AEValuation from './pages/TenantPages/Valuations/AEValuation';
import ValuationsLV from './pages/TenantPages/Valuations/ValuationsLV';

// const publicUrls = [
//   '/auth/signin',
//   '/auth/signup',
//   '/auth/reset-password',
//   '/auth/forgot-password',
// ];
function App() {
  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Best Moving CRM Software" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Best Moving CRM Software" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <>
              <PageTitle title="Forgot Password | Best Moving CRM Software" />
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <>
              <PageTitle title="Reset Password | Best Moving CRM Software" />
              <ResetPassword />
            </>
          }
        />
        

        <Route
          path="/not-authorized"
          element={
            <>
              <PageTitle title="Not Authorized | Best Moving CRM Software" />
              <NotAuthorized />
            </>
          }
        />

        <Route element={<><DefaultLayout /></>}>
          <Route>
            <Route
              index
              element={
                <>
                  <PageTitle title="Moventry Dashboard | Super Admin" />
                  <ECommerce />
                </>
              }
            />
          </Route>

          {/* --------------------------------Super Admin Routes --------------------------------------------- */}


          <Route
            path="/companies"
            element={
              <>
               <ProtectedRoute allowedRoles={['super_admin']} />
                <PageTitle title="Companies | Best Moving CRM Software" />
                <Companies />
              </>
            }
          />

          <Route
            path="/view-company/:id"
            element={
              <>
               <ProtectedRoute allowedRoles={['super_admin']} />
                <PageTitle title="Company Information" />
                <ViewCompany />
              </>
            }
          />
          <Route
            path="/add-company"
            element={
              <>
               <ProtectedRoute allowedRoles={['super_admin']} />
                <PageTitle title="Add Company | Best Moving CRM Software" />
                <AECompany />
              </>
            }
          />
          
          <Route
            path="/edit-company/:id"
            element={
              <>
               <ProtectedRoute allowedRoles={['super_admin' ,'tenant_admin']} />
                <PageTitle title="Edit Company | Best Moving CRM Software" />
                <EditCompany />
              </>
            }
          />
          <Route
            path="/all-leads"
            element={
              <>
               <ProtectedRoute allowedRoles={['super_admin' ,'tenant_admin']} />
                <PageTitle title="Moventry | All Leads" />
                <AllLeads />
              </>
            }
          />
          <Route
            path="/view-lead/:id"
            element={
              <>
               <ProtectedRoute allowedRoles={['super_admin' ,'tenant_admin']} />
                <PageTitle title="View Lead | Best Moving CRM Software" />
                <ViewLead />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
               <ProtectedRoute allowedRoles={['super_admin' ,'tenant_admin']} />
                <PageTitle title="Users management" />
                <UsersLV />
              </>
            }
          />
          <Route
            path="/add-user"
            element={
              <>
                <PageTitle title="Add User | Best Moving CRM Software" />
                <AEAdminUser />
              </>
            }
          />
          <Route
            path="/view-user/:id"
            element={
              <>
                <PageTitle title="Edit User | Best Moving CRM Software" />
                <AEAdminUser />
              </>
            }
          />
          <Route
            path="/payments"
            element={
              <>
                <PageTitle title="Payments History | Best Moving CRM Software" />
                <PaymentHistory />
              </>
            }
          />
          <Route
            path="/view-transaction/:id"
            element={
              <>
                <PageTitle title="View Transaction | Best Moving CRM Software" />
                <ViewTransaction />
              </>
            }
          />
          <Route
            path="/packages"
            element={
              <>
                <PageTitle title="Packages | Best Moving CRM Software" />
                <Packages />
              </>
            }
          />
          <Route
            path="/add-package"
            element={
              <>
                <PageTitle title="Add Package | Best Moving CRM Software" />
                <AddPackage />
              </>
            }
          />
          <Route
            path="/edit-package/:id"
            element={
              <>
                <PageTitle title="Edit Package | Best Moving CRM Software" />
                <AddPackage />
              </>
            }
          />
          <Route
            path="/support"
            element={
              <>
                <PageTitle title="Support | Best Moving CRM Software" />
                <SupportLV />
              </>
            }
          />
          <Route
            path="/emailtemplates"
            element={
              <>
                <PageTitle title="Email Templates | Best Moving CRM Software" />
                <EmailTemplatesLV />
              </>
            }
          />
          <Route
            path="/edit-emailtemplate/:id"
            element={
              <>
                <PageTitle title="Edit Email Template" />
                <EditEmailTemplate />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | Best Moving CRM Software" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Best Moving CRM Software" />
                <Profile />
              </>
            }
          />
          <Route
            path="/my-profile"
            element={
              <>
                <PageTitle title="Settings | Best Moving CRM Software" />
                <ProfileSettings />
              </>
            }
          />
          <Route
            path="/chat"
            element={
              <>
                <PageTitle title="Settings | Best Moving CRM Software" />
                <ChatCard />
              </>
            }
          />

          {/* Tenant Routes Start */}
          <Route
            path="/materials"
            element={
              <>
                <PageTitle title="Materials | Best Moving CRM Software" />
                <MaterialsLV />
              </>
            }
          />
          <Route
            path="/add-material"
            element={
              <>
                <PageTitle title="Add Materials | Best Moving CRM Software" />
                <AEMaterial />
              </>
            }
          />
          <Route
            path="/edit-material/:id"
            element={
              <>
                <PageTitle title="Edit Materials | Best Moving CRM Software" />
                <AEMaterial />
              </>
            }
          />
          <Route
            path="/deposits"
            element={
              <>
                <PageTitle title="Deposits | Best Moving CRM Software" />
                <DepositsLV />
              </>
            }
          />
          <Route
            path="/add-deposit"
            element={
              <>
                <PageTitle title="Add Deposit | Best Moving CRM Software" />
                <AEDeposit />
              </>
            }
          />
          <Route
            path="/edit-deposit/:id"
            element={
              <>
                <PageTitle title="Edit Deposit | Best Moving CRM Software" />
                <AEDeposit />
              </>
            }
          />
          <Route
            path="/discounts"
            element={
              <>
                <PageTitle title="Discounts | Best Moving CRM Software" />
                <DiscountsLV />
              </>
            }
          />
          <Route
            path="/add-discount"
            element={
              <>
                <PageTitle title="Add Discount | Best Moving CRM Software" />
                <AEDiscount />
              </>
            }
          />
          <Route
            path="/edit-discount/:id"
            element={
              <>
                <PageTitle title="Edit Discount | Best Moving CRM Software" />
                <AEDiscount />
              </>
            }
          />
          <Route
            path="/additionalservices"
            element={
              <>
                <PageTitle title="Additional Services | Best Moving CRM Software" />
                <AdditionalServicesLV />
              </>
            }
          />
          <Route
            path="/add-additionalservice"
            element={
              <>
                <PageTitle title="Add Additional Services | Best Moving CRM Software" />
                <AEAdditionalService />
              </>
            }
          />
          <Route
            path="/edit-additionalservice/:id"
            element={
              <>
                <PageTitle title="Edit Additional Services | Best Moving CRM Software" />
                <AEAdditionalService />
              </>
            }
          />
          <Route
            path="/valuations"
            element={
              <>
                <PageTitle title="Full Value Protection | Best Moving CRM Software" />
                <ValuationsLV />
              </>
            }
          />
          <Route
            path="/add-valuation"
            element={
              <>
                <PageTitle title="Add Full Value Protection | Best Moving CRM Software" />
                <AEValuation />
              </>
            }
          />
          <Route
            path="/edit-valuation/:id"
            element={
              <>
                <PageTitle title="Edit Full Value Protection | Best Moving CRM Software" />
                <AEValuation />
              </>
            }
          />
          {/* Tenant Routes End */}
        </Route>

        <Route
          path="*"
          element={
            <>
              <PageTitle title="Not Found | Best Moving CRM Software" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
