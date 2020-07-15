import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Member from './pages/Member';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import './App.css';
import {authContext} from './utils/appContext'
import {getUser} from './utils/API'
const passport = require("passport");


function App() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem("google_token") ? JSON.parse(localStorage.getItem("google_token")) : null
    if(token){
      getUser(token).then(({data})=> setUser(data))
    }
  }, [])

  return (
    <Router>
    <authContext.Provider value={{user}}>
        <Nav/>
      <Switch>
        <Route path="/" exact component={()=> <Landing setUser={setUser}/>}/>
        <Route path="/member" exact component={Member}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={SignUp}/>
      </Switch>
    </authContext.Provider>
 </Router>
  );
}

export default App;
