const Page = require('./page');

class SignUpPage extends Page {
  get inputEmail() {
    return $('#email');
  }

  get inputName() {
    return $('#name');
  }

  get inputPassword() {
    return $('#password');
  }

  get inputPasswordRepeat() {
    return $('#password-repeat');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  async signup(email, name, password, repeatPassword) {
    await this.inputEmail.setValue(email);
    await this.inputName.setValue(name);
    await this.inputPassword.setValue(password);
    await this.inputPasswordRepeat.setValue(repeatPassword);
    await this.btnSubmit.click();
  }

  open() {
    return super.open('/signup');
  }
}

module.exports = new SignUpPage();
