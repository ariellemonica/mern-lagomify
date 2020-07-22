import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { authContext } from './utils/appContext';
import { SignUp, Login, Nav } from './components';
import {
  Donate, ItemAdd, ItemDetails, Landing, LearnMore, Member, ViewMyStuff
} from './pages';
import API from './utils/API';
import './App.css';

function App () {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token =
      localStorage.getItem('google_token')
        ? JSON.parse(localStorage.getItem('google_token'))
        : null;
    if (token) {
      // Do a try-catch here. If API.getUser() fails, set google_token to null.
      API.getUser(token).then(({ data }) => {
        setUser(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Router>
      <authContext.Provider value={{ user, loading }}>
        <Nav />
        <Switch>

          <Route exact path="/" component={() =>
            <Landing setUser={setUser}/>} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/learn" component={LearnMore} />
          { (!user && !loading) ? <Redirect to="/"/> : '' }
          <Route exact path="/add" render={() => {
            return <ItemAdd />;
          }} />
          <Route exact path="/member" component={Member} />
          <Route exact path="/view" component={ViewMyStuff} />
          <Route exact path="/view-item/:id" component={ItemDetails} />
        </Switch>
      </authContext.Provider>
    </Router>
  );
}

export default App;
