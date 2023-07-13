const LoginPage = require('../pages/login.page');
const SecurePage = require('../pages/secure.page');
const SignUpPage = require('../pages/signup.page');

describe('My Login application', () => {
  it('should login and signup with valid credentials', async () => {
    await LoginPage.open();

    await LoginPage.login('lycakvladislav@gmail.com', '123456');

    await SecurePage.logout();

    await LoginPage.toSignUp();

    await SignUpPage.signup(
      'testemail@gmail.com',
      'tester',
      '123456',
      '123456'
    );

    await SecurePage.logout();
  });
});
