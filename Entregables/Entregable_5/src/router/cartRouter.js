import { Router } from 'express';
import CartManager from '../manager/CartManager.js';

const cartManager = new CartManager();

const router = Router();

router.post('/',async (req,res) =>{
    try{ 
        cartManager.addCart();
        res.send();
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});
router.post('/:cid/product/:pid',async (req,res) =>{
    try{ 
        const cid = parseInt(req.params.cid, 10);        
        const pid = parseInt(req.params.pid, 10);
        const resp = await cartManager.addProductIntoCart(cid,pid);
        switch (resp) {
            case -1:
                res.status(400).send({Error:`el carro id: ${cid}, no existe`});                
                break;
            case -2:
                res.status(400).send({Error:`el producto id: ${pid}, no existe`});                
                break;
            default:
                res.send();
                break;
        }
        
    }catch(e){
        
        res.status(500).send();
    }
});
router.get('/:cid',async (req,res) =>{
    try{ 
        
        const id = parseInt(req.params.cid, 10);
        const carrito = await cartManager.getCartProductsById(id);
        res.send(carrito);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

export default router;