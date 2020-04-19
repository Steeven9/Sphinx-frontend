/// <reference types="cypress" />

describe('test the edit device page', function () {
    beforeEach(() => {
        cy.Login()
    })

    it('testing all the buttons', function () {  
   
        cy.visit('/editDevice?id=1')
        cy.contains('Edit Device')

        cy.get('.Handle-btn-secondary').first()
            .click()
        cy.url()
            .should('include', '/devices')
        cy.visit('/editDevice?id=1')

      
        
            
    })
})  