describe('Tax Calculator component Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="test-taxes"]').should('exist').click();
  });

  it('should load main page', () => {
    cy.get('h1').should('contain', 'Test User');
  });

  it('should load tax calculator page', () => {
    cy.get('p').should('contain', 'Your income before taxes');
  });

  it('should give an error if input empty', () => {
    cy.get('[data-testid="btn-tax-calc-test"]').click();

    cy.get('p').should('contain', 'Please choose an option');
  });

  it('should fill out the form with no deductions and calculate taxes', () => {
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
  });

  it('should fill out the form with deductions and calculate taxes', () => {
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
  });
});
