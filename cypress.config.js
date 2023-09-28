const { defineConfig } = require('cypress');

module.exports = defineConfig({
  baseUrl: 'http://localhost:3000',
  integrationFolder: 'src/cypress/e2e',
  testFiles: '**/*.cy.js',
  e2e: {
    setupNodeEvents(on, config) {},
  },
});
