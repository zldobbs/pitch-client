/* 
  components/TeamList

  Lists the given team 
*/

import React, { Component } from 'react';

// Design imports
import '../App.css';

import { Link } from 'react-router-dom';
import { endpoint, loadUser, joinTeam, leaveTeam, loadTeam } from '../App';
import axios from 'axios'; 

class TeamList extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      userTeamId: '',
      userPlayer: ''
    }

    this.onClickJoinTeam = this.onClickJoinTeam.bind(this);
    this.onClickLeaveTeam = this.onClickLeaveTeam.bind(this);
    this.getPlayer = this.getPlayer.bind(this); 
  }

  componentDidMount() {
    let teamInfo = loadTeam();
    if (teamInfo != undefined) {
      this.setState({
        userTeamId: teamInfo[0], 
        userPlayer: teamInfo[1]
      });
    }
  }

  async onClickJoinTeam() {
    let joinTeamRequest = {
      'teamId': this.props.team._id, 
      'user': loadUser()
    };

    // If user is already on a team leave that team first 
    let teamInfo = loadTeam();
    if (teamInfo != undefined) {
      let leaveTeamRequest = {
        'teamId': teamInfo[0], 
        'playerNum': teamInfo[1],
        'user': loadUser()
      };
      await axios.post(`${endpoint}/api/team/leave`, leaveTeamRequest);
    }

    axios.post(`${endpoint}/api/team/join`, joinTeamRequest)
    .then((res) => {
      if (res.data.status == "success") {
        // Save the teamId and player number as a cookie (one object)
        // This will be useful identifier since the socket id changes on reloads 
        // NOTE: will need to remove whenever the user leaves the team/room (or switches teams!!!)
        let teamInfo = `${this.props.team._id},${res.data.playerTaken}`;
        joinTeam(teamInfo);
      }
      else {
        // TODO handle error
        console.log(res.data); 
      }
    })
    .catch((err) => {
      // TODO handle error
      console.log(err); 
    });
  }

  onClickLeaveTeam() {
    let leaveTeamRequest = {
      'teamId': this.props.team._id, 
      'playerNum': this.state.userPlayer,
      'user': loadUser()
    };
    axios.post(`${endpoint}/api/team/leave`, leaveTeamRequest)
    .then((res) => {
      if (res.data.status == "success") {
        leaveTeam();
      }
      else {
        // TODO handle error
        console.log(res.data); 
      }
    })
    .catch((err) => {
      // TODO handle error
      console.log(err); 
    });
  }

  getReadyIcon(num) {
    switch(num) {
      case 1: {
        if (this.props.team.player1Ready == true) {
          return(<i className="tiny material-icons green-text">check</i>);
        }
      }
      case 2: {
        if (this.props.team.player2Ready == true) {
          return(<i className="tiny material-icons green-text">check</i>);
        }
      }
      default:
        return(<span></span>);
    }

    return(<span></span>);
  }

  getPlayer(num) {
    switch(num) {
      case 1: {
        if (this.state.userTeamId == this.props.team._id && this.state.userPlayer == 'player1') {
          return(<li className="collection-item"><i className="tiny material-icons">star</i> {this.props.team.player1DisplayName ? this.props.team.player1DisplayName : '...'}{this.getReadyIcon(1)}</li>);
        }
        else {
          return(<li className="collection-item">{this.props.team.player1DisplayName ? this.props.team.player1DisplayName : '...'}{this.getReadyIcon(1)}</li>);
        }
      }
      case 2: {
        if (this.state.userTeamId == this.props.team._id && this.state.userPlayer == 'player2') {
          return(<li className="collection-item"><i className="tiny material-icons">star</i> {this.props.team.player2DisplayName ? this.props.team.player2DisplayName : '...'}{this.getReadyIcon(2)}</li>);
        }
        else {
          return(<li className="collection-item">{this.props.team.player2DisplayName ? this.props.team.player2DisplayName : '...'}{this.getReadyIcon(2)}</li>);
        }

      }
      default: 
        return(<li className="collection-item">...</li>);
    }
  }

  render() {
    let teamButton;
    if (this.state.userTeamId == this.props.team._id) {
      teamButton = (<button onClick={this.onClickLeaveTeam} className="btn waves-effect red">Leave {this.props.team.name}</button>);
    }
    else {
      if (this.props.team.player1 != null && this.props.team.player2 != null) {
        teamButton = (<p>Team is full</p>);
      }
      else {
        teamButton = (<button onClick={this.onClickJoinTeam} className="btn waves-effect">Join {this.props.team.name}</button>);
      }
    }

    return(
      <div className="col s12 m6">
        <p>{ this.props.team.name }</p>
        <ul className="collection">
          {this.getPlayer(1)}
          {this.getPlayer(2)}
        </ul>
        {teamButton}
      </div>
    );
  }
}

export default TeamList;