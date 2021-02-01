const faker = require('faker')

const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'

//Random values to create new client as well as list of clients
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

//Random values for the editing function 
    const name = faker.name.firstName()
    const email = faker.internet.email()
    const phone = faker.phone.phoneNumber()

    function createRandomClientPayload(){
    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }
 
    return payload

}
function getRequestAllClientsWithAssertion(cy, name, email, telephone){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
      },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)

        cy.log(response.body[response.body.length -1].id)
        cy.log(response.body.length)
    }))
}

function getAllClietsRequest(cy){
    cy.authenticateSession().then((response =>{
   
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
            },
        }).then((response =>{
        const responseAsString = JSON.stringify(response)
        cy.log(responseAsString)
    }))

}))
}
function editRequestAfterGet(cy){

//GET request to get clients
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
        },
//Editing client with random values, -2 instead of -1 to check if the client actually gets edited to something else 
//as with every run of test cases a new client is created therefore it's tricky to check if it was edited or not -2 fixes that
        }).then((response =>{
        let lastId=response.body[response.body.length -2].id
        cy.request({
            method:"PUT",
            url:ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:{
                "id":lastId,
                "name":name,
                "email":email,
                "telephone":phone  
            }

        }).then((response =>{               
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(name)
        }))

}))
}
function createClientRequest(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload()

//POST request to create new client
        cy.request({
            method:"POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

            body:fakeClientPayload
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))
        getRequestAllClientsWithAssertion(cy, fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))
}

module.exports = {
    createRandomClientPayload,
    createClientRequest,
    getAllClietsRequest,
    editRequestAfterGet
    

}
