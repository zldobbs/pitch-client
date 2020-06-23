/* 
    components/ChatButton

    Floating button that can be used to open chat interface 
    TODO There is an outstanding error with the chat button getting hit twice after transitioning from staging to game view
    -- Refreshing fixes this
    -- Hack in place with _isMounted 
    -- The API still gets hit twice... Not ideal.
*/

import React, { Component } from 'react';
import ChatBox from './ChatBox';
import M from 'materialize-css'; 
import { socket } from '../App';

class ChatButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChatBox: false
    };
    
    this.toggleChatBox = this.toggleChatBox.bind(this);
    this._isMounted = true;  
  }

  componentDidMount() {
    socket.on('new-message', (message) => {
      if (this._isMounted) {
        return M.toast({html: `<b>${message.player.displayName}:</b>   ${message.message}`, classes: 'yellow black-text'});
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  toggleChatBox() {
    let { showChatBox } = this.state; 
    this._isMounted && this.setState({ showChatBox: !showChatBox });
  }

  render() {
    return(
      <div>
        {
          this.state.showChatBox && this._isMounted &&
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