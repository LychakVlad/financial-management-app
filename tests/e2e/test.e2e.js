/**
 * test with page objects
 */
const LoginPage = require('../pages/login.page');
const SecurePage = require('../pages/secure.page');

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await LoginPage.open();

    await LoginPage.login('lycakvladislav@gmail.com', '123456');
    await SecurePage.open();
  });
});
