/// <reference types="cypress" />

describe('test the devices page', function () {
    beforeEach(() => {
        cy.Login()
    })

    it('testing all the buttons', function () {
        cy.route({
            url: 'http://localhost:8080/devices',
            method: "GET",
            response: "fixture:devices.json"
        })
        cy.route({
            url: 'http://localhost:8080/auth/validate',
            method: "POST",
            headers: {
                username: "user1",
                "session-token": "sdjvayusd6asdyasgdi7a"
            },
            response: "user1"
        })

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