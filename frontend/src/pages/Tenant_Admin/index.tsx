import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectAccessToken, selectUserData } from '../../redux/authSlice';
const index = () => {

  const accessToken = useSelector((state: RootState) => selectAccessToken(state));
  const userData = useSelector((state: RootState) => selectUserData(state));
  const userRole = userData ? userData.role_name : null;
  console.log(accessToken ,  userData);
  return (
    <div>
       <h1>Profile Page</h1>
      <p>Token: {accessToken} </p>
      <p>User Role: {userRole}</p>
      <p>User Data: {JSON.stringify(userData)}</p> 
    </div>
  )
}

export default index
