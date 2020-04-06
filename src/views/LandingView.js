/*
    View - LandingView
    
    View for when user first opens website - landing page
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingView extends Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col s6 offset-s3 center-align white-text">
                        <h1>Pitch</h1>
                        <p>
                            Welcome to the online pitch game. For basic rules talk to Seth John or visit
                            the <Link to="/help">Help</Link> page
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingView;