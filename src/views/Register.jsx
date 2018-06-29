import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import NavBar from '../components/NavBar';
import userStore from '../store/user';
import { ADD_NEW_USER } from '../graphql/mutationType'

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      full_name: '',
      username: '',
      email: '',
      password: ''
    };
  };

  componentDidMount() {
    let token = localStorage.getItem('token')
    if(token) {
      userStore.logIn()
      this.props.history.push('/main')
    } else {
      userStore.wantLogin()
    }
  };

  getData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e, register) => {
    e.preventDefault()
    console.log(this.state)
    register({
      variables: {
        full_name: this.state.full_name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="loginForm">
          <Mutation mutation={ADD_NEW_USER}>
              {(register, { data }) => (
                <div>
                  <form onSubmit={e => this.handleSubmit(e, register)}
                    className="insideLoginForm">
                    <input
                      className="inputItem"
                      type="text"
                      name="full_name"
                      value={this.state.full_name}
                      onChange={this.getData}
                      placeholder="name"/>
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
                    <button type="submit" className="buttonPress">
                      <p>Register</p>
                    </button>
                  </form>
                  {
                    data !== undefined && (
                      userStore.addUser(data.register.user),
                      localStorage.setItem('token', data.register.token),
                      userStore.logIn(),
                      this.props.history.push('/main')
                    )  
                  }
                </div>
              )}
          </Mutation>
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
