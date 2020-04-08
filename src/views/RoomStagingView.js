/*
  View - RoomStagingView
  
  404 error handler
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { siteLink, endpoint, loadUser } from '../App'; 

import TeamList from '../components/TeamList'; 

class RoomStagingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      user: ''
    };

    // TODO need to redirect to in progress game if the room has already started
  }

  componentDidMount() {
    axios.get(`${endpoint}/api/room/staging/${this.props.match.params.roomId}`)
    .then((res) => {
      if (res.data.status == "success") {
        this.setState({ room: res.data.room });
      }
      else {
        this.setState({ room: '' });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ room: '' });
    });

    this.setState({ user: loadUser() });
  }

  render() {
    if (this.state.room == '') {
      return(
        <div className="container">
          <div className="row center-align">
            <div className="col s12 m6 offset-m3">
              <h3>Oops</h3>
              <p>The room you tried to join does not exist.</p>
            </div>
          </div>
        </div>
      );
    }

    return(
      <div className="container">
        <div className="row center-align">
          <div className="col s12 m6 offset-m3">
            <h4>Preparing game</h4>
            <h6>Your Room ID is: { this.state.room.short_id }</h6>
            <p>The magic link to join this room is: <Link to={{ pathname:`/room/staging/${this.state.room.short_id}` }}>{siteLink}/room/staging/{this.state.room.short_id}</Link></p>
          </div>
        </div>
        <div className="row center-align">
          <TeamList></TeamList>
          <TeamList></TeamList>
        </div>
      </div>
    );
  }
}

export default RoomStagingView;