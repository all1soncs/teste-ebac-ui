
describe ('Funcionalidade login', () => {

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
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
  
  it('Deve exibir mensagem de erro e-mail incorreto', () => {

    cy.get('#username').type('aluno_abc@teste.com')
    cy.get('#password').type('teste@.com')
    cy.get('.woocommerce-form > .button').click()

    // Verificar a mensagem esperada
    cy.get('.page-title').should('contain', 'Minha conta')
    cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')


  });

  it('Deve exibir mensagem de erro senha incorreta', () => {

    cy.get('#username').type('aluno_ebac@teste.com')
    cy.get('#password').type('teste@.com')
    cy.get('.woocommerce-form > .button').click()

    // Verificar a mensagem esperada
    cy.get('.page-title').should('contain', 'Minha conta')
    cy.get('.woocommerce-error').should('contain', 'Erro: a senha fornecida para o e-mail aluno_ebac@teste.com está incorreta.')


  });
})
