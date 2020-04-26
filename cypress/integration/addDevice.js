/// <reference types="cypress" />

describe('test the add device page', function () {
    this.beforeEach(() => {
        cy.Login()
    })

    it('testing all the buttons', function () {
        cy.visit('/addDevice')
        cy.contains('Add device')

        cy.get('.btn-secondary')
            .click()
        cy.url()
            .should('include', '/devices')
        cy.visit('/addDevice')

        cy.get('.btn-primary')
            .click()
        cy.contains('Please insert all information')
    })

    it('testing the request', function () {
        cy.server()
        cy.route({
            url: 'http://localhost:8080/devices',
            method: "GET",
            response: "fixture:devices.json"
        })
        cy.route({
            url: 'http://localhost:8080/rooms',
            method: "GET",
            response: "fixture:getRooms.json"            
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
        cy.route({
            url: 'http://localhost:8080/devices',
            method: "POST",
            headers: {
                username: "user1",
                "session-token": "sdjvayusd6asdyasgdi7a"
            },
            body: {name: "asd", icon: "/img/icons/devices/bulb-led.svg", type: 2, roomId: "2"},
            status: 201,
            response: {}
        })        

        cy.visit('/addDevice')
        cy.get('input[type=text]')
            .type('newLight')
        cy.get('select').first()
            .select('Light')
        cy.get('select').eq(1)
            .select('room1')
        cy.get('.btn-primary')
            .click()
        cy.url()
            .should('include', '/devices')
    })

    it('testing the request', function () {
        cy.server()
        cy.route({
            url: 'http://localhost:8080/devices',
            method: "GET",
            response: "fixture:devices.json"
        })
        cy.route({
            url: 'http://localhost:8080/rooms',
            method: "GET",
            response: "fixture:getRooms.json"            
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
        cy.route({
            url: 'http://localhost:8080/devices',
            method: "POST",
            headers: {
                username: "user1",
                "session-token": "sdjvayusd6asdyasgdi7a"
            },
            body: {name: "asd", icon: "/img/icons/devices/bulb-led.svg", type: 2, roomId: "2"},
            status: 201,
            response: {}
        })        

        cy.visit('/addDevice')
        cy.get('input[type=text]')
            .type('newLight')
        cy.get('select').first()
            .select('Light')
        cy.get('select').eq(1)
            .select('room1')
        cy.get('.btn-primary')
            .click()
        cy.url()
            .should('include', '/devices')
    })
})  