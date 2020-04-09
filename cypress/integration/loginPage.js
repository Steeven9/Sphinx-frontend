/// <reference types="cypress" />

describe('Loads the login page', function () {
    it('finds the content "SmartHut"', function () {
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

        cy.get('.btn-secondary')
            .contains('Cancel')
            .click()
        cy.url()
            .should('include', '/login')

            cy.get('.btn-secondary')
            .contains('Create account')
            .click()
        cy.url()
            .should('include', '/signup')

            



        


        // cy.get('.dates-input1 input[type=text ]')
        //     .type('fake@gmail.com')
        //     .should('have.value', 'fake@gmail.com')

        // cy.get('.dates-input1 input[type=password]')
        //     .type('password')
    })
})