const faker = require('faker')

const ENDPOINT_POST_ROOMS = 'http://localhost:3000/api/room/new'
const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_PUT_ROOM = 'http://localhost:3000/api/room/'

//Using the faker library to generate random values 
    const fakeFeat = [faker.lorem.word()]
    const fakeCat = "double"
    const fakeNum = faker.random.number()
    const fakeFloor = faker.random.number()
    const fakeAvail = faker.random.boolean()
    const fakePrice = faker.random.number()


function createRoom(){
    const newRoom =  {
    "features": fakeFeat, 
    "category": fakeCat,
    "number": fakeNum, 
    "floor": fakeFloor, 
    "available": fakeAvail, 
    "price": fakePrice
}

return newRoom
}

function createRoomRequests(){
    cy.authenticateSession().then((response =>{
        let fakeNewRoom = createRoom()

    //Post request to create new room
        cy.request({
            method:"POST",
            url: ENDPOINT_POST_ROOMS,
            headers: { 
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'

            },
            body:fakeNewRoom
        // Assertion 
        }).then((response => {
            expect(response.status).to.equal(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))
}

function deleteRoom(){

        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
    //DELETE request to remove second last room
        }).then((response =>{
            let lastId=response.body[response.body.length -2].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_PUT_ROOM+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            } 
        })
    }))   
} 

module.exports = {
    createRoomRequests,
    deleteRoom

}
