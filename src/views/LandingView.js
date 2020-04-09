/*
  View - LandingView
  
  View for when user first opens website - landing page
*/

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'; 
import { loadUser, endpoint } from '../App';

class LandingView extends Component {
  constructor(props) {
    super(props); 
    this.state = {
        joinRoomVal: '',
        redirectTo: '', 
        errorText: ''
    };

    this.createNewRoom = this.createNewRoom.bind(this); 
    this.joinRoom = this.joinRoom.bind(this);
    this.handleJoinRoomValChanged = this.handleJoinRoomValChanged.bind(this); 
  }

  // create a new Room 
  createNewRoom() {
    axios.post(`${endpoint}/api/room`)
    .then((res) => {
        if (res.data.status == "success") {
            this.setState({ redirectTo: `/room/staging/${res.data.room.short_id}` });
        }
        else {
            this.setState({ errorText: res.data.details });
        }
    })
    .catch((err) => {
        console.log(err);
        this.setState({ errorText: "Server error while creating room" });
    });
  }

  // join the given Room 
  joinRoom(e) {
    e.preventDefault(); 
    axios.get(`${endpoint}/api/room/staging/${this.state.joinRoomVal}`)
    .then((res) => {
      if (res.data.status == "success") {
        this.setState({ redirectTo: `/room/staging/${res.data.room.short_id}` });
      }
      else {
        this.setState({ errorText: 'Requested room does not exist' });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ errorText: 'Error: Server failure' });
    });
  }

  // update the Room id value
  handleJoinRoomValChanged(e) {
    this.setState({ joinRoomVal: e.target.value });
  }

  render() {
    if (this.state.redirectTo) {
        return(<Redirect to={this.state.redirectTo}></Redirect>);
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
          <div className="col s12 m6 offset-m3 center-align white-text">
            <h1>Pitch</h1>
            <p>
              Welcome to the online pitch game. For basic rules talk to Seth John or visit
              the <Link to="/help">Help</Link> page
            </p>
            <p>
              Login to keep stats on your account, or play as anonymous user.
            </p>
          </div>
        </div>
        { errorMessage }
        <div className="row">
          <div className="col s12 m4 offset-m4 center-align">
            <button onClick={this.createNewRoom} className="btn waves-effect">Create Room</button>
          </div>
        </div>
        <div className="row center-align">
          <p>If you already have a room ready, enter the ID below to join.</p>
        </div>
        <form onSubmit={this.joinRoom}>
            <div className="row center-align">
            <div className="col s9 m3 offset-m4 input-field inline">
                <input id="room-id" type="text" className="validate" onChange={this.handleJoinRoomValChanged}value={this.state.joinRoomVal} required />
                <label htmlFor="room-id">Room ID</label>
            </div>
            <div className="col s2 m1">
                <button type="submit" className="btn waves-effect">Join</button>
            </div>
            </div>
        </form>
      </div>
    );
  }
}

export default LandingView;