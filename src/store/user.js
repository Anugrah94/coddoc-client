import { observable } from 'mobx';

class User {
  @observable loginStatus = false;
  @observable statusProfilePage = false;
  @observable statusLoginPage = false;
  @observable user = {};
  @observable errorLogin = '';
  @observable errorRegister = '';

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

  setErrorLogin() {
    this.errorLogin = 'wrong username/password';
  }

  clearErrorLogin() {
    this.errorLogin = '';
  }

  setErrorRegister() {
    this.errorRegister = 'salah ni pak';
  }

  clearErrorRegister() {
    this.errorRegister = '';
  }
};

export default new User();