/// <reference types="cypress" />

describe('test the reset password', function () {
    it('testing all the buttons', function () {  
   
   cy.visit('/reset')   

   cy.get('.btn-secondary')
        .contains('Cancel')
        .click()
    cy.url()
        .should('include', '/login')
    
    })
})   