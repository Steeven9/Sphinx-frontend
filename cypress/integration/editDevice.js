/// <reference types="cypress" />

describe('test the edit device page', function () {
    beforeEach(() => {
        cy.Login()
    })

    it('testing all the buttons', function () {
        cy.server()
        cy.route({
            url: 'http://localhost:8080/auth/validate',
            method: "POST",
            headers: {
                username: "user1",
                "session-token": "sdjvayusd6asdyasgdi7a"
            },
            response: "user1"
        })
   
        cy.visit('/editDevice?id=1')
        cy.contains('Edit Device')

        cy.get('.Handle-btn-secondary').first()
            .click()
        cy.url()
            .should('include', '/devices')
        cy.visit('/editDevice?id=1')

      
        
            
    })
})  