const Page = require('./page');

class LoginPage extends Page {
  get inputEmail() {
    return $('#email');
  }

  get inputPassword() {
    return $('#password');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  get linkToSignUp() {
    return $('#link-signup');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async toSignUp() {
    await this.linkToSignUp.waitForDisplayed({ timeout: 5000 });
    await this.linkToSignUp.click();
  }

  open() {
    return super.open('/login');
  }
}

module.exports = new LoginPage();
