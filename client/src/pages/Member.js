import React, { useContext } from 'react';
import { authContext } from '../utils/appContext';

export default () => {
  const { user, loading} = useContext(authContext);
 // console.log(user, loading);
  return <>
   <h1>HELLO {user?.name}</h1> 
  </>
};
