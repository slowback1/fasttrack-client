import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            warningBox: "",
            username: "",
            password: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({warningBox: ""});
        if(this.state.username && this.state.password) {
            let options = {
                method: "POST",
                body: JSON.stringify({username: this.state.username, password: this.state.password})
            }
            return fetch(this.props.config.serverpath + 'user/login/index.php', options)
                .then(res => res.json())
                .then(json => {
                    if(json.result) {
                        let d = new Date();
                        d.setTime(d.getTime() + (100*24*60*60*1000));
                        document.cookie = (`token=${json.jwt};expires=${d.toUTCString()};path=/`);
                        //TO-DO:
                        //trigger user's homepage load here
                    } else {
                        this.setState({
                            warningBox: <div class='warningBox'>Incorrect username or password</div>
                        });
                    }
                })
                .catch(error => console.error(error));
        } else {
            this.setState({
                warningBox: <div class='warningBox'>Please enter a username and password</div>
            });
            return;
        }
    }
    
    
    render() {
        return (
            <div className="loginArea">
                {this.state.warningBox}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:
                        <input type="text" name="username" onChange={this.handleUsernameChange}/>
                    </label>
                    <label htmlFor="password">Password: 
                        <input type="password" name="password" onChange={this.handlePasswordChange} />
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <p onClick={this.props.handleChangeLRTab.bind(this)} className='LRTabLink'>New?  Register here.</p>

            </div>
        );
    }
}


export default Login;