
describe('test the add device page', function () {
    beforeEach(() => {
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
        
        cy.visit('/addDevice')
        cy.get('input[type=text]')
                .type('newLight')
        cy.get('select').first()
            .select('Light')
        cy.get('select').eq(1)
            .select('room1')
        cy.get('.btn-primary')
            .click()

        cy.server()
        cy.request({
            url: ' http://localhost:8080/devices',
            body: { name: "light",
                    icon: "/img/icons/devices/bulb-regular.svg",
                    type: 1,
                    roomId: "1"
                }
        })
        .then(function(response){
            expect(response.status).to.eq(200)
        })




        })  
})  