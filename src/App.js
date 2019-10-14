import React, {Component} from 'react';
import Header from './header/Header.js';
import Config from './config.json';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isLoggedIn: false,
      page: 0
    }
    this.config = Config;
    
    this.goHome = this.goHome.bind(this);
    this.goAbout = this.goAbout.bind(this);
  }
  static Pages = {
    0: "home",
    1: "about",
    2: "friends",
    //TO-DO: add more pages to this enum list
  };
  componentDidMount() {
    this.checkLogin();
  }
  checkLogin() {
    let token = this.getCookie('token');
    if(token) {
      let options = {
        method: "GET",
        mode: "cors",
        cache: "default",
        credentials: "same-origin",
        headers: {
          "token": token
        },
        redirect: "follow",
        referrer: "no-referrer"
      }
      this.buildFetch("user/get/self/index.php", options)
        .then(json => {
            if(json.result) {
                let fl = json.friends_list.split(',');
                let cl = json.confirm_list.split(',')     
                this.setState({
                    username: json.username,
                    color_mode: json.color_mode,
                    goal_duration: json.goal_duration,
                    goal_type: json.goal_type,
                    friends_list: fl,
                    confirm_list: cl,
                    isLoggedIn: true
                });
            } else {
                //clear bad cookies
                document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            }
        });
    }
    this.setState({token: token});
  }
  buildFetch(path, options) {
    return fetch(this.config.serverpath + path, options)
          .then(res => res.json());
  }
  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      var c = ca[i];
      while(c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if(c.indexOf(name) === 0 ) { 
        return c.substring(name.length, c.length);
      }
    }
  }
  goHome(e) {
    e.preventDefault();
    this.setState({page: 0})
  }
  goAbout(e) {
      e.preventDefault();
      this.setState({page: 1})
  }
  render() {
    return (
      <Header isLoggedIn={this.state.isLoggedIn} token={this.state.token} config={this.config} page={this.state.page} goHome={this.goHome} goAbout={this.goAbout}></Header>
    )
  }
}

export default App;
