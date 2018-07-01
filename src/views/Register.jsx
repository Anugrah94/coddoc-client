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
      password: '',
      errMsg: ''
    };
    this.setError = this.setError.bind(this);
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

  setError = () => {
    this.setState({
      errMsg: 'salah nih'
    })
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <div className="loginForm">
          <div className="imgHor">
            <img src="http://marcusandmartinus.com/wp-content/uploads/2014/03/58e91965eb97430e819064f5.png" className="imageFb"/>
            <img src="http://www.rushlasik.com/wp-content/uploads/2018/04/google-1015752_960_720.png" className="imageGg"/>
          </div>
          <div className="line">&nbsp;</div>
          <Mutation mutation={ADD_NEW_USER}>
              {(register, { loading, error, data }) => (
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
                    data && (
                      localStorage.setItem('token', data.register.token),
                      userStore.logIn(),
                      this.props.history.push('/main')
                    )  
                  }
                  {error && (
                    <div>{ JSON.stringify(error.message) }</div>
                  )}
                </div>
              )}
          </Mutation>
          <div>
            <p className="signUpParrent">
              or <Link to={'/login'} className="signUpChild">login</Link>
            </p>
            {/* <small>By continuing, you agree to Coddoc.net's Terms of Service and Privacy Policy, and to receiving emails with updates.</small> */}
          </div>
        </div>
      </div>
    );
  };
};
