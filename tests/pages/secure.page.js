const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
  /**
   * define selectors using getter methods
   */
  open() {
    return super.open('./');
  }
}

module.exports = new SecurePage();
