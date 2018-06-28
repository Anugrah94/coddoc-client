import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';
import userStore from '../store/user';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
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
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.getData}
            placeholder="email"/>
          <input
            className="inputItem"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.getData}
            placeholder="password"/>
          <div className="buttonPress">
            <p>Register</p>
          </div>
          <div>
            <p className="signUpParrent">
              or <Link to={'/login'} className="signUpChild">login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
};
