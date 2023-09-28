const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://budget-buddy-finance.netlify.app/#/login',
  },
});
