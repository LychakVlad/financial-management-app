describe('Tax Calculator component Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/login');

    cy.get('input[data-testid="input-email-test"]')
      .click()
      .type('testing-cypress@gmail.com');
    cy.get('input[data-testid="input-pass-test"]').click().type('123456');

    cy.get('form').submit();

    cy.get('h1').should('contain', 'Test User');

    cy.get('[data-testid="test-taxes"]').should('exist').click();
  });

  it('should load main page', () => {
    cy.get('h1').should('contain', 'Test User');

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('form').should('contain', 'Log in');
  });

  it('should load tax calculator page', () => {
    cy.get('p').should('contain', 'Your income before taxes');

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('form').should('contain', 'Log in');
  });

  it('should give an error if input empty', () => {
    cy.get('[data-testid="btn-tax-calc-test"]').click();

    cy.get('p').should('contain', 'Please choose an option');

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('form').should('contain', 'Log in');
  });

  it('should fill out the form with no deductions and calculate taxes', () => {
    cy.get('[data-testid="test-income"]').should('exist').click();

    cy.get('input[data-testid="input-number-test"]').click().type('10000');
    cy.get('[data-testid="dropdown-type-test"]').click();
    cy.get('[data-testid="dropdown-type-test-0"]').click();
    cy.get('[data-testid="dropdown-tax-test"]').click();
    cy.get('[data-testid="dropdown-tax-test-0"]').click();

    cy.get('[data-testid="btn-add-test"]').should('exist').click();

    cy.wait(1000);

    cy.get('[data-testid="test-taxes"]').should('exist').click();

    cy.get('[data-testid="total-tax-test"]').should('contain', '10,000 $');

    cy.get('[data-testid="state-tax-test"]').should('contain', '0%');
    cy.get('[data-testid="federal-tax-test"]').should('contain', '0%');

    cy.get('[data-testid="dropdown-status-test"]').click();
    cy.get('[data-testid="dropdown-status-test-1"]').click();

    cy.get('[data-testid="radio-no-test"]').click();

    cy.get('[data-testid="btn-tax-calc-test"]').should('exist').click();

    cy.get('[data-testid="state-tax-test"]').should('contain', '5%');
    cy.get('[data-testid="federal-tax-test"]').should('contain', '12%');
    cy.get('[data-testid="total-pay-test"]').should('contain', '2,076 $');

    cy.wait(1000);

    cy.get('[data-testid="test-income"]').should('exist').click();

    cy.get('[data-testid="delete-all-income-btn-test"]').should('exist');

    cy.get('[data-testid="delete-all-income-btn-test"]').click();

    cy.wait(1000);

    cy.get('[data-testid="income-list-item-test-0"]').should('not.exist');

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('form').should('contain', 'Log in');
  });

  it('should fill out the form with deductions and calculate taxes', () => {
    cy.get('[data-testid="test-income"]').should('exist').click();

    cy.get('input[data-testid="input-number-test"]').click().type('10000');
    cy.get('[data-testid="dropdown-type-test"]').click();
    cy.get('[data-testid="dropdown-type-test-0"]').click();
    cy.get('[data-testid="dropdown-tax-test"]').click();
    cy.get('[data-testid="dropdown-tax-test-0"]').click();

    cy.get('[data-testid="btn-add-test"]').should('exist').click();

    cy.wait(1000);

    cy.get('[data-testid="test-taxes"]').should('exist').click();

    cy.get('[data-testid="total-tax-test"]').should('contain', '10,000 $');

    cy.get('[data-testid="state-tax-test"]').should('contain', '0%');
    cy.get('[data-testid="federal-tax-test"]').should('contain', '0%');

    cy.get('[data-testid="dropdown-status-test"]').click();
    cy.get('[data-testid="dropdown-status-test-1"]').click();

    cy.get('[data-testid="radio-yes-test"]').click();

    cy.get('[data-testid="btn-tax-calc-test"]').should('exist').click();

    cy.get('[data-testid="state-tax-test"]').should('contain', '0%');
    cy.get('[data-testid="federal-tax-test"]').should('contain', '0%');
    cy.get('[data-testid="total-pay-test"]').should('contain', '765 $');

    cy.wait(1000);

    cy.get('[data-testid="test-income"]').should('exist').click();

    cy.get('[data-testid="delete-all-income-btn-test"]').should('exist');

    cy.get('[data-testid="delete-all-income-btn-test"]').click();

    cy.wait(1000);

    cy.get('[data-testid="income-list-item-test-0"]').should('not.exist');

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('form').should('contain', 'Log in');
  });
});
