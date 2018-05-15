import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../services/Auth';
import authDb from '../auth-db.json';
const auth = new Auth();

export default class Login extends Component {
  state = {
    redirectToReferrer: auth.isAuthenticated,
    username: '',
    password: ''
  };

  login = () => {
    const { username, password } = this.state;
    const user = authDb.find(item => item.username === username);
    
    if (!user) {
      alert('user does not exists');
    } else if (user.password !== password) {
      alert('password not correct');
    } else {
      auth.signin(() => {
        this.setState({ redirectToReferrer: true }, () => {
          // alert(`welcome, ${username}`);
        });
      });
    }
  };

  changeUsername = ({ target }) => {
    this.setState({ username: target.value });
  };

  changePasswod = ({ target }) => {
    this.setState({ password: target.value });
  };

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="auth">
        <div>Authentication</div>
        <input type="text" placeholder="username" onChange={this.changeUsername}/>
        <input type="password" placeholder="password" onChange={this.changePasswod}/>
        <button onClick={this.login}>login</button>
      </div>
    );
  }
}