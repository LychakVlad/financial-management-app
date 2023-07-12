const Page = require('./page');

class SecurePage extends Page {
  get btnLogout() {
    return $('button-logout');
  }

  open() {
    return super.open('/');
  }

  async logout() {
    await this.btnLogout.click();
  }
}

module.exports = new SecurePage();
