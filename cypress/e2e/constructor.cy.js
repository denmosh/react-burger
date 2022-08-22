describe('constructor drag and drop should work correctly', function() {
  before(function() {
    cy.viewport(1200, 800);
    cy.visit('http://localhost:3000');
  });

  function moveItem (selector, x, y) {
    cy.get(`${selector}`)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: x, clientY: y })
        .trigger('mouseup', { force: true })
  }

  it('should open modal window and close', function() {
    cy.get('[class^=burger-ingredients_section__]').first().as('bun');
    cy.get('[class^=burger-constructor_constructor__]').first().as('constructor');
    cy.get('[class^=burger-ingredients_section__]').eq(2).as('main');
    cy.get('@bun').find('[class^=burger-ingredient_item]').first().as('ingredientBun');
    cy.get('@main').find('[class^=burger-ingredient_item]').first().as('ingredientMain');
    // moveItem('@ingredientMain', 600, 400);
    moveItem('@ingredientBun', 452, 372);


  });
});