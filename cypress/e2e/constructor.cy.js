describe('constructor drag and drop should work correctly', function() {
  before(function() {
    cy.viewport(1200, 800);
    cy.visit('http://localhost:3000');
  });

  it('should open modal window and close', function() {
    cy.get('[class^=burger-ingredients_section__]').first().as('bun');
    cy.get('[class^=burger-constructor_constructor__]').first().as('constructor');
    cy.get('[class^=burger-ingredients_section__]').eq(2).as('main');
    cy.get('[class^=burger-ingredients_section__]').eq(1).as('sauce');
    cy.get('@bun').find('[class^=burger-ingredient_item]').first().as('ingredientBun');
    cy.get('@main').find('[class^=burger-ingredient_item]').first().as('ingredientMain');
    cy.get('@sauce').find('[class^=burger-ingredient_item]').first().as('ingredientSauce');

    cy.get('[id=modals]').first().as('modals');
    cy.get('@modals').should('be.empty');
    cy.get('[class^=button_button__]').first().as('order');
    cy.get('@order').should('have.attr', 'disabled');

    // drag and drop ingredients
    const dataTransfer = new DataTransfer();
    cy.get('@ingredientBun').trigger('dragstart', {
      dataTransfer
    });
    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });
    cy.get('@ingredientMain').trigger('dragstart', {
      dataTransfer
    });
    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });
    cy.get('@ingredientSauce').trigger('dragstart', {
      dataTransfer
    });
    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });
    cy.get('@order').click();

    //should redirect to login page
    cy.location('pathname').should('eq', '/login')
    cy.get('[name=email]').first().as('email').type('moshkinden@yandex.ru');
    cy.get('[name=password]').first().as('password').type('asxzqw12');
    cy.get('button[type=submit]').first().as('submit').click();

    //should redirect back to frontpage
    cy.location('pathname').should('eq', '/')
    cy.get('@order').click();
    cy.intercept('https://norma.nomoreparties.space/api/orders').as(
        'post'
    )
    cy.wait('@post', {requestTimeout: 30000});
    cy.get('@modals').get('[class^=modal_modal__]').first().as('modal')
    cy.get('@modal').should('be.visible');
    cy.get('@modal').find('[class^=order-details_orderNumber__]').first().as('orderNumber');
    cy.get('@modal').find('[class^=modal_close]').first().click();
    cy.get('@modals').should('be.empty');

  });
});