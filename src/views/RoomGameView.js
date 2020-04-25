/*
  View - RoomGameView
  
  View for the game 
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'; 
import { endpoint, loadPlayerId, loadUser } from '../App';

import PlayerZone from '../components/PlayerZone';
import UserZone from '../components/UserZone';
import TeamScore from '../components/TeamScore';

class RoomGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      room: {}, 
      playerId: '',
      player: {}
    }
  }

  componentDidMount() {
    axios.get(`${endpoint}/api/room/${this.props.match.params.roomId}`)
    .then((res) => {
      if (res.data.status === "success") {
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
      else {
        this.setState({ redirect: true });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ redirect: true });
    });
  }

  render() {
    if (!this.state.room._id || !this.state.player._id) {
      return(
        <div className="row center-align">
          <p>Loading room...</p>
        </div>
      );
    }

    if (this.state.redirect) {
      return(<Redirect to="/"></Redirect>);
    }

    let players = [];
    // Player order should always go opposite team player 1, same team player 2, opposite team player 2
    if (this.state.room.team1.player1._id === this.state.playerId || this.state.room.team1.player2._id === this.state.playerId) {
      // User is on team 1 
      players = [
        this.state.room.team2.player1, 
        (this.state.playerId === this.state.room.team1.player1._id ? this.state.room.team1.player2 : this.state.room.team1.player1),
        this.state.room.team2.player2
      ];
    }
    else if (this.state.room.team2.player1._id === this.state.playerId || this.state.room.team2.player2._id === this.state.playerId) {
      // User is on team 2
      players = [
        this.state.room.team1.player1, 
        (this.state.playerId === this.state.room.team2.player1._id ? this.state.room.team2.player2 : this.state.room.team2.player1),
        this.state.room.team1.player2
      ];
    }
    else {
      // User is not on either team 
      return(<Redirect to="/"></Redirect>);
    }

    return(
      <div className="container-fluid">
        <div className="row player-zone-col">
          <div className="col s4">
            <div className="row">
              <PlayerZone player={players[0]}></PlayerZone>
              <PlayerZone player={players[1]}></PlayerZone>
              <PlayerZone player={players[2]}></PlayerZone>
            </div>
          </div>
          <div className="col s8">
            <div className="row team-score-col">
              <TeamScore team={this.state.room.team1}></TeamScore>
              <TeamScore team={this.state.room.team2}></TeamScore>
            </div>
          </div>
        </div>
        <div className="row user-zone-col">
          <UserZone player={this.state.player}></UserZone>
        </div>
      </div>

    );
  }
}

export default RoomGameView;