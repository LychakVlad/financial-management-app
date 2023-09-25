describe('Budget Planner Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="test-planner"]').should('exist').click();
  });

  it('should load main page', () => {
    cy.get('h1').should('contain', 'Test User');
  });

  it('should load income tracker page', () => {
    cy.get('div').should('contain', 'Save Needs');
  });

  it('should validate total calculation in budget form', () => {
    cy.get('[data-testid="budget-needs-input-Rent/Mortgage"]')
      .click()
      .type('2000');
    cy.get('[data-testid="budget-needs-input-Car Payment"]')
      .click()
      .type('2000');
    cy.get('[data-testid="budget-needs-input-Groceries"]').click().type('600');

    cy.get('[data-testid="total-amount-needs"]').should('contain', '4,600 $');

    cy.get('[data-testid="btn-needs"]').should('exist').click();

    cy.get('[data-testid="btn-wants"]').should('exist');

    cy.get('[data-testid="budget-wants-input-Travel"]').click().type('1000');
    cy.get('[data-testid="budget-wants-input-Shopping"]').click().type('1000');
    cy.get('[data-testid="budget-wants-input-Entertainment"]')
      .click()
      .type('760');

    cy.get('[data-testid="total-amount-wants"]').should('contain', '2,760 $');

    cy.get('[data-testid="btn-wants"]').should('exist').click();

    cy.get('[data-testid="btn-savings"]').should('exist');

    cy.get('[data-testid="budget-savings-input-Emergency Savings"]')
      .click()
      .type('1000');
    cy.get('[data-testid="budget-savings-input-Vacation Savings"]')
      .click()
      .type('440');
    cy.get('[data-testid="budget-savings-input-House Savings"]')
      .click()
      .type('400');

    cy.get('[data-testid="total-amount-savings"]').should('contain', '1,840 $');

    cy.get('[data-testid="btn-savings"]').should('exist').click();

    cy.get('[data-testid="total-needs"]').should('contain', '4,600 $');
    cy.get('[data-testid="total-wants"]').should('contain', '2,760 $');
    cy.get('[data-testid="total-savings"]').should('contain', '1,840 $');
  });

  it('should correctly split a total income after tax', () => {
    cy.get('[data-testid="total-tab-test"]').should('exist').click();

    cy.get('[data-testid="total-after-tax"]').should('contain', '9,235 $');

    cy.get('[data-testid="total-needs-after-tax"]').should('contain', '4,600$');
    cy.get('[data-testid="total-wants-after-tax"]').should('contain', '2,760$');
    cy.get('[data-testid="total-savings-after-tax"]').should(
      'contain',
      '1,840$'
    );
  });
});