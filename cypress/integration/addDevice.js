/// <reference types="cypress" />

describe('test the add device page', function () {
    beforeEach(() => {
        cy.Login()
    })

    it('testing all the buttons', function () {  
   
        cy.visit('/addDevice')
        cy.contains('Add device')

        cy.get('.btn-secondary')
            .click()
        cy.url()
            .should('include', '/devices')
        cy.visit('/addDevice')

        cy.get('.btn-primary')
            .click()
        cy.contains('Please insert all information')

        cy.get('input[type=text]')
            .type('light')
        
            
    })
})  