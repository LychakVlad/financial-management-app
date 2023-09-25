describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="test-income"]').should('exist').click();
  });

  it('should load main page', () => {
    cy.get('h1').should('contain', 'Test User');
  });

  it('should load income tracker page', () => {
    cy.get('h2').should('contain', 'Write down your income');
  });

  it('should give an error if input empty', () => {
    cy.get('[data-testid="btn-add-test"]').click();

    cy.get('p').should('contain', 'Enter the value');
  });

  it('should fill out the income form and add income item', () => {
    cy.get('input[data-testid="input-number-test"]').click().type('10000');
    cy.get('[data-testid="dropdown-type-test"]').click();
    cy.get('[data-testid="dropdown-type-test-1"]').click();
    cy.get('[data-testid="dropdown-tax-test"]').click();
    cy.get('[data-testid="dropdown-tax-test-1"]').click();

    cy.get('[data-testid="btn-add-test"]').should('exist').click();

    cy.wait(1000);

    cy.get('input[data-testid="input-number-test"]').click().type('10000');
    cy.get('[data-testid="dropdown-type-test"]').click();
    cy.get('[data-testid="dropdown-type-test-1"]').click();
    cy.get('[data-testid="dropdown-tax-test"]').click();
    cy.get('[data-testid="dropdown-tax-test-1"]').click();

    cy.get('[data-testid="btn-add-test"]').should('exist').click();

    cy.wait(1000);

    cy.get('input[data-testid="input-number-test"]').click().type('10000');
    cy.get('[data-testid="dropdown-type-test"]').click();
    cy.get('[data-testid="dropdown-type-test-0"]').click();
    cy.get('[data-testid="dropdown-tax-test"]').click();
    cy.get('[data-testid="dropdown-tax-test-0"]').click();

    cy.get('[data-testid="btn-add-test"]').should('exist').click();

    cy.wait(1000);

    cy.get('[data-testid="income-list-item-test-0"]').should('exist');
    cy.get('[data-testid="income-list-item-test-1"]').should('exist');
    cy.get('[data-testid="income-list-item-test-2"]').should('exist');
  });

  it('should delete an income item', () => {
    cy.get('[data-testid="income-list-item-test-2"]').should('exist');

    cy.get('[data-testid="delete-btn-income-item-test-2"]').click();

    cy.get('[data-testid="income-list-item-test-2"]').should('not.exist');
  });

  it('should delete all income items', () => {
    cy.get('[data-testid="delete-all-income-btn-test"]').should('exist');

    cy.get('[data-testid="delete-all-income-btn-test"]').click();

    cy.get('[data-testid="income-list-item-test-0"]').should('not.exist');
  });
});
