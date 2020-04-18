/// <reference types="cypress" />
setupFiles: ['@testing-library/react/dont-cleanup-after-each']

describe('Testing the login page', function () {
    it('testing all the buttons', function () {
        cy.visit('/login')
        cy.contains('Log in')

        
        cy.get('.btn-secondary')
            .contains('Create account')
        
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
             


    })

it('testing the login', function () {
        cy.visit('/login')
    
         
        cy.server()
        cy.request({
            url: 'http://localhost:8080/auth/login/user1',
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: "1234"
        })
        .then(function(response){
            expect(response.status).to.eq(200)
        })

    })
})