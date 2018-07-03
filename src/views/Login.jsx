import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { observer } from 'mobx-react';
import { withAlert } from "react-alert";

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
      this.props.history.push('/main/profile')
    } else {
      userStore.wantLogin()
      userStore.clearErrorLogin()
    }
    console.log(this.props);
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
      <Fragment>
        <NavBar props={ this.props }/>
        <button
          onClick={() => {
            this.props.alert.error("You just broke something!");
          }}
        >
          Oops, an error
        </button>
        <div className="loginForm">
          <div>
            <p>
              {userStore.errorLogin}
            </p>
          </div>
          <div className="imgHor">
            <img src="http://marcusandmartinus.com/wp-content/uploads/2014/03/58e91965eb97430e819064f5.png" className="imageFb" alt="fbLogo"/>
            <img src="http://www.rushlasik.com/wp-content/uploads/2018/04/google-1015752_960_720.png" className="imageGg" alt="ggLogo"/>
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
                      this.props.alert.error("wrong username or password")
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
    );
  };
};


export default withAlert(Login);