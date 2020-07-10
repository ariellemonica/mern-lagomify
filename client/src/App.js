import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ItemAdd from './components/pages/ItemAdd';

function App() {
  return (
    <Router>
      <Route exact path="/add" component={ItemAdd} />
      <Route exact path="/">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer">
              Learn React</a>
          </header>
        </div>
      </Route>
    </Router>
  );
}

export default App;
