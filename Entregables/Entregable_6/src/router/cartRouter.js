import { Router } from 'express';
//import CartManager from '../dao/FileSystem/CartManager.js';
import CartManager from '../dao/db/CartManager.js';

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
router.post('/:cid/product/:pid',async (req,res) =>{
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
router.get('/:cid',async (req,res) =>{
    try{ 
        
        const id = req.params.cid;
        const carrito = await cartManager.getCartProductsById(id);
        res.send(carrito);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

export default router;