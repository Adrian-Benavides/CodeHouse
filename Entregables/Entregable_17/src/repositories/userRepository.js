import { userModel } from "../dao/models/user.model.js";

export default class UserRepository{
    
    
    async getUserById(id){
        const user = await  userModel.find({_id : id}).lean();
        return user;
    }

    async getUserByEmail(email){
        const user = await  userModel.find({email}).lean();
        return user;
    }

    async updateUserRoleById(iduser,newRole){ 
        const respUser = await userModel.updateOne({_id : iduser},{role:newRole}).lean();
        return respUser; 
    }

    async updatePassById(iduser,newPass){ 
        const respUser = await userModel.updateOne({_id : iduser},{password:newPass}).lean();
        return respUser; 
    }

    async updatePassByEmail(email,newPass){ 
        const respUser = await userModel.updateOne({email},{password:newPass}).lean();
        return respUser; 
    }

}