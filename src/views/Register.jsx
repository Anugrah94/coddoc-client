import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import axios from 'axios';
import { observer } from 'mobx-react';
import { withAlert } from 'react-alert';

import { ADD_NEW_USER } from '../graphql/mutationType';

import NavBar from '../components/NavBar';
import userStore from '../store/user';

@observer class Register extends Component {
  constructor() {
    super();
    this.state = {
      full_name: '',
      username: '',
      email: '',
      password: '',
      errMsg: '',
      allUser: []
    };
    this.setError = this.setError.bind(this);
  };

  componentDidMount() {
    let token = localStorage.getItem('token')
    if(token) {
      userStore.logIn()
      this.props.history.push('/main/profile')
    } else {
      axios.get('https://api.coddoc.net/user')
        .then(response => {
          this.setState({
            allUser: response.data.result
          });
          console.log(this.state.allUser);
        })
        .catch(err => {
          console.log('gagal');
        })
      userStore.wantLogin();
      userStore.clearErrorRegister();
    }
  };

  getData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e, register) => {
    e.preventDefault()

    let usernameUnique = false;
    let emailUnique = false;
    let emailValid = false;
    let passwordValid = false;

    this.state.allUser.map(user => {
      if(this.state.username === user.username) {
        usernameUnique = true;
      } else if(this.state.email === user.email) {
        emailUnique = true;
      }
    })

    let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(checkEmail.test(this.state.email) === true) {
      emailValid = true;
    };

    let checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if(checkPassword.test(this.state.password) === true) {
      passwordValid = true;
    }

    if(this.state.full_name === '' || this.state.username === '' || this.state.email === '' || this.state.password === '') {
      this.props.alert.error('all fields are required');
    } else if(usernameUnique === true) {
      this.props.alert.error('username has taken');
    } else if(emailUnique === true) {
      this.props.alert.error('email has taken');
    } else if(emailValid === false) {
      this.props.alert.error('please input valid email');
    } else if(passwordValid === false) {
      this.props.alert.error('wrong password format');
    } else {
      register({
        variables: {
          full_name: this.state.full_name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      })
    }
  }

  setError = () => {
    this.setState({
      errMsg: 'salah nih'
    })
  }

  render() {
    return (
      <div>
        <Fragment>
          <NavBar props={this.props}/>
          <div className="loginForm">
            <div className="imgHor">
              Register
            </div>
            <div className="line">&nbsp;</div>
            <Mutation mutation={ADD_NEW_USER}>
                {(register, { loading, error, data }) => (
                  <div>
                    <form onSubmit={e => this.handleSubmit(e, register)}
                      className="insideLoginForm">
                      <div className="inputPart">
                        <input
                          className="inputItemRegister"
                          type="text"
                          name="full_name"
                          value={this.state.full_name}
                          onChange={this.getData}
                          placeholder="name"/>
                        <small className="desc">*required</small>
                      </div>
                      <div className="inputPart">
                        <input
                          className="inputItemRegister"
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={this.getData}
                          placeholder="username"/>
                        <small className="desc">*must be unique</small>
                      </div>
                      <div className="inputPart">
                        <input
                          className="inputItemRegister"
                          type="text"
                          name="email"
                          value={this.state.email}
                          onChange={this.getData}
                          placeholder="email"/>
                        <small className="desc">*input valid email</small>
                      </div>
                      <div className="inputPart">
                        <input
                          className="inputItemRegister"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.getData}
                          placeholder="password"/>
                        <small className="desc">*at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 number</small>
                      </div>
                      <button type="submit" className="buttonPress">
                        Register
                      </button>
                    </form>
                    {
                      data && (
                        localStorage.setItem('token', data.register.token),
                        userStore.logIn(),
                        this.props.history.push('/main/profile')
                      )  
                    }
                    {error && (
                      console.log('error')
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
        </Fragment>
      </div>
    );
  };
};

export default withAlert(Register);