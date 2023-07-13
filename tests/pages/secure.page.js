const Page = require('./page');

class SecurePage extends Page {
  get btnLogout() {
    return $('[name="logout"]');
  }

  async logout() {
    await this.btnLogout.waitForDisplayed({ timeout: 5000 });
    await this.btnLogout.click();
  }

  open() {
    return super.open('/');
  }
}

module.exports = new SecurePage();
