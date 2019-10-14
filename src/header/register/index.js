import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warningBox: "",
            username: "",
            email: "",
            password1: "",
            password2: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassword1Change = this.handlePassword1Change.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }
    validateEmail(e) {
        const email = e.target.value;
        if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            this.setState({bademail: false});
            e.target.style.border = "none";
        } else {
            this.setState({bademail: true});
            e.target.style.border = "2px solid #ee5b5b";
        }
    }
    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }
    handleEmailChange(e){
        this.validateEmail(e);
        this.setState({email: e.target.value});
    }
    handlePassword1Change(e){
        this.setState({password1: e.target.value});
    }
    handlePassword2Change(e){
        this.setState({password2: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({warningBox: ""});
        if(this.state.bademail) {
            this.setState({warningBox: <div className="warningBox">Please enter a valid email address.</div>});
            return false;
        }
        if(this.state.username && this.state.password1 && this.state.password2 && this.state.email) {
            if(this.state.password1 !== this.state.password2) {
                this.setState({
                    warningBox: <div className='warningBox'>Your Passwords do not match.</div>
                })
            } else {
                let options = {
                    method: "POST",
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password1,
                        password2: this.state.password2,
                        email: this.state.email
                    })
                }
                return fetch(this.props.config.serverpath + 'user/register/index.php', options)
                    .then(res => res.json())
                    .then(json => {
                        if(json.result) {
                            let d = new Date();
                            d.setTime(d.getTime() + (100*24*60*60*1000));
                            document.cookie = (`token=${json.jwt};expires=${d.toUTCString()};path=/`);
                            //TO-DO:
                            //trigger user's homepage load here
                        } else {
                            this.setState({warningBox: <div className='warningBox'>{json.message}</div>})
                        }
                    })
                    .catch(error => console.error(error));
            }
        } else {
            this.setState({
                warningBox: <div className='warningBox'>Please fill out all of the fields in the form.</div>
            });
        }
    }
    render() {
        return (
            <div className="loginArea">
                {this.state.warningBox}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:
                        <input type="text" name="username" onChange={this.handleUsernameChange} />
                    </label>
                    <label htmlFor="email">Email:
                        <input type="text" id="email" name="email" onChange={this.handleEmailChange} />
                    </label>
                    <label htmlFor="password1">Password:
                        <input type="password" name="password1" onChange={this.handlePassword1Change} />
                    </label>
                    <label htmlFor="password2">Re-Type Password:
                        <input type="password" name="password2" onChange={this.handlePassword2Change} />
                    </label>
                    <input type="submit" value="Register" />
                </form>
                <p onClick={this.props.handleChangeLRTab} className='LRTabLink'>Already have an account?</p>
            </div>
            
        );
    }
}

export default Register;
