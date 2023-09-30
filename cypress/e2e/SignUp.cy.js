describe('SigUp Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/signup');
  });

  const randomEmail = `test-${Math.floor(Math.random() * 100000)}@example.com`;

  it('should display the sig up form', () => {
    cy.get('form').should('exist');
    cy.get('form').should('contain', 'E-mail');
    cy.get('form').should('contain', 'Password');
    cy.get('form').should('contain', 'Sign Up');
  });

  it('should have a link to the login page', () => {
    cy.get('#link-login').should('exist');
    cy.get('#link-login').should('have.attr', 'href', '#/login');
  });

  it('should show an error message on failed sign up attempt', () => {
    cy.get('form').submit();
    cy.get('p').should('contain', 'Failed to create an account');
  });

  it('should allow the user to sign up with valid credentials', () => {
    cy.get('input[data-testid="input-email-test"]')
      .click()
      .clear()
      .type(randomEmail);
    cy.get('input[data-testid="input-name-test"]').click().type('Test User');
    cy.get('input[data-testid="input-pass-test"]').click().type('123456');
    cy.get('input[data-testid="input-pass-confirm-test"]')
      .click()
      .type('123456');

    cy.get('form').submit();

    cy.get('h1').should('contain', 'welcome to this app!');

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('form').should('contain', 'Log in');
  });
});
