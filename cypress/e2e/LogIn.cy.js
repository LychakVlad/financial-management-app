describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/login');
  });

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('form').should('contain', 'E-mail');
    cy.get('form').should('contain', 'Password');
    cy.get('form').should('contain', 'Log in');
  });

  it('should have a link to the signup page', () => {
    cy.get('#link-signup').should('exist');
    cy.get('#link-signup').should('have.attr', 'href', '#/signup');
  });

  it('should show an error message on failed login attempt', () => {
    cy.get('form').submit();
    cy.get('p').should('contain', 'Failed to sign in');
  });

  it('should allow the user to log in with valid credentials', () => {
    cy.get('input[data-testid="input-email-test"]')
      .click()
      .type('testing-cypress@gmail.com');
    cy.get('input[data-testid="input-pass-test"]').click().type('123456');

    cy.get('form').submit();

    cy.get('h1').should('contain', 'Test User');

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('form').should('contain', 'Log in');
  });
});
