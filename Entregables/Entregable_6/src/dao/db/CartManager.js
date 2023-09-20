import { cartsModel } from "../models/cart.model.js";
import { productoModel } from "../models/producto.model.js";

export default class CartManager{

    async addCart() {      
       
        const carrito = await cartsModel.create({});
        return carrito;       
    }
   
    async getCartProductsById(id){
        const carrito = await cartsModel.find({_id : id}).lean();
        return carrito; 
    }

    async addProductIntoCart(idc,idp){
        try{
            const carrito = await this.getCartProductsById(idc); 
            
            if(carrito.length === 0){
                return -1;
            }
            const producto = await productoModel.find({_id : idp}).lean();
            if(producto.length === 0){
                return -2;
            }
            
            const {products} = carrito[0];

            let detalleProducto = products.filter((producto)=> {
                if(producto.id === idp){
                    producto.quantity++;
                    return producto;
                }
            });
            if(!detalleProducto.length){
                detalleProducto =
                    {id: idp, quantity: 1 }
                    products.push(detalleProducto);
            }

            await cartsModel.updateOne(
                { _id: idc },
                {products}
            ); 
            
            const result = await this.getCartProductsById(idc); 
           
            return result;
        }catch(e){
            console.log(e);
            return 0;
        }
    }
}


