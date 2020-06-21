/* 
    components/EditName

    Dialog to edit the name of a player
*/

import React, { Component } from 'react';
import axios from 'axios';
import { endpoint, loadPlayerId } from '../App';
import M from 'materialize-css'; 

class EditName extends Component {
  // TODO limit number of characters 
  constructor(props) {
    super(props);

    this.state = {
      nameVal: '', 
    }

    this.sendNameUpdate = this.sendNameUpdate.bind(this); 
    this.handleNameChange = this.handleNameChange.bind(this); 
  }

  sendNameUpdate(e) {
    e.preventDefault(); 
    if (this.state.nameVal.length > 0 && loadPlayerId() !== undefined && this.state.nameVal.length < 14) {
      let changeNameRequest = {
        name: this.state.nameVal,
        room: this.props.roomId,
        player: loadPlayerId()
      };
      axios.post(`${endpoint}/api/player/changeName`, changeNameRequest)
      .then((res) => {
        console.log(res); 
      })
      .catch((err) => {
        console.log(err); 
      });
    }
    else {
      return M.toast({ html: 'Error: Name must be between 0-14 characters', classes: 'red' });
    }

    this.setState({ nameVal: '' });
    this.props.closeHandler();
  }

  handleNameChange(e) {
    this.setState({ nameVal: e.target.value }); 
  }

  render() {
    return(
      <div>
        <div className="dialog-backdrop" onClick={this.props.closeHandler}></div>
        <div className="fixed-action-btn" onClick={this.props.closeHandler}>
          <div className="btn-floating btn-large red">
            <i className="tiny material-icons black-text">clear</i>
          </div>
        </div>
        <div className="container dialog z-depth-3">
          <div className="row">
            <div className="col s12 center">
              <h4>Edit Display Name</h4>
              <p>Your new name must be between 0-14 characters long.</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 center">
              <form onSubmit={this.sendNameUpdate}>
                <div className="col s12 m8 offset-m2 input-field">
                  <input id="name" type="text" value={this.state.nameVal} onChange={this.handleNameChange} />
                  <label htmlFor="name">New Name</label>
                </div>
                <div className="col s6 m1">
                  <button type="submit" className="btn waves-effect">
                    <i className="material-icons">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditName; 