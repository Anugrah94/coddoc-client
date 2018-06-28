import React, { Component } from 'react';

import userStore from '../store/user'
import NavBar from '../components/NavBar';

export default class Home extends Component {
  componentDidMount() {
    if(userStore.loginStatus === true) {
      this.props.history.push('/main');
    } else {
      userStore.resetAll()
    }
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
      </div>
    );
  };
};