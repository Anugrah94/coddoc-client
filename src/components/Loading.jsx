import React, { Component } from 'react';

import './NavBar.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src="https://editionsdelarose.com/wp-content/themes/edr/img/loading.gif" alt="loadingImg"/>
      </div>
    );
  };
};
