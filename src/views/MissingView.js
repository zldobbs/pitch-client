/*
    View - MissingView
    
    404 error handler
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MissingView extends Component {
    render() {
        return(
            <div>
                <h1>404 Error</h1>
            </div>
        );
    }
}

export default MissingView;