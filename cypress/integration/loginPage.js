/// <reference types="cypress" />

describe('Testing the login page', function () {
    it('testing all the buttons', function () {
        cy.visit('/login')
        cy.contains('Log in')

        

        cy.get('.btn-secondary')
            .contains('Create account')

        cy.get('.btn-primary')
            .contains('Log in')
        
        cy.get('.btn-primary')
            .contains('Log in')

        cy.get('.primary-link')
            .contains('Forgot your password?')
            .click()
         cy.url()
            .should('include', '/reset')
        cy.contains('Restore password')

        cy.visit('/login')

        cy.get('.btn-secondary')
            .contains('Create account')
            .click()
        cy.url()
            .should('include', '/signup')
        
        cy.visit('/login')
 
        cy.get('.dates-input1 input[type=text ]')
            .type('fake@gmail.com')
            .should('have.value', 'fake@gmail.com')

        cy.get('.dates-input1 input[type=password]')
            .type('password')
        cy.get('.btn-primary')
            .click()

        cy.contains("Couldn't log in")


        


    })
})