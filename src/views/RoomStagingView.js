/*
  View - RoomStagingView
  
  404 error handler
*/

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { siteLink, endpoint, loadUser, loadTeam, socket } from '../App';

import TeamList from '../components/TeamList'; 

class RoomStagingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      roomId: '',
      team1: '',
      team2: '',
      user: '',
      userTeamId: '',
      userPlayer: '', 
    };

    this.handleReadyClick = this.handleReadyClick.bind(this);
  }

  componentDidMount() {
    // Setup socket endpoints 
    socket.on('team-change', (team1, team2) => {
      this.setState({ team1: team1, team2: team2 });
    });

    socket.on('room-ready', (roomId) => {
      this.setState({ redirect: true });
    });

    // Retrieve the current room
    axios.get(`${endpoint}/api/room/${this.props.match.params.roomId}`)
    .then((res) => {
      if (res.data.status == "success") {
        this.setState({ 
          roomId: res.data.room.short_id,
          team1: res.data.room.team1,
          team2: res.data.room.team2,
          redirect: res.data.room.isActive
        });
        socket.emit('join-room', res.data.room.short_id);
      }
      else {
        this.setState({ room: '' });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ room: '' });
    });

    let teamInfo = loadTeam();
    if (teamInfo != undefined) {
      this.setState({
        userTeamId: teamInfo[0], 
        userPlayer: teamInfo[1]
      });
    }
    this.setState({ user: loadUser() });
  }

  handleReadyClick() {
    if (this.state.userPlayer == '') {
      return; 
    }

    let readyRequest = {
      'teamId': this.state.userTeamId,
      'playerNum': this.state.userPlayer
    };
    axios.post(`${endpoint}/api/team/ready`, readyRequest)
    .then((res) => {
      console.log(res); 
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  render() {
    if (this.state.redirect) {
      return(<Redirect to={{ pathname:`/room/${this.state.roomId}` }}></Redirect>);
    }

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

    let loginText; 
    if (this.state.user) {
      loginText = `logged in as ${this.state.user}`;
    }
    else {
      loginText = `not logged in. Sign in to save game history.`; 
    }

    let readyButton;
    if (this.state.userPlayer != '' && (this.state.userTeamId == this.state.team1._id || this.state.userTeamId == this.state.team2._id)) {
      let team = (this.state.team1._id == this.state.userTeamId ? this.state.team1 : this.state.team2); 
      let playerReady = (this.state.userPlayer == 'player1' ? team.player1Ready : team.player2Ready);
      if (playerReady) {
        readyButton = (<button onClick={this.handleReadyClick} className="btn waves-effect green">Ready</button>);
      }
      else {
        readyButton = (<button onClick={this.handleReadyClick} className="btn waves-effect red">Not Ready</button>);
      }
    }
    else {
      readyButton = (<span></span>);
    }

    return(
      <div className="container">
        <div className="row center-align">
          <div className="col s12 m6 offset-m3">
            <h4>Preparing game</h4>
            <h6>Your Room ID is: { this.state.roomId }</h6>
            <p>The magic link to join this room is: <Link to={{ pathname:`/room/staging/${this.state.roomId}` }}>{siteLink}/room/staging/{this.state.roomId}</Link></p>
          </div>
        </div>
        <div className="row center-align">
          <div className="col s12 m6 offset-m3">
            <p>You are {loginText}</p>
          </div>
        </div>
        <div className="row center-align">
          <TeamList team={this.state.team1}></TeamList>
          <TeamList team={this.state.team2}></TeamList>
        </div>
        <div className="row center-align">
          <p>Game will begin when all players are ready</p>
          {readyButton}
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

export default RoomStagingView;