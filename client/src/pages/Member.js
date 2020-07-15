import React, {useContext} from 'react';
import {authContext} from '../utils/appContext'

export default ()=>{
    const {user} = useContext(authContext);
    console.log(user)
    return <h1>HELLO {user?.name || "Stranger"}</h1>
} 