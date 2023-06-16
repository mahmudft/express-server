/// <reference types="cypress" />


const user = { "username": "admin", "password": "admin123", "email": "admin@admin.com" }
let token = ''

describe(" Testing Api Authorization System",()=> {
    before(() =>{
        console.log("Server is running")
    })



    it("Test Api SignUp", () => {
        cy.request({
            url: "auth/signup",
            method: "POST",
            failOnStatusCode: false,
            body: user,
            headers: {
                "content-type": "application/json"
        
            }
        }).then(response => {
            // expect(response.status).eql(404)
            expect(response.body).to.have.property("email", "admin@admin.com")
        })
        
    })


    it("Test Api Login", () => {
        cy.request({
            url: "auth/login",
            method: "POST",
            failOnStatusCode: false,
            body: user,
            headers: {
                "content-type": "application/json"
        
            }

        }).then(response => {
            expect(response.body).to.have.property("token")
            token = response.body.token

        })
})


    it("Test Token Required Endpoint /user", () => {
        cy.request({
            url: "auth/user",
            method: "GET",
            failOnStatusCode: false,
            body: user,
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
        
            }

        }).then(response => {
            expect(response.body).to.have.property("email")
            expect(response.status).eq(200)

        })
})
})