import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Member from './pages/Member';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import './App.css';
import {authContext} from './utils/appContext';
import API from './utils/API';
import ItemAdd from './pages/ItemAdd';
import LearnMore from './pages/LearnMore';
import ItemDetails from './pages/ItemDetails';

function App() {
  let loggedIn = false;
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem("google_token") ? JSON.parse(localStorage.getItem("google_token")) : null
    if(token){
      API.getUser(token).then(({data})=> setUser(data))
    }
  }, [])

  console.log(user);

  return (
    <Router>
      <authContext.Provider value={{user}}>
        <Nav />
        <Switch>
          <Route path="/" exact component={()=> <Landing setUser={setUser}/>} />
          <Route path="/member" exact component={Member} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route exact path="/learn" component={LearnMore} />
          <Route exact path="/view-item/:id" component={ ItemDetails } />
          {/* <Route path="/add" exact component={() => <ItemAdd user={user} /> } /> */}
          <Route exact path="/add" render={() => {
            return <ItemAdd user={user} />
          }} />
        </Switch>
      </authContext.Provider>
      </Router>
)
        }
export default App;
