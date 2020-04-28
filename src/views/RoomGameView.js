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

    this.getAssignedTeam = this.getAssignedTeam.bind(this); 
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

  getAssignedTeam(player) {
    // Get the team the player is on 
    if (this.state.room.team1.player1._id === player._id || this.state.room.team1.player2._id === player._id) {
      return 1; 
    }
    else if (this.state.room.team2.player1._id === player._id || this.state.room.team2.player2._id === player._id) {
      return 2; 
    }
    else {
      console.log("Error: Player ID does not match any team members");
      return -1; 
    }
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
    if (this.getAssignedTeam(this.state.player) === 1) {
      // User is on team 1 
      players = [
        this.state.room.team2.player1, 
        (this.state.playerId === this.state.room.team1.player1._id ? this.state.room.team1.player2 : this.state.room.team1.player1),
        this.state.room.team2.player2
      ];
    }
    else if (this.getAssignedTeam(this.state.player) === 2) {
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

    let suitTag = "???"; 
    let suitImg = "red_back.png";
    let biddingTag = (<p>Noone has set the bid yet</p>);
    if (this.state.room.activeGame.bid > 0) {
      if (this.state.room.activeGame.suit >= 0) {
        switch (this.state.room.activeGame.suit) {
          case 0: {
            suitTag = "Clubs";
            suitImg = "honor_clubs.png";
            break;
          }
          case 1: {
            suitTag = "Diamonds";
            suitImg = "honor_diamond.png";
            break;
          }
          case 2: {
            suitTag = "Hearts";
            suitImg = "honor_heart.png";
            break;
          }
          case 3: {
            suitTag = "Spades";
            suitImg = "honor_spade.png";
            break;
          }
          default: {
            console.log("Error: Could not set a suit: " + this.state.room.activeGame.suit); 
            break; 
          }
        }
        biddingTag = (
          <div>
            <p>{this.state.room.activeGame.biddingTeam} set bid at {this.state.room.activeGame.bid} in {suitTag}</p>
            <img src={"../assets/img/cards/" + suitImg} alt={suitTag} />
          </div>
        );
      }
      else {
        biddingTag = (<p>{this.state.room.activeGame.biddingTeam} holds the bid at {this.state.room.activeGame.bid}</p>);
      }
    }

    return(
      <div className="container-fluid">
        <div className="row player-zone-col">
          <div className="col s4">
            <div className="row">
              <PlayerZone player={players[0]} team={this.getAssignedTeam(players[0])} activePlayer={this.state.room.activeGame.activePlayer}></PlayerZone>
              <PlayerZone player={players[1]} team={this.getAssignedTeam(players[1])} activePlayer={this.state.room.activeGame.activePlayer}></PlayerZone>
              <PlayerZone player={players[2]} team={this.getAssignedTeam(players[2])} activePlayer={this.state.room.activeGame.activePlayer}></PlayerZone>
            </div>
          </div>
          <div className="col s8">
            <div className="row team-score-col">
              <TeamScore team={this.state.room.team1} teamNum={1}></TeamScore>
              <TeamScore team={this.state.room.team2} teamNum={2}></TeamScore>
            </div>
            <div className="row">
              <div className="col s12 center-align">
                {biddingTag}
              </div>
            </div>
            <div className="row">
              <div className="col s12 m10 offset-m1 center-align">
                <h5>{this.state.room.roomStatus}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col s12 center-align">
                <p>Place the cards that users have played here. Make sure to denote who played the card, what the current suit is, and team colors surrounding the card.</p>
                <p>Need buttons to fit somewhere. Probably use alerts or danger banners for invalid actions.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row user-zone-col">
          <UserZone player={this.state.player} team={this.getAssignedTeam(this.state.player)} activePlayer={this.state.room.activeGame.activePlayer}></UserZone>
        </div>
      </div>

    );
  }
}

export default RoomGameView;