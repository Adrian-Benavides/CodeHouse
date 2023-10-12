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
    async getCartPopulateById(id){
        const cart = await cartsModel.find({_id : id}).populate('products.product').lean();
        return cart;
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

                if(producto.product.toString() === idp){
                    producto.quantity++;
                    return producto;
                }
            });
            if(!detalleProducto.length){
                detalleProducto = {product: idp, quantity: 1 }
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

    async deleteProductByCart(idCart,idProduct){

        const cart = await this.getCartProductsById(idCart);
        const newProducts = cart[0].products.filter((prod) => prod.product.toString() != idProduct);
        
        const respCart = await cartsModel.updateOne({_id : idCart},{products:newProducts}).lean();
        return respCart; 
    }

    async deleteAllProductByCart(idCart){

        const respCart = await cartsModel.updateOne({_id : idCart},{products:[]}).lean();
        return respCart; 
    }

    async updateProductsByCart(idCart,data){

        const respCart = await cartsModel.updateOne({_id : idCart},{products:data}).lean();
        return respCart; 
    }

    async updateQuantityProductsByCart(idCart,idProduct,data){

        const cart = await this.getCartProductsById(idCart);
        const newProducts = cart[0].products.filter((product) => {
            if(product._id.toString() === idProduct){
                product.quantity = data;
            }
            return product;
        });
        
        const respCart = await cartsModel.updateOne({_id : idCart},{products:newProducts}).lean();
        return respCart; 
    }
}


