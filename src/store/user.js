import { observable } from 'mobx';

class User {
  @observable loginStatus = true;
  @observable statusProfilePage = false;
  @observable statusLoginPage = false;
  @observable user = {
    fullname: 'Fitrul Islam',
    username: 'fitrul31',
  };

  logIn() {
    this.loginStatus = true;
  };

  logOut() {
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
};

export default new User();