/* 
    components/ChatBox

    Chatting area to talk with players during the game 
*/

import React, { Component } from 'react';
import axios from 'axios';
import { endpoint, loadPlayerId } from '../App';

class ChatBox extends Component {
  // Expect to receive a list of the objects from server to display (based on room id)
  // displayname, message, timestamp 
  // Should just infinitly scroll 
  constructor(props) {
    super(props);

    this.state = {
      messageVal: '', 
    }

    this.sendMessage = this.sendMessage.bind(this); 
    this.handleMessageValChange = this.handleMessageValChange.bind(this); 
  }

  sendMessage(e) {
    e.preventDefault(); 
    if (this.state.messageVal.length > 0 && loadPlayerId() !== undefined) {
      let sendMessageRequest = {
        message: this.state.messageVal, 
        roomId: this.props.roomId,
        player: loadPlayerId()
      };
      axios.post(`${endpoint}/api/chat/`, sendMessageRequest)
      .then((res) => {
        console.log(res); 
      })
      .catch((err) => {
        console.log(err); 
      });
    }

    // Clear message body
    this.setState({ messageVal: '' });
  }

  handleMessageValChange(e) {
    this.setState({ messageVal: e.target.value }); 
  }

  render() {
    let messageItems = [];
    // TODO sort display of messages by timestamp 
    this.props.messages.forEach((message, i) => {
      messageItems.push(
        <li className="collection-item" key={i}>
          <b>{message.player.displayName}:</b> {message.message}
        </li>
      );
    });

    let messageInput;
    if (loadPlayerId() !== undefined) {
      messageInput = (
        <div className="row center">
          <form onSubmit={this.sendMessage}>
            <div className="col s9 m8 offset-m2 input-field inline">
              <input id="message" type="text" value={this.state.messageVal} onChange={this.handleMessageValChange} />
              <label htmlFor="message">Message</label>
            </div>
            <div className="col s2 m2">
              <button type="submit" className="btn waves-effect">
                <i className="material-icons">send</i>
              </button>
            </div>
          </form>
        </div>
      );
    }
    else {
      messageInput = (
        <div className="col s12 center">
          <p>You must be in the room to send a message</p>
        </div>
      );
    }

    return(
      <div>
        <div className="dialog-backdrop" onClick={this.props.closeHandler}></div>
        <div className="container dialog z-depth-3">
          <div className="row message-box">
            <ul className="collection message-collection">
              {messageItems}
            </ul>
          </div>
          {messageInput}
        </div>
      </div>
    )
  }
}

export default ChatBox; 