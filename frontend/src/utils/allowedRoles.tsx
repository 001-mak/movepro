import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 

export const allowedRoles = ()=>{
  const userData = useSelector((state: RootState) => state.auth.userData);
  if (!userData) {
      return false;
  }

  return userData.user_role;

}