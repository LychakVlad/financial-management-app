const LoginPage = require('../pages/login.page');
const SignUpPage = require('../pages/signup.page');
const SecurePage = require('../pages/secure.page');

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await LoginPage.open();

    await LoginPage.login('lycakvladislav@gmail.com', '123456');
    await SecurePage.open();
    await SecurePage.logout();
    await LoginPage.linkToSignUp.click();
    await SignUpPage.open();

    await SignUpPage.signup(
      'testemail@gmail.com',
      'tester',
      '123456',
      '123456'
    );
    await SecurePage.open();
  });
});
