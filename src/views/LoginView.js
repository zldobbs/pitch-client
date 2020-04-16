/*
  View - LoginView
  
  Basic login form 
*/

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { endpoint, loginUser, loadUser } from '../App';
import axios from 'axios'; 

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        usernameVal: '',
        passwordVal: '',
        errorText: '',
        redirect: false 
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleUsernameValChange = this.handleUsernameValChange.bind(this);
    this.handlePasswordValChange = this.handlePasswordValChange.bind(this);
  }

  verifyLoginAttempt() {
    if (this.state.userNameVal == '' || this.state.passwordVal == '') {
      return false; 
    }
    else {
      return true; 
    }
  }

  // send login attempt to be authenticated
  handleLoginSubmit(e) {
      e.preventDefault();
      if (this.verifyLoginAttempt() == false) {
        this.setState({ errorText: 'Missing required fields' });
        return; 
      }

      let loginAttempt = { 
        username: this.state.usernameVal, 
        password: this.state.passwordVal
      };

      axios.post(`${endpoint}/api/login/`, loginAttempt)
      .then((res) => {
          if (res.data.status === "success") {
              loginUser(loginAttempt.username);
              this.setState({ redirect: true });
          }
          else {
              this.setState({ errorText: res.data.details });
          }
      })
      .catch((err) => {
          console.log(err);
          this.setState({ errorText: 'Failed: Server Error' });
      });
      // reset login form
      this.setState({ loginVal: '', passwordVal: '' });
  }

  // update the state of the username based on what is being typed
  handleUsernameValChange(e) {
    this.setState({ usernameVal: e.target.value });
  }
  
  // update the state of the password based on what is being typed
  handlePasswordValChange(e) {
      this.setState({ passwordVal: e.target.value });
  }

  render() {
    if (this.state.redirect || loadUser()) {
      console.log('User already logged in');
      return(<Redirect to="/"></Redirect>);
    }
    // display an error if one is set  
    let errorMessage;
    if (this.state.errorText === '') {
        errorMessage = (
            <span></span>
        );
    }
    else {
        errorMessage = (
            <div className="row">
                <div className="col s12 m4 push-m4 z-depth-1 white-text red">
                    <p>{this.state.errorText}</p>
                </div>
            </div>
        );
    }
    return(
      <div className="container">
        <div className="row">
          <h3 className="center-align">Login</h3>
        </div>
        { errorMessage }
        <form onSubmit={this.handleLoginSubmit}>
          <div className="row">
            <div className="col s12 m4 offset-m4 input-field inline">
              <input id="username" type="text" value={this.state.usernameVal} onChange={this.handleUsernameValChange} className="validate" required />
              <label htmlFor="username">Username</label>
            </div>
            <div className="col s12 m4 offset-m4 input-field inline">
              <input id="password" type="password" value={this.state.passwordVal} onChange={this.handlePasswordValChange} className="validate" required />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12 m4 offset-m4 right-align">
              <button type="submit" className="btn waves-effect">Submit</button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col s4 m4 offset-m4 center-align">
            <p>Need an account? <Link to="/register">Click here to register.</Link></p>
          </div>
        </div>
        <div className="row">
          <div className="col s4 m4 offset-m4 center-align">
            <p><Link to="/">Home</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginView;