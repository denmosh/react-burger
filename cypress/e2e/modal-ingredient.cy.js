
describe('modal ingredient works correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open modal window and close', function() {
    cy.get('[class^=burger-ingredients_section__]').first().as('buns');
    cy.get('@buns').find('[class^=burger-ingredient_item]').first().as('ingredient');
    cy.get('[id=modals]').first().as('modals');
    cy.get('@modals').should('be.empty');

    cy.get('@ingredient').click();

    cy.get('@modals').get('[class^=modal_modal__]').first().as('modal')
    cy.get('@modal').should('be.visible');
    cy.get('@modal').find('[class^=modal_close]').first().click();
    cy.get('@modals').should('be.empty');

  });
});