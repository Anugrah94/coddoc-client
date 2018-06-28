import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';
import userStore from '../store/user';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  };

  componentDidMount() {
    userStore.wantLogin()
  };

  getData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="loginForm">
          <input
            className="inputItem"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.getData}
            placeholder="username"/>
          <input
            className="inputItem"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.getData}
            placeholder="password"/>
          <div className="buttonPress">
            <p>Log in</p>
          </div>
          <div>
            <p className="signUpParrent">
              or <Link to={'/register'} className="signUpChild">register</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
};
