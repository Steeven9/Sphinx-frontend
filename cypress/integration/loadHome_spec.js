/// <reference types="cypress" />

describe('Test the homepage', function () {
    it('check all the function of the homepage', function () {

        //testing page
        cy.visit('/')
        cy.contains('SmartHut')
         
        cy.get('.btn-homepage-headline')
            .contains('Join now')
            .click()
        cy.url()
            .should('include', '/signup')

        cy.visit('/')
        cy.get('.join-now')
            .contains('Join now')
            .click()
        cy.url()
            .should('include', '/signup')
        cy.visit('/')

        
    })
})