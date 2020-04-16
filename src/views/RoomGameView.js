/*
  View - RoomGameView
  
  View for the game 
*/

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'; 
import { socket, endpoint, loadTeam } from '../App';

import Card from '../components/Card';
import PlayerZone from '../components/PlayerZone';
import UserZone from '../components/UserZone';
import TeamScore from '../components/TeamScore';

class RoomGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      roomId: '', 
      team1: '', 
      team2: '', 
      userTeamId: '', 
      userPlayer: '',
      userHand: []
    }
  }

  componentDidMount() {
    socket.on('user-hand', (hand) => {
      this.setState({ userHand: hand });
    });

    // Retrieve the current room
    let teamInfo = loadTeam(); 
    if (teamInfo == undefined) {
      this.setState({ redirect: true });
      return;
    }

    this.setState({
      userTeamId: teamInfo[0], 
      userPlayer: teamInfo[1]
    });

    axios.get(`${endpoint}/api/room/${this.props.match.params.roomId}`)
    .then((res) => {
      if (res.data.status == "success") {
        this.setState({ 
          roomId: res.data.room.short_id,
          team1: res.data.room.team1,
          team2: res.data.room.team2
        });

        // Retrieve user's hand 
        let handRequest = {
          teamId: this.state.userTeamId, 
          playerNum: this.state.userPlayer
        };
        axios.post(`${endpoint}/api/game/hand`, handRequest)
        .then((res) => {
          if (res.data.status == "success") {
            console.log(res.data.hand);
            this.setState({ userHand: res.data.hand.sort((a, b) => a - b) });
            console.log(this.state.userHand);
          }
          else {
            this.setState({ redirect: true });
          }
        }).catch((err) => {
          console.log(err); 
          this.setState({ redirect: true });
        })
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
    if (this.state.redirect) {
      return(<Redirect to="/"></Redirect>);
    }

    let players = [];
    let user; 
    // TODO Really, really, really need to rework backend to make player its own table...
    if (this.state.team1 == this.state.userTeamId) {
      if (this.state.userPlayer == 'player1') {
        user = this.state.team1.player1DisplayName;
        players = [
          this.state.team2.player1DisplayName, 
          this.state.team1.player2DisplayName,
          this.state.team2.player2DisplayName
        ];
      }
      else {
        user = this.state.team1.player2DisplayName;
        players = [
          this.state.team2.player1DisplayName, 
          this.state.team1.player1DisplayName,
          this.state.team2.player2DisplayName
        ];
      }
    }
    else {
      if (this.state.userPlayer == 'player1') {
        user = this.state.team2.player1DisplayName;
        players = [
          this.state.team1.player1DisplayName, 
          this.state.team2.player2DisplayName,
          this.state.team1.player2DisplayName
        ];
      }
      else {
        user = this.state.team1.player2DisplayName;
        players = [
          this.state.team1.player1DisplayName, 
          this.state.team2.player1DisplayName,
          this.state.team1.player2DisplayName
        ];
      }
    }

    return(
      <div className="container-fluid">
        <div className="row player-zone-col">
          <div className="col s4">
            <div className="row">
              <PlayerZone name={players[0]}></PlayerZone>
              <PlayerZone name={players[1]}></PlayerZone>
              <PlayerZone name={players[2]}></PlayerZone>
            </div>
          </div>
          <div className="col s8">
            <div className="row team-score-col">
              <TeamScore team={this.state.team1}></TeamScore>
              <TeamScore team={this.state.team2}></TeamScore>
            </div>
          </div>
        </div>
        <div className="row user-zone-col">
          <UserZone name={user} hand={this.state.userHand}></UserZone>
        </div>
      </div>

    );
  }
}

export default RoomGameView;