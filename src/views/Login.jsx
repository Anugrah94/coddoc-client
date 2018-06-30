import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { observer } from 'mobx-react';

import NavBar from '../components/NavBar';
import userStore from '../store/user';
import { LOGIN_USER } from '../graphql/mutationType';

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
      this.props.history.push('/main')
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
        <NavBar props={ this.props }/>
        <div className="loginForm">
          <div>
            <p>
              {userStore.errorLogin}
            </p>
          </div>
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
                    <p>Log In</p>
                  </button>
                </form>
                {
                  data !== undefined && (
                    data.login !== null ? (
                      localStorage.setItem('token', data.login.token),
                      userStore.logIn(),
                      this.props.history.push('/main')
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
      </div>
    );
  };
};


export default Login