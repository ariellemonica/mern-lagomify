import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authContext } from './utils/appContext';
import { SignUp, Login, Nav } from './components';
import {
  ItemAdd, ItemDetails, Landing, LearnMore, Member, ViewMyStuff
} from './pages';
import API from './utils/API';
import './App.css';

function App () {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token =
      localStorage.getItem('google_token')
        ? JSON.parse(localStorage.getItem('google_token'))
        : null;
    if (token) {
      API.getUser(token).then(({ data }) => setUser(data));
    }
  }, []);

  console.log(user);

  return (
    <Router>
      <authContext.Provider value={{ user }}>
        <Nav />
        <Switch>
          <Route path="/" exact component={() =>
            <Landing setUser={setUser}/>} />
          {/* <Route path="/add" exact component={() => <ItemAdd user={user} /> } /> */}
          <Route exact path="/add" render={() => {
            return <ItemAdd user={user} />;
          }} />
          <Route path="/member" exact component={Member} />
          <Route exact path="/learn" component={LearnMore} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route exact path="/view" component={ViewMyStuff} />
          <Route exact path="/view-item/:id" component={ItemDetails} />
        </Switch>
      </authContext.Provider>
    </Router>
  );
}

export default App;
