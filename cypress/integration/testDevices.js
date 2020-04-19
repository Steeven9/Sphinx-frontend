/// <reference types="cypress" />

describe('test the devices page', function () {
    beforeEach(() => {
        cy.Login()
    })

    it('testing all the buttons', function () {  
   
        cy.visit('/devices')
        cy.contains('My devices')

        cy.get('.btn')
            .click()
        cy.url()
            .should('include', '/addDevice')
        cy.visit('/devices')

        cy.get('.lever')
            .click()

        cy.get('.collapsible-header')
            .should('have.id', '1')
            .get('.btn-edit')
            .click()
            .url()
            .should('include', 'editDevice?id=1')
            
    })
})  