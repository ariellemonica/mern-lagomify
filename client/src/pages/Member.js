import React, { useContext } from 'react';
import { authContext } from '../utils/appContext';
import ItemAdd from '../pages/ItemAdd';

// the user? div around the imported pages/components is necessary because we don't want them to load before authentication is done

export default () => {
  const { user, loading } = useContext(authContext);
  console.log(user, loading);
  return (<>
    <h1>HELLO {user?.name}</h1>
    {user ? <div>
      <ItemAdd user = {user}/>
    </div> : <div>Loading user information ... </div>}
  </>);
};
