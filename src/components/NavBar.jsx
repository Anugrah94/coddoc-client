import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'

import './NavBar.css';
import userStore from '../store/user'

@observer class NavBar extends Component {
  logOut = () => {
    userStore.logOut();
    this.props.props.history.push('/');
  }

  logIn = () => {
    this.props.props.history.push('/login');
  }

  backToHome = () => {
    let token = localStorage.getItem('token')
    if(token) {
      userStore.logIn();
      this.props.props.history.push('/');
    } else {
      this.props.props.history.push('/');
    }
  }

  render() {
    if(userStore.statusProfilePage === true) {
      return (
        <div className="navbar">
          <div className="leftContent"  onClick={() => this.backToHome()}>
            <img src="https://i.imgur.com/f0Y5Ssm.png" alt="logoNavbar" className="navbarLogo"/>
          </div>
          <div className="rightContent" onClick={() => this.logOut()}>
            <p className="item">
              <i className="fas fa-sign-out-alt"></i>
              &nbsp;&nbsp;Logout
            </p>
          </div>
        </div>
      );
    } else if(userStore.statusLoginPage === true) {
      return (
        <div className="navbar">
          <div className="leftContent" onClick={() => this.backToHome()}>
            <img src="https://i.imgur.com/f0Y5Ssm.png" alt="logoNavbar" className="navbarLogo"/>
          </div>
        </div>
      );
    } else if(userStore.loginStatus === false) {
      return (
        <div className="navbar">
          <div className="leftContent" onClick={() => this.backToHome()}>
            <img src="https://i.imgur.com/f0Y5Ssm.png" alt="logoNavbar" className="navbarLogo"/>
          </div>
          <div className="rightContent" onClick={() => this.logIn()}>
            <p>
              <i className="fas fa-sign-in-alt"></i>
              &nbsp;&nbsp;Login
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          <div className="leftContent" onClick={() => this.backToHome()}>
            <img src="https://i.imgur.com/f0Y5Ssm.png" alt="logoNavbar" className="navbarLogo"/>
          </div>
          <div className="rightContentDropDown">
            <p><i className="fas fa-user-circle"></i>&nbsp;&nbsp;My Account</p>
            <div className="dropdownContent">
              <Link className="link" to={ '/main/profile' }>
                <p className="item">
                  <i className="fas fa-user-circle"></i>
                  &nbsp;&nbsp;Profile
                </p>
              </Link>
              <p className="item"
                onClick={() => this.logOut()}>
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;&nbsp;Logout
              </p>
            </div>
          </div>
        </div>
      )
    }
  };
};

export default NavBar;