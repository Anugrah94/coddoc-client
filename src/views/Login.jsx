import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { observer } from 'mobx-react';
import { withAlert } from "react-alert";

import { LOGIN_USER } from '../graphql/mutationType';

import NavBar from '../components/NavBar';
import userStore from '../store/user';


@observer class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  };

  componentDidMount() {
    let token = localStorage.getItem('token')
    if(token) {
      userStore.logIn()
      this.props.history.push('/main/profile')
    } else {
      userStore.wantLogin()
      userStore.clearErrorLogin()
    }
  };

  getData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e, login) => {
    userStore.clearErrorLogin()
    e.preventDefault();
    login({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    });
  };

  render() {
    return (
      <div>
        <Fragment>
          <NavBar props={ this.props }/>
          <div className="loginForm">
            <div>
              <p className="errorLogin">
                &nbsp;{userStore.errorLogin}&nbsp;
              </p>
            </div>
            <div className="imgHor">
              Log In
            </div>
            <div className="line">&nbsp;</div>
            <Mutation mutation={LOGIN_USER}>
              { (login, { data }) => (
                <div>
                  <form onSubmit={e => this.handleSubmit(e, login)}
                    className="insideLoginForm">
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
                      Log In
                    </button>
                  </form>
                  {
                    data && (
                      data.login !== null ? (
                        localStorage.setItem('token', data.login.token),
                        userStore.logIn(),
                        this.props.history.push('/main/profile')
                      ) : (
                        userStore.setErrorLogin()
                      )
                    )
                  }
                </div>
              )}
            </Mutation>
            <div>
              <p className="signUpParrent">
                or <Link to={'/register'} className="signUpChild">register</Link>
              </p>
            </div>
          </div>
        </Fragment>
      </div>
    );
  };
};


export default withAlert(Login);