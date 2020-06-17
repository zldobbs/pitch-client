/* 
  components/TeamList

  Lists the given team 
*/

import React, { Component } from 'react';

// Design imports
import '../App.css';

import { endpoint, loadUser, loadPlayerId, savePlayerId, deletePlayerId } from '../App';
import axios from 'axios'; 

class TeamList extends Component {
  constructor(props) {
    super(props); 

    this.onClickJoinTeam = this.onClickJoinTeam.bind(this);
    this.onClickLeaveTeam = this.onClickLeaveTeam.bind(this);
    this.getPlayer = this.getPlayer.bind(this); 
  }

  async onClickJoinTeam() {
    // Send player ID to the backend, if one exists. 
    // This will remove a player from an existing team if needed 
    let joinTeamRequest = {
      'teamId': this.props.team._id, 
      'user': loadUser(),
      'playerId': loadPlayerId()
    };

    axios.post(`${endpoint}/api/team/join`, joinTeamRequest)
    .then((res) => {
      if (res.data.status === "success") {
        savePlayerId(res.data.player._id);
      }
      else {
        console.log(res.data.details); 
      }
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  onClickLeaveTeam() {
    let leaveTeamRequest = { 'playerId': loadPlayerId() };
    axios.post(`${endpoint}/api/team/leave`, leaveTeamRequest)
    .then((res) => {
      if (res.data.status === "success") {
        deletePlayerId();
      }
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  getPlayer(num) {
    switch(num) {
      case 1: {
        if (this.props.team.player1 === null) {
          return(<li className="collection-item">...</li>);
        }
        else {
          const starIcon = (this.props.team.player1._id === this.props.player._id ? (<i className="tiny material-icons">star</i>) : '');
          const readyIcon = (this.props.team.player1.isReady ? (<i className="tiny material-icons green-text">check</i>) : '');
          return(<li className="collection-item">{starIcon} {this.props.team.player1.displayName} {readyIcon}</li>);
        }
      }
      case 2: {
        if (this.props.team.player2 === null) {
          return(<li className="collection-item">...</li>);
        }
        else {
          const starIcon = (this.props.team.player2._id === this.props.player._id ? (<i className="tiny material-icons">star</i>) : '');
          const readyIcon = (this.props.team.player2.isReady ? (<i className="tiny material-icons green-text">check</i>) : '');
          return(<li className="collection-item">{starIcon} {this.props.team.player2.displayName} {readyIcon}</li>);
        }
      }
      default: 
        return(<li className="collection-item">...</li>);
    }
  }

  render() {
    if (this.props.player === undefined || this.props.team === undefined) {
      return(
        <div className="col s12 m6">
          <p>Loading team info...</p>
        </div>
      );
    } 

    let teamButton;
    if (this.props.player !== {} &&
      ((this.props.team.player1 !== null && this.props.team.player1._id === this.props.player._id) || 
       (this.props.team.player2 !== null && this.props.team.player2._id === this.props.player._id))) {
      teamButton = (<button onClick={this.onClickLeaveTeam} className="btn waves-effect red">Leave {this.props.team.name}</button>);
    }
    else {
      if (this.props.team.player1 !== null && this.props.team.player2 !== null) {
        teamButton = (<p>Team is full</p>);
      }
      else {
        teamButton = (<button onClick={this.onClickJoinTeam} className="btn waves-effect">Join {this.props.team.name}</button>);
      }
    }

    return(
      <div className="col s12 m6">
        <p>{ this.props.team.name }</p>
        <ul className="collection team-collection">
          {this.getPlayer(1)}
          {this.getPlayer(2)}
        </ul>
        {teamButton}
      </div>
    );
  }
}

export default TeamList;