import { productoModel } from "../models/producto.model.js";

export default class ProductManager{
   
    async addPoduct(data){
       
        const {title,description,code,price,status,stock,category,thumbnails} = data;
        const producto = await productoModel.create({
            title,description,code,price,status,stock,category,thumbnails
        });
        return producto;
       
    }

    async getProductsLimit(limit){       

        const productos = await productoModel.find().limit(limit).lean();
        return productos;
    }
    
    async getProducts(){      

        const productos = await productoModel.find().lean();
        return productos;
    }
    async getProductById(pid){      

        const productos = await productoModel.find( { _id: pid }).lean();
        return productos;
    }

    validarDatos(data){
        const {title,description,code,price,status,stock,category} = data;
        console.log(data);
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


