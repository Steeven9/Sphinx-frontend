/// <reference types="cypress" />

describe('test the devices page', function () {
    beforeEach(() => {
        
        cy.visit('/login')
        cy.get('input[type=text]')
            .type('user1')
        cy.get('input[type=password]')
            .type('1234')
        cy.get('.btn-primary').click()

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

        cy.get('.btn-edit')
            .click()
        cy.url()
            .should('include', 'editDevice?id=1')
        
        
    

    })
})  