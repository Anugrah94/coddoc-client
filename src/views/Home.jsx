import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userStore from '../store/user';
import NavBar from '../components/NavBar';

export default class Home extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token')
    if(token) {
      userStore.logIn()
      this.props.history.push('/main')
    } else {
      userStore.wantLogin()
      userStore.resetAll()
    }
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <div>
          <Link to={'/main'}>
            <button className="buttonPress">
              <p className="signUpParrent">
                Get started as guest
              </p>
            </button>
          </Link>
        </div>
      </div>
    );
  };
};