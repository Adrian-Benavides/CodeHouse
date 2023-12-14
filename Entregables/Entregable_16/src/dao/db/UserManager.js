import { json, query, response } from "express";
import { productoModel } from "../models/producto.model.js";
import  UserRepository from "../../repositories/userRepository.js"
import customError from "../../service/errors/CutomError.js";
import enumErrors from "../../service/errors/enumError.js"
import bcrypt from 'bcrypt';
import {logger} from '../../utils/logger.js';

const userRepository = new UserRepository();

export default class UserManager{
   
    async getProducts(){

        try{      

            const productos = await productRepository.getProducts();
            return productos;
           
        }catch(e){
            customError.createError({
                name: "Error DB",
                cause: "Error de conexion",
                message: "Error al obtener productos desde la base de datos",
                code:   enumErrors.ERROR_BASE_DATOS
            });
        }
    }

   
    async updateUserPremiumRoleById(id) {
        try{

            const user = await userRepository.getUserById(id);
            if(!user){
                customError.createError({
                    name: "Error Usurio",
                    cause: "Error no se encontro el usuario",
                    message: `Error al encontrar el usuario de id:(${id}) en la base de datos`,
                    code:   enumErrors.ERROR_DATA_NO_EXIST
                });
            }
            let newRole = user[0].role;
            if(newRole == 'user'){
                newRole = 'premium';
            }else{
                if(newRole == 'premium'){
                    newRole = 'user';
                }
            }   
            await userRepository.updateUserRoleById(id,newRole);
            
            return {status: `Rol acutalizado a ${newRole}`};
           
        }catch(e){
            if(e.code){
                throw e;
            }
            customError.createError({
                name: "Error DB",
                cause: "Error de conexion",
                message: "Error al actualizar un producto en la base de datos",
                code:   enumErrors.ERROR_BASE_DATOS
            });
        }
    }


    async updatePassByEmail(email,newPass) {
        try{
            const user = await userRepository.getUserByEmail(email);
            if(!user.length){
                customError.createError({
                    name: "Error Email",
                    cause: "Error no se encontro usuario",
                    message: "Error al cambiar contraseña",
                    code:   enumErrors.ERROR_DATA_NO_EXIST
                }); 
            }
            logger.info(user.length);
            if(bcrypt.compareSync(newPass, user[0].password)){
                return -1;
            }
            const passCryp = bcrypt.hashSync(newPass, bcrypt.genSaltSync(10));
            const newUser = await userRepository.updatePassByEmail(email,passCryp);
            return newUser;
        }catch(e){
            if(e.code){
                throw e;
            }
            customError.createError({
                name: "Error DB",
                cause: "Error de conexion",
                message: "Error al actualizar un producto en la base de datos",
                code:   enumErrors.ERROR_BASE_DATOS
            });
        }
    }
}


