import { Router } from 'express';
//import ProductManager from '../manager/ProductManager.js';
import ProductManager from '../dao/db/ProductManager.js';
import isAdmin from '../middlewares/isAdmin.js';



const productManager = new ProductManager();

const router = Router();




router.get('/limit/:limit?/page/:page?/sort/:sort?/query/:query?',async (req,res,next) =>{
    try{
        const limit = req.params.limit;
        const page = req.params.page;
        const sort = req.params.sort;
        const query = req.params.query;
        const productos =  await productManager.getProducts(limit,page,sort,query);
        res.send(productos);
    }catch(e){        
        next(e);
    }
});

router.get('/:pid',async (req,res,next) =>{
    try{
        const id = req.params.pid;   
        const producto =  await productManager.getProductById(id);
        if(!producto.length){
            res.send({Error : `No existe el producto de id: ${id}`});
        }
        res.send(producto);
    }catch(e){
        next(e);
    }
});

router.post('/',isAdmin, async (req,res,next) =>{
    try{
        productManager.validarDatos(req.body);

       await productManager.addPoduct(req.body);

        const lista =  await productManager.getProducts();
        req.context.socketServer.emit('actualizarLista',lista);
        res.send()
    }catch(e){
        next(e);
    }
    
});

router.put('/:pid',isAdmin,async (req,res,next) =>{
    try{ 
        const id = req.params.pid;
        const producto =  await productManager.updateProductById(id,req.body); 
        if(!producto){
            res.status(400).send({Error : 'No se pudo agregar el producto'});
        }
        res.send(producto);
    }catch(e){
        next(e);
    }
});


router.delete('/:pid',isAdmin,async (req,res,next) =>{
    try{
        const id = req.params.pid; 
        const fueEliminado =  await productManager.deleteProduct(id);
        if(!fueEliminado){
            res.status(400).send({Error : `No existe el producto de id: ${id}`});
        }
        const lista =  await productManager.getProducts();
        req.context.socketServer.emit('actualizarLista',lista);
        res.send()
    }catch(e){
        next(e);
    }
});

export default router;