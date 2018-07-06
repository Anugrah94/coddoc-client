import { observable } from 'mobx';

class User {
  @observable loginStatus = false;
  @observable statusProfilePage = false;
  @observable statusLoginPage = false;
  @observable statusMainPage = false;
  @observable errorLogin = '';
  @observable oneId = null;
  @observable errorRegister = '';

  logIn() {
    this.loginStatus = true;
    this.statusLoginPage = false;
    this.statusProfilePage = false;
    this.statusMainPage = false;
  };

  logOut() {
    localStorage.removeItem('token')
    this.loginStatus = false;
  };

  wantLogin() {
    this.statusLoginPage = true;
    this.statusMainPage = false;
  };

  seeProfile() {
    this.statusProfilePage = true;
  };

  changeMainPage() {
    this.statusMainPage = true;
  }

  resetAll() {
    this.loginStatus = false;
    this.statusLoginPage = false;
    this.statusProfilePage = false;
  }

  setErrorLogin() {
    this.errorLogin = 'wrong username or password';
  }

  clearErrorLogin() {
    this.errorLogin = '';
  }

  setErrorRegister(input) {
    this.errorRegister = input;
  }

  clearErrorRegister() {
    this.errorRegister = '';
  }

  setId(id) {
    this.oneId = id;
  }
};

export default new User();