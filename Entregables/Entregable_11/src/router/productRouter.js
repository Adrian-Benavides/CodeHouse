import { Router } from 'express';
//import ProductManager from '../manager/ProductManager.js';
import ProductManager from '../dao/db/ProductManager.js';

const productManager = new ProductManager();

const router = Router();




router.get('/limit/:limit?/page/:page?/sort/:sort?/query/:query?',async (req,res) =>{
    try{
        const limit = req.params.limit;
        const page = req.params.page;
        const sort = req.params.sort;
        const query = req.params.query;
        const productos =  await productManager.getProducts(limit,page,sort,query);
        res.send(productos);
    }catch(e){        
        res.status(500).send();
    }
});

router.get('/:pid',async (req,res) =>{
    try{
        const id = req.params.pid;   
        const producto =  await productManager.getProductById(id);
        if(!producto.length){
            res.send({Error : `No existe el producto de id: ${id}`});
        }
        res.send(producto);
    }catch(e){
        res.status(500).send();
    }
});

router.post('/',async (req,res) =>{
    try{ 
        const validado = productManager.validarDatos(req.body);
        if (!validado){
            res.status(400).send({Error : 'Todos los valores del producto tienen que ser enviados. a excepcion de thumbnails'});
        }
        const product =  await productManager.addPoduct(req.body);
        if(!product){
            res.status(400).send({Error : 'No se pudo agregar el producto'});
        }
        const lista =  await productManager.getProducts();
        req.context.socketServer.emit('actualizarLista',lista);
        res.send()
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.put('/:pid',async (req,res) =>{
    try{ 
        const id = req.params.pid;
        const producto =  await productManager.updateProductById(id,req.body); 
        if(!producto){
            res.status(400).send({Error : 'No se pudo agregar el producto'});
        }
        res.send(producto);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});


router.delete('/:pid',async (req,res) =>{
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
        console.log(e);
        res.status(500).send();
    }
});

export default router;