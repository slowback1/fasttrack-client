import React, { Component } from 'react';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markup: ""
        };
        this.LoggedInMU = <div>
        <i class="fa fa-home" onClick={this.goHome}></i>
    </div>;
    }
    
    
    componentDidMount() {
        if(this.props.isLoggedIn) {
            this.setState({markup: this.LoggedInMU});
        }
    }
    render() {
        return (
            <div className="leftNav">
                <i className='fa fa-home' onClick={this.goHome}></i>
                <p onClick={this.goAbout}>About</p>
                {this.state.markup}
            </div>
        )
    }
}

export default Navigation;