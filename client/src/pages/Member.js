import React, {useContext} from 'react';
import {authContext} from '../utils/appContext'

// import Auth from '../auth';

// console.log('auth context', authContext.user);

// console.log(Auth.checkLoggedIn());

export default ()=>{
    const {user} = useContext(authContext);
    console.log(user)
    return <h1>HELLO {user?.name || "Stranger"}</h1>
} 