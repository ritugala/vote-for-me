import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom"
import CreateUser from './components/create-user.component'
import Navbar from './components/navbar.component'
import DisplayUser from './components/display-user.component'
import EditUser from './components/edit-user.component';
import VoteOff from './components/vote-off.component.js'
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/create" component={CreateUser}/>
        <Route path="/user" component={DisplayUser}/>
        <Route path='/edit/:id' component={EditUser}/>
        <Route path='/voteoff' component={VoteOff}/>
      </div>
    </Router>
  );
}

export default App;
