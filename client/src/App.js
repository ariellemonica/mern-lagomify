import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ItemAdd from './pages/ItemAdd';
<<<<<<< HEAD
/*import FileUpload from "./components/FileUpload";*/
=======
import LearnMore from './pages/LearnMore';
import ItemDetails from './pages/ItemDetails';
>>>>>>> master

function App () {
  return (
    <Router>
      <Route exact path="/add" component={ItemAdd} />
      <Route exact path="/learn" component={LearnMore} />
      <Route exact path="/view-item/:id" component={ ItemDetails } />
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
