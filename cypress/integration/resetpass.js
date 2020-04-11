/// <reference types="cypress" />

describe('test the create account page', function () {
    it('finds the content "SmartHut"', function () {  
   
   cy.visit('/reset')   

   cy.get('.btn-secondary')
        .contains('Cancel')
        .click()
    cy.url()
        .should('include', '/login')
    
    })
})   