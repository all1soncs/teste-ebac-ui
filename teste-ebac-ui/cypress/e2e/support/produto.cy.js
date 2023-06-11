describe('Deve selecionar um produto', () => {
  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/produto/')
    //cy.wait(9000); // Atraso de 1 segundo

  });

  afterEach(() => {
    cy.screenshot()
  });

  it('Deve realizar login com sucesso', () => {
    cy.get('#username').type('aluno_ebac@teste.com')
    cy.get('#password').type('teste@teste.com')
    cy.get('.woocommerce-form > .button').click()

    // Verificar se o login foi realizado com sucesso
    cy.get('.page-title').should('contain', 'Minha conta')
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, Aluno')
  })

  it('Deve selecionar um produto da lista e adcionar no carrinho', () => {
    cy.get('#primary-menu > .menu-item-629 > a').click();
    cy.get('[class="product-block grid"]')
      //.first()
      .contains('Abominable Hoodie')
      .click();
    var quantidade = 3
    cy.get('[class="variable-item button-variable-item button-variable-item-M"]')
      .should('contain', 'M').click();
    cy.get('.button-variable-item-Blue').click()
    cy.get('.input-text').clear()
      .type(quantidade)
    //carrinho
    cy.get('.single_add_to_cart_button').click()
    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
    cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho')
    cy.get('.woocommerce-message > .button').click()

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

  });



});