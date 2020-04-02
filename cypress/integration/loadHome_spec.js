/// <reference types="cypress" />

describe('Loads the homepage', function () {
    it('finds the content "SmartHut"', function () {
        cy.visit('/')

        cy.contains('SmartHut')
    })
})