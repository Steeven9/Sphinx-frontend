/// <reference types="cypress" />

describe('test the reset password', function () {
    it('testing all the buttons', function () {  
   
   cy.visit('/reset')   

   cy.get('.btn-secondary')
        .contains('Cancel')
        .click()
    cy.url()
        .should('include', '/login')
    
    cy.visit('/reset')   

    })

    it('testing the request', function () {  
   
        cy.visit('/reset')   
     
        cy.get('input[type=email]')
             .type('fake@gmail.com')
        
        cy.get('.btn-primary')
        .click()
         
        cy.contains('There was an issue with your request!')

     
         })
})   