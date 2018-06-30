import React, { Component } from 'react';

import './Page.css';

import NavBar from '../components/NavBar';
import userStore from '../store/user';
import SignedIn from '../components/SignedIn';
import SignedOut from '../components/SignedOut';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      snippet: '',
      doc: '',
      toTranslate: ''
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    if(token) {
      userStore.logIn()
    } else {
      userStore.resetAll()
    }
  };

  getData = (e) => {
    this.setState({
      input: e
    })
  }

  convertData = () => {
    this.setState({
      snippet: 'loading...',
      doc: 'loading...'
    })
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        {
          userStore.loginStatus === true ?
          <SignedIn /> :
          <SignedOut />
        }
      </div>
    );
  };
};
