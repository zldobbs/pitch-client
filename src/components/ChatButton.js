/* 
    components/ChatButton

    Floating button that can be used to open chat interface 
    TODO Implement notifications when users have unread messages 
*/

import React, { Component } from 'react';
import ChatBox from './ChatBox';

class ChatButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChatBox: false
    };
    
    this.toggleChatBox = this.toggleChatBox.bind(this); 
  }

  toggleChatBox() {
    let { showChatBox } = this.state; 
    this.setState({ showChatBox: !showChatBox });
  }

  render() {
    return(
      <div>
        {
          this.state.showChatBox &&
          <ChatBox closeHandler={this.toggleChatBox} roomId={this.props.roomId} messages={this.props.messages}></ChatBox>
        }
        <div className="fixed-action-btn" onClick={() => this.toggleChatBox()}>
          {
            this.state.showChatBox ? 
              <div className="btn-floating btn-large red">
                <i className="tiny material-icons black-text">clear</i>
              </div>
            : 
              <div className="btn-floating btn-large yellow">
                <i className="tiny material-icons black-text">chat_bubble</i>
              </div>
          }
        </div>
      </div>

    )
  }
}

export default ChatButton; 