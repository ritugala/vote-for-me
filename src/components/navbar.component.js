import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Vote-Off</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">View Rankings</Link>
          </li>
          <li className="navbar-item">
          <Link to="/voteoff" className="nav-link">VoteOff!</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}