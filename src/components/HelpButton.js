/* 
    components/HelpButton

    Floating button that can be used to view the help page
*/

import React, { Component } from 'react';
import HelpBox from './HelpBox';

class HelpButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHelpBox: false
    };
    
    this.toggleHelpBox = this.toggleHelpBox.bind(this);
    this._isMounted = true;  
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  toggleHelpBox() {
    let { showHelpBox } = this.state; 
    this._isMounted && this.setState({ showHelpBox: !showHelpBox });
    this._isMounted && this.props.toggleButtonOpen((this.state.showHelpBox ? 0 : 2));
  }

  render() {
    return(
      <div>
        {
          this.state.showHelpBox && this._isMounted && 
          <HelpBox closeHandler={this.toggleHelpBox}></HelpBox>
        }
        <div className="fixed-action-btn-left" onClick={() => this.toggleHelpBox()}>
          {
            this.state.showHelpBox ? 
              <div className="btn-floating btn-large red">
                <i className="tiny material-icons black-text">clear</i>
              </div>
            : 
              <div className="btn-floating btn-large yellow">
                <i className="tiny material-icons black-text">help_outline</i>
              </div>
          }
        </div>
      </div>

    )
  }
}

export default HelpButton; 