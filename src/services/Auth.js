export default class Auth {
  constructor() {
    if (typeof Auth.instance === 'object') return Auth.instance; // singleton pattern
    Auth.instance = this;
  }

  get isAuthenticated() {
    const item = sessionStorage.getItem('isAuthenticated');
    switch(item) {
      case 'false':
        return false;

      case 'true':
        return true;

      default:
        break;
    }
  }

  signin(done) {
    sessionStorage.setItem('isAuthenticated', true);
    setTimeout(done, 100); // fake async
  }

  signout(done) {
    sessionStorage.setItem('isAuthenticated', false);
    setTimeout(done, 100); // fake async
  }
}