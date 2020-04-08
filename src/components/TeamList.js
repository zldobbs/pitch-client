/* 
  components/TeamList

  Lists the given team 
*/

import React, { Component } from 'react';

// Design imports
import '../App.css';

import { Link } from 'react-router-dom';
import { loadUser, logoutUser } from '../App';

class TeamList extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      team: '',
    }
  }

  render() {
    return(
      <div className="col s12 m6">
        <p>Team Name</p>
        <ul class="collection">
          <li class="collection-item">Alvin</li>
          <li class="collection-item">Alvin</li>
          <li class="collection-item">Alvin</li>
          <li class="collection-item">Alvin</li>
        </ul>
      </div>
    );
  }
}

export default TeamList;