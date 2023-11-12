export default class TicketDTO{
    #ticket;
    constructor(data){
        //console.log(puser);
        this.#ticket = {           
            first_name: puser.first_name,
            last_name: puser.last_name,
            email: puser.email,
            age: puser.age,
            role : puser.role
        }
        
    }
    getUser(){
        return this.#ticket;
    }

}