/*
  View - RoomGameView
  
  View for the game 
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'; 
import { endpoint, loadPlayerId, loadUser, socket } from '../App';

import ButtonRow from '../components/ButtonRow'; 
import CardPicker from '../components/CardPicker';
import PlayedCard from '../components/PlayedCard';
import PlayerZone from '../components/PlayerZone';
import UserZone from '../components/UserZone';
import TeamScore from '../components/TeamScore';

class RoomGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      showCardPicker: false, 
      room: {}, 
      playerId: '',
      player: {}
    }

    this.getAssignedTeam = this.getAssignedTeam.bind(this); 
    this.getBiddingTag = this.getBiddingTag.bind(this); 
  }

  componentDidMount() {
    socket.on('room-update', (room) => {
      this.setState({ room: room });

      axios.get(`${endpoint}/api/player/${this.state.playerId}`)
      .then((res) => {
        this.setState({ 
          player: res.data.player,
          showCardPicker: (res.data.player.cardCount > 6 && this.state.room.activeGame.suit >= 0)
        });
      }).catch((err) => {
        console.log(err); 
      });
    });

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
            this.setState({ 
              player: res.data.player,
              showCardPicker: (res.data.player.cardCount > 6 && this.state.room.activeGame.suit >= 0)
            });
          }).catch((err) => {
            console.log(err); 
          });
        }
        socket.emit('join-room', res.data.room.short_id);
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

  getBiddingTag() {
    let suitTag = "???"; 
    let suitImg = "red_back.png";
    let biddingTag = (<p>Noone has set the bid yet</p>);
    if (this.state.room.activeGame.bid > 0) {
      if (this.state.room.activeGame.suit >= 0) {
        switch (this.state.room.activeGame.suit) {
          case 0: {
            suitTag = "Clubs";
            suitImg = require("../assets/img/cards/honor_clubs.png");
            break;
          }
          case 1: {
            suitTag = "Diamonds";
            suitImg = require("../assets/img/cards/honor_diamond.png");
            break;
          }
          case 2: {
            suitTag = "Hearts";
            suitImg = require("../assets/img/cards/honor_heart.png");
            break;
          }
          case 3: {
            suitTag = "Spades";
            suitImg = require("../assets/img/cards/honor_spade.png");
            break;
          }
          default: {
            console.log("Error: Could not set a suit: " + this.state.room.activeGame.suit); 
            break; 
          }
        }
        biddingTag = (
          <div>
            <p className="slim-p">{this.state.room.activeGame.biddingPlayer.displayName} set bid at {this.state.room.activeGame.bid} in {suitTag}</p>
            {/* <img className="honor-card-icon" src={suitImg} alt={suitTag} /> */}
          </div>
        );
      }
      else {
        biddingTag = (<p>{this.state.room.activeGame.biddingPlayer.displayName} holds the bid at {this.state.room.activeGame.bid}</p>);
      }
    }
    return biddingTag; 
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

    return(
      <div className="container-fluid">
        {
          this.state.showCardPicker && 
          <CardPicker activePlayer={this.state.room.activeGame.activePlayer} suit={this.state.room.activeGame.suit} suitName={this.state.room.activeGame.suitName} hand={this.state.player.hand}></CardPicker>
        }
        <div className="row player-zone-col">
          <div className="col s4">
            <div className="row">
              <PlayerZone player={players[0]} team={this.getAssignedTeam(players[0])} activePlayer={this.state.room.activeGame.activePlayer}></PlayerZone>
              <PlayerZone player={players[1]} team={this.getAssignedTeam(players[1])} activePlayer={this.state.room.activeGame.activePlayer}></PlayerZone>
              <PlayerZone player={players[2]} team={this.getAssignedTeam(players[2])} activePlayer={this.state.room.activeGame.activePlayer}></PlayerZone>
            </div>
          </div>
          {/* TODO Will need to be careful managing screen heights here... */}
          <div className="col s8">
            <div className="row">
              <TeamScore team={this.state.room.team1} teamNum={1}></TeamScore>
              <TeamScore team={this.state.room.team2} teamNum={2}></TeamScore>
            </div>
            <div className="row no-margin-bottom">
              <div className="col s12 center-align">
                {this.getBiddingTag()}
              </div>
            </div>
            <div className="row no-margin-bottom">
              <div className="col s12 m10 offset-m1 center-align">
                <p>{this.state.room.roomStatus}</p>
              </div>
            </div>
            <div className="row">
              <PlayedCard player={this.state.room.team1.player1} team={1}></PlayedCard>
              <PlayedCard player={this.state.room.team1.player2} team={1}></PlayedCard>
              <PlayedCard player={this.state.room.team2.player1} team={2}></PlayedCard>
              <PlayedCard player={this.state.room.team2.player2} team={2}></PlayedCard>
            </div>
            <div className="row">
              <div className="col s10 push-s1 m6 push-m3 center-align">
                <ButtonRow player={this.state.player} activeGame={this.state.room.activeGame} dealer={this.state.room.dealer} bid={this.state.room.activeGame.bid} suit={this.state.room.activeGame.suit}></ButtonRow>
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