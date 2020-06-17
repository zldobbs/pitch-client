/*
  View - RoomStagingView
  
  404 error handler
*/

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { siteLink, endpoint, loadUser, socket, loadPlayerId } from '../App';

import TeamList from '../components/TeamList'; 
import ChatButton from '../components/ChatButton';

class RoomStagingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      room: {},
      user: '',
      playerId: undefined,
      player: {}
    };

    this.handleReadyClick = this.handleReadyClick.bind(this);
    this.playerIsInRoom = this.playerIsInRoom.bind(this); 
    this.getRoom = this.getRoom.bind(this);
  }

  componentDidMount() {
    socket.on('room-update', (room) => {
      this.setState({ room: room });
    });

    socket.on('room-ready', (roomId) => {
      this.setState({ redirect: true });
    });

    this.getRoom();

    setInterval(this.getRoom, 5000);
  }

  getRoom() {
    // Retrieve the current room
    axios.get(`${endpoint}/api/room/${this.props.match.params.roomId}`)
    .then((res) => {
      if (res.data.status === "success") {
        if (res.data.room.activeGame !== null) {
          this.setState({ redirect: true, room: res.data.room });
          return; 
        }

        if (Object.keys(this.state.room).length === 0 && this.state.room.constructor === Object) {
          socket.emit('join-room', res.data.room.short_id);
        }

        this.setState({ 
          room: res.data.room,
          user: loadUser(), 
          playerId: loadPlayerId() 
        });

        // Get the player if the user is signed in 
        if (this.state.playerId) {
          axios.get(`${endpoint}/api/player/${this.state.playerId}`)
          .then((res) => {
            this.setState({ player: res.data.player });
          }).catch((err) => {
            console.log(err); 
          })
        }
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  handleReadyClick() {
    if (this.state.playerId === undefined) {
      return; 
    }

    const readyRequest = { 
      playerId: this.state.playerId,
      roomId: this.state.room._id
    };
    axios.post(`${endpoint}/api/player/ready`, readyRequest)
    .then((res) => {
      if (res.data.status === "success") {
        this.setState({ player: res.data.player });
      }
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  playerIsInRoom() {
    if (this.state.playerId === undefined || this.state.room === {}) {
      return false; 
    }
    if (this.state.room.team1.player1 && this.state.room.team1.player1._id === this.state.player._id) {
      return true; 
    }
    if (this.state.room.team1.player2 && this.state.room.team1.player2._id === this.state.player._id) {
      return true; 
    }
    if (this.state.room.team2.player1 && this.state.room.team2.player1._id === this.state.player._id) {
      return true; 
    }
    if (this.state.room.team2.player2 && this.state.room.team2.player2._id === this.state.player._id) {
      return true; 
    }
    return false; 
  }

  render() {
    if (this.state.redirect) {
      return(<Redirect to={{ pathname:`/room/${this.state.room.short_id}` }}></Redirect>);
    }

    if (this.state.room === {}) {
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
    if (this.playerIsInRoom()) {
      if (this.state.player.isReady) {
        readyButton = (<button onClick={this.handleReadyClick} className="btn waves-effect green">Ready</button>);
      }
      else {
        readyButton = (<button onClick={this.handleReadyClick} className="btn waves-effect grey">Ready Up</button>);
      }
    }
    else {
      readyButton = (<span></span>);
    }
    return(
      <div className="container-fluid">
        <ChatButton roomId={this.state.room.short_id} messages={this.state.room.messages}></ChatButton>
        <div className="container">
          <div className="row center-align">
            <div className="col s12 m6 offset-m3">
              <h4>Preparing game</h4>
              <h6>Your Room ID is: { this.state.room.short_id }</h6>
              <p>The magic link to join this room is: <Link to={{ pathname:`/room/staging/${this.state.room.short_id}` }}>{siteLink}/room/staging/{this.state.room.short_id}</Link></p>
            </div>
          </div>
          <div className="row center-align">
            <div className="col s12 m6 offset-m3">
              <p>You are {loginText}</p>
            </div>
          </div>
          <div className="row center-align">
            <TeamList player={this.state.player} team={this.state.room.team1}></TeamList>
            <TeamList player={this.state.player} team={this.state.room.team2}></TeamList>
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
      </div>
    );
  }
}

export default RoomStagingView;