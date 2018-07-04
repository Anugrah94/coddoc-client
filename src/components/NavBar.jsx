import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import './NavBar.css';
import userStore from '../store/user'

class ModalClass extends Component {
  render() {
    return (
      <Modal 
        isOpen={this.state.showModal}
        contentLabel="Modal Doc"
        className="customModal"
        overlayClassName="customOverlay">
        <div
          onClick={this.handleCloseModal}
          className="closeButton">
          <i className="fas fa-times-circle"></i>
          &nbsp;&nbsp;Close
        </div>
        <div className="titleModal">Documentation to use this</div>
      </Modal>
    )
  }
}

@observer class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    }
  };
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

  handleOpenModal = () => {
    this.setState({
      showModal: true
    })
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
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
    } else if(userStore.loginStatus === false && userStore.statusMainPage === false) {
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
    } else if(userStore.loginStatus === false && userStore.statusMainPage === true) {
      return (
        <div className="navbar">
          <div className="leftContent" onClick={() => this.backToHome()}>
            <img src="https://i.imgur.com/f0Y5Ssm.png" alt="logoNavbar" className="navbarLogo"/>
          </div>
          <div className="rightContainer">
            <div className="rightContent" onClick={this.handleOpenModal}>
              <p>
                <i className="fas fa-paragraph"></i>
                &nbsp;&nbsp;Readme
              </p>
            </div>
            <Modal 
              isOpen={this.state.showModal}
              contentLabel="Modal Doc"
              className="readmeModal"
              overlayClassName="readmeOverlay">
              <div
                onClick={this.handleCloseModal}
                className="closeButton">
                <i className="fas fa-times-circle"></i>
                &nbsp;&nbsp;Close
              </div>
              <div className="titleModal">How to make coddoc convert properly :</div>
              <div className="createContainer">
                <div className="imageContain">
                  <div className="titleHint">Put a space after last curly bracket on for</div>
                  <img className="hintImage1" src="https://i.imgur.com/So6CesR.png" alt=""/>
                </div>
                <div className="imageContain">
                  <div className="titleHint">Put a tab after last method on class</div>
                  <img className="hintImage2" src="https://i.imgur.com/LkaYWxj.png" alt=""/>
                </div>                
              </div>
            </Modal>
            <div className="rightContent" onClick={() => this.logIn()}>
              <p>
                <i className="fas fa-sign-in-alt"></i>
                &nbsp;&nbsp;Login
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          <div className="leftContent" onClick={() => this.backToHome()}>
            <img src="https://i.imgur.com/f0Y5Ssm.png" alt="logoNavbar" className="navbarLogo"/>
          </div>
          <div className="rightContainer">
            <div className="rightContent" onClick={this.handleOpenModal}>
              <p>
                <i className="fas fa-paragraph"></i>
                &nbsp;&nbsp;Readme
              </p>
            </div>
            <Modal 
              isOpen={this.state.showModal}
              contentLabel="Modal Doc"
              className="readmeModal"
              overlayClassName="readmeOverlay">
              <div
                onClick={this.handleCloseModal}
                className="closeButton">
                <i className="fas fa-times-circle"></i>
                &nbsp;&nbsp;Close
              </div>
              <div className="titleModal">How to make coddoc convert properly :</div>
              <div className="createContainer">
                <div className="imageContain">
                  <div className="titleHint">Put a space after last curly bracket on for</div>
                  <img className="hintImage1" src="https://i.imgur.com/So6CesR.png" alt=""/>
                </div>
                <div className="imageContain">
                  <div className="titleHint">Put a tab after last method on class</div>
                  <img className="hintImage2" src="https://i.imgur.com/LkaYWxj.png" alt=""/>
                </div>
              </div>
            </Modal>
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
        </div>
      )
    }
  };
};

export default NavBar;