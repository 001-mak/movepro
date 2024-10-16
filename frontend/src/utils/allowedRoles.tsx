import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';  // Assuming RootState is exported from your store

export const allowedRoles = (roles: string[]): boolean => {
  // Accessing the userData from the Redux store
  const userData = useSelector((state: RootState) => state.auth.userData);

  // If userData is null (i.e., no user is logged in), return false
  if (!userData) {
    return false;
  }

  // Check if the user's role is in the allowed roles
  return roles.includes(userData.user_role);
};
