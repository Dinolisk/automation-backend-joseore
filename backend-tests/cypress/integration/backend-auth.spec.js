import * as clientHelpers from '../helpers/clientHelpers'
import * as roomHelpers from '../helpers/roomHelpers'

describe('test cases', function(){

    it('Create a new client', function(){
      clientHelpers.createClientRequest(cy)
    })

    it('Get all clients', function(){
    clientHelpers.getAllClietsRequest(cy)
    })

    it('Edit client', function(){
        clientHelpers.editRequestAfterGet(cy)
    })

    it('Create a new room', function(){
        roomHelpers.createRoomRequests(cy)
    })
 
    it('Delete room', function(){
        roomHelpers.deleteRoom(cy)
    })
})