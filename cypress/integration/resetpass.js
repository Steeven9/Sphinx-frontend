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
             .type('mario@usi.ch')
        
        cy.get('.btn-primary')
        .click() 
        cy.contains('Password reset request processed!')

        cy.get('input[type=email]')
             .type('fake@usi.ch')
        
        cy.get('.btn-primary')
        .click() 
        cy.contains('There was an issue with your request!')
        

        cy.server()
        cy.request({
            url: 'http://localhost:8080/auth/reset/mario@usi.ch',
            method: 'POST',
        })
        .then(function(response){
            expect(response.status).to.eq(204)
        })

     })
})   