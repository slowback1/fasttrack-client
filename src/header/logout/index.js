import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }
    logout(e) {
        e.preventDefault();

    }
    render() {
        return(
            <button onClick={this.logout}>Logout</button>
        )
    }
}

export default Logout;