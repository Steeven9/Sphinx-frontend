/// <reference types="cypress" />

describe('test the signup page', function () {
    it('testing the buttons', function () {  
        cy.visit('/signup')
        
        cy.get('.btn-secondary')
        .contains('Sign in')
        .click()
    cy.url()
        .should('include', '/login')
        })
})