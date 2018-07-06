import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userStore from '../store/user';
import NavBar from '../components/NavBar';

export default class Home extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token')
    if(token) {
      userStore.logIn()
      this.props.history.push('/main/profile')
    } else {
      userStore.wantLogin()
      userStore.resetAll()
    }
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <div className="homeContainer">
          <img className="homeImage" src="https://i.imgur.com/vNvHDdE.png" alt=""/>
          <img className="homePicture" src="https://i.imgur.com/QNT0C22.png" alt=""/>
          <Link className="link" to={'/main'}>
            <div className="startedGuest">
              Get started as guest
            </div>
          </Link>
          <div className="startedUser">
              <div className="itemStarted" onClick={() => this.props.history.push('/login')}>
                Login
              </div>
              <div className="itemStarted" onClick={() => this.props.history.push('/register')}>
                Register
              </div>
            </div>
        </div>
      </div>
    );
  };
};