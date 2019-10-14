import React, { Component } from 'react';

import Login from './login/index.js';
import Register from './register/index.js';
import Logout from './logout/index.js';
import Navigation from './navigation/index.js';

import './style/index.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LRTab: 0
        }
        this.handleChangeLRTab = this.handleChangeLRTab.bind(this);
    }
    handleChangeLRTab(e) {
        e.preventDefault();
        if(this.state.LRTab === 0) {
            this.setState({LRTab: 1});
        } else {
            this.setState({LRTab: 0});
        }
        this.changeLRTab();
    }
    changeLRTab() {
        if(this.state.LRTab === 1) {
            this.setState({loginArea: <Register config={this.props.config} token={this.props.token} handleChangeLRTab={this.handleChangeLRTab}></Register>});
        } else {
            this.setState({loginArea: <Login token={this.props.token} config={this.props.config} handleChangeLRTab={this.handleChangeLRTab}></Login>});
        }
    }
    componentDidMount() {
        if(this.props.isLoggedIn) {
            this.setState({loginArea: <Logout token={this.props.token}></Logout>})
        } else {
        this.changeLRTab();
    }
    }
    render() {
        return (
            <header>
                <Navigation isLoggedIn={this.props.isLoggedIn} page={this.props.page} goHome={this.props.goHome} goAbout={this.props.goAbout}></Navigation>
                {this.state.loginArea}
            </header>
        );
    }
}

export default Header;