/* 
  components/Navbar

  Navbar for the site 
*/

import React, { Component } from 'react';

//Design imports
import '../App.css';

import { Link } from 'react-router-dom';
import { loadUser, logoutUser } from '../App';

class Navbar extends Component {
  constructor(props) {
    super(props); 

    // Intialize state to landing page
    this.state = {
      path: '/',
    }
    
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.pageBodyLoader = this.pageBodyLoader.bind(this); 
  }

  handleLogoutClick() {
    logoutUser();
    window.location.reload();
  }

  // The top right of the navbar will change based off of what page is currently loaded into the body
  pageBodyLoader(username) {
    let headPart;

    if (!username) {
      headPart = (
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
    else {
      headPart = (
        <ul className="right">
          <li>
            {username}
          </li>
          <li>
            <a onClick={this.handleLogoutClick}>Logout</a>
          </li>
        </ul>
      );
    }
    
    return headPart;
  }

  render() {
    let username = loadUser();
    let part = this.pageBodyLoader(username);

    return(
      // Materialize utilizes header, main, footer
      <header>
        <div className="navbar">
          <nav>
            <div className="nav-wrapper">
              <ul id="nav-mobile" className="left">
                <li>
                  <Link to="/">Pitch</Link>
                </li>
                <li>
                  <Link to="/help">Help</Link>
                </li>
              </ul>
              {part}
            </div>
          </nav>   
        </div>
      </header>
    );
  }
}

export default Navbar;