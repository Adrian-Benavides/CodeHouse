import { Router } from 'express';
//import CartManager from '../dao/FileSystem/CartManager.js';
import CartManager from '../dao/db/CartManager.js';
import isUser from '../middlewares/isUser.js';

const cartManager = new CartManager();

const router = Router();

router.post('/',async (req,res) =>{
    try{ 
        const cart = await cartManager.addCart();
        res.send(cart);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.post('/:cid/product/:pid',isUser,async (req,res) =>{
    try{ 
        const cid = req.params.cid;        
        const pid =req.params.pid;
        const resp = await cartManager.addProductIntoCart(cid,pid);
        switch (resp) {
            case -1:
                res.status(400).send({Error:`el carro id: ${cid}, no existe`});                
                break;
            case -2:
                res.status(400).send({Error:`el producto id: ${pid}, no existe`});                
                break;
            default:
                res.send(resp);
                break;
        }
        
    }catch(e){
        
        res.status(500).send();
    }
});

router.get('/:cid',isUser,async (req,res) =>{
    try{ 
        
        const id = req.params.cid;
        const carrito = await cartManager.getCartPopulateById(id);
        res.send(carrito);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.delete('/:cid/product/:pid',async (req,res) =>{
    try{ 
        
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const cart = await cartManager.deleteProductByCart(idCart,idProduct);
        res.send(cart);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.delete('/:cid',async (req,res) =>{
    try{ 
        
        const idCart = req.params.cid;
        const cart = await cartManager.deleteAllProductByCart(idCart);
        res.send(cart);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/:cid',async (req,res) =>{
    try{ 
        
        const idCart = req.params.cid;
        const data = req.body.products
        const cart = await cartManager.updateProductsByCart(idCart,data);
        res.send(cart);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/:cid/product/:pid',async (req,res) =>{
    try{ 
        
        const idCart = req.params.cid;        
        const idProduct = req.params.pid;
        const data = req.body.quantity;
        const cart = await cartManager.updateQuantityProductsByCart(idCart,idProduct,data);
        res.send(cart);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/:cid/purchase',isUser,async (req,res) =>{
    try{ 
        
        const idCart = req.params.cid;
        const emailSend = req.session.email;
        const cart = await cartManager.purchaseCart(idCart,emailSend);
        res.send(cart);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

export default router;