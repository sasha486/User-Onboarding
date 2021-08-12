describe('test our form inputs', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3001');
  });
  it('adds tests form inputs', function () {
    cy.get('[data-cy= "name"]').type('sasha').should('have.value', 'sasha');
    cy.get('[data-cy= "email"]');
    cy.type('email@email.com');
    cy.should('have.value', 'email@email.com');
    cy.type(password).should('have.value', password);
    cy.get('.terms > input').check().should('be.checked');
    cy.get('[data-cy = "submit"]').click();
    cy.get('form').submit();
  });
});
