import { json, query } from "express";
import { productoModel } from "../models/producto.model.js";
import  ProductRepository from "../../repositories/ProductRepository.js"

const productRepository = new ProductRepository();

export default class ProductManager{
   
    async addPoduct(data){       
       
        const producto = await productRepository.addProduct(data);
        return producto;
       
    }

    async getProductsLimit(plimit){       

        const productos = await productRepository.productRepository(plimit);
        return productos;
    }
    
    async getProducts(){      

        const productos = await productRepository.getProducts();
        return productos;
    }

    async getProducts(pLimit,pPage,pSort,pQuery){  
        
        //se crean variables para mandarlas a los link de paginas anteriores o siguientes con servarndo el sort o el query inicial, 
        //para que no se pierdan en el camino       

        if(!pLimit){
            pLimit = 10;
        }
        if(!pPage){
            pPage = 1;
        }

        const param = {
            limit:pLimit,
            page:pPage,
            lean:true,
        };
        if(pSort != undefined && pSort!= "undefined"){
            param.sort= {price:pSort};
        }
        let query = {}
        if(pQuery!= undefined && pQuery!= "undefined"){
            query =  JSON.parse('{'+pQuery+'}');
        }
       
        const result =await productRepository.getProducts(query,param,pLimit,pSort,pQuery);
        
        return result;
    }

    async getProductById(pid){      

        const products = await productRepository.getProductById(pid);
        return products;
    }

    validarDatos(data){
        const {title,description,code,price,status,stock,category} = data;
        if (!title || !description || !code || !price || status == undefined || !stock || !category ) {           
            return false;
        }
        return true;
    }

    async updateProductById(uid,data) {
        await productRepository.updateProductById(uid,data);         
        const product = await this.getProductById(uid);
        return product;
    }
    
    async deleteProduct(did) {
        const relust = await productRepository.deleteProduct(did);
        return relust;
    }
}


