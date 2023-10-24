import { json, query } from "express";
import { productoModel } from "../models/producto.model.js";

export default class ProductManager{
   
    async addPoduct(data){
       
        const {title,description,code,price,status,stock,category,thumbnails} = data;
        const producto = await productoModel.create({
            title,description,code,price,status,stock,category,thumbnails
        });
        return producto;
       
    }

    async getProductsLimit(plimit){       

        const productos = await productoModel.paginate({},{limit:plimit,lean:true});
        return productos;
    }
    
    async getProducts(){      

        const productos = await productoModel.paginate().lean();
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
       
        const products = await productoModel.paginate(query,param);

       
        const result = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage?  `http://localhost:8080/products?limit=${pLimit}&page=${ products.prevPage}&sort=${pSort}&query=${pQuery}` : null,
            nextLink: products.hasNextPage?  `http://localhost:8080/products?limit=${pLimit}&page=${ products.nextPage}&sort=${pSort}&query=${pQuery}` : null,

        }
        
        return result;
    }

    async getProductById(pid){      

        const productos = await productoModel.paginate( { _id: pid }).lean();
        return productos;
    }

    validarDatos(data){
        const {title,description,code,price,status,stock,category} = data;
        if (!title || !description || !code || !price || status == undefined || !stock || !category ) {           
            return false;
        }
        return true;
    }

    async updateProductById(uid,data) {
        const relust = await productoModel.updateOne(
            { _id: uid },
            data
        ); 
        const product = await this.getProductById(uid);
        return product;
    }
    
    async deleteProduct(did) {
        const relust = await productoModel.deleteOne({ _id: did });
        return relust;
    }
}


