import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { READ_USER } from '../graphql/queryType';
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
    let token = localStorage.getItem('token');
    if(token) {
      userStore.logIn();
      userStore.seeProfile();
    } else {
      userStore.resetAll();
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <Query query={READ_USER} variables={{token: localStorage.getItem('token')}}>
          {({ loading, error, data }) => {
            if (loading) return 'loading dulu...';
            if (error) return `Error!: ${error}`;
            return (
              <div className="container">
                <div className="profile">
                  <h1 className="name">{ data.user.full_name }</h1>
                  <p className="username">{ `@${data.user.username}` }</p>
                  <img src="http://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png" alt="personIcon"/>
                </div>
                <div className="history">
                  <div className="histContent">
                    { data.user.histories.map(hist => {
                      return (
                        <div className="histories">
                          <div><i className="fas fa-history"></i>&nbsp;&nbsp;{ hist._id }</div>
                          <div><i className="fas fa-window-close"></i></div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  };
};
