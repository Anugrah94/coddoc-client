import { observable } from 'mobx';

class User {
  @observable loginStatus = false;
  @observable statusProfilePage = false;
  @observable statusLoginPage = false;
  @observable user = {};

  logIn() {
    this.loginStatus = true;
    this.statusLoginPage = false;
    this.statusProfilePage = false;
  };

  logOut() {
    localStorage.removeItem('token')
    this.loginStatus = false;
  };

  wantLogin() {
    this.statusLoginPage = true;
  };

  seeProfile() {
    this.statusProfilePage = true;
  };

  resetAll() {
    this.loginStatus = false;
    this.statusLoginPage = false;
    this.statusProfilePage = false;
  }

  addUser(user) {
    this.user = user;
  }
};

export default new User();