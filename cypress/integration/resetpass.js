/// <reference types="cypress" />

describe('test the reset password', function () {
    it('testing all the buttons', function () {  
   
   cy.visit('/reset')   

   cy.get('.btn-secondary')
        .contains('Cancel')
        .click()
    cy.url()
        .should('include', '/login')
    
    cy.visit('/reset')   

    })

    // it('testing the request', function () {  
        
    //     cy.server()
    //     cy.request({
    //         url: 'http://localhost:8080/auth/login/user1@a.com',
    //         method: 'POST',
    //     })
    //     .then(function(response){
    //         expect(response.status).to.eq(204)
    //     })

     
    //      })
})   