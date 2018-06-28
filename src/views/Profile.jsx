import React, { Component } from 'react';

import NavBar from '../components/NavBar';
import userStore from '../store/user';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      history: [1,2,3,4,5]
    };
  };

  componentDidMount() {
    userStore.seeProfile()
  };

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <div className="container">
          <div className="profile">
            <h1 className="name">{ userStore.user.fullname }</h1>
            <p className="username">{ `@${userStore.user.username}` }</p>
            <img src="http://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png" alt="personIcon"/>
          </div>
          <div className="history">
            <div className="histContent">
              { this.state.history.map(hist => {
                return (
                  <p><i className="fas fa-history"></i>&nbsp;&nbsp;{ hist }</p>
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    );
  };
};
