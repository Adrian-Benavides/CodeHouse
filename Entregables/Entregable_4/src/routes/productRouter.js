import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager();

const router = Router();

router.get('/',async (req,res) =>{
    try{
        const limit = req.query.limit;    
        const productos =  await productManager.getProductsLimit(limit);
        res.send(productos);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.get('/:pid',async (req,res) =>{
    try{
        const id = parseInt(req.params.pid, 10);   
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
        const title = req.body.title; 
        const description = req.body.description; 
        const code = req.body.code; 
        const price = parseInt(req.body.price, 10);
        const status = req.body.status; 
        const stock = parseInt(req.body.stock, 10); 
        const category = req.body.category; 
        const thumbnails = req.body.thumbnails;
        if(productManager.validarDatos(title,description,code,price,stock,category)){
            res.status(400).send({Error : 'Todos los valores del producto tienen que ser enviados. a excepcion de thumbnails'});
        }
        const fueAgregado =  await productManager.addPoductArray(title,description,code,price,status,stock,category,thumbnails); 
        if(!fueAgregado){
            res.status(400).send({Error : 'No se pudo agregar el producto'});
        }
        res.send()
    }catch(e){
        //console.log(e);
        res.status(500).send();
    }
});

router.put('/:pid',async (req,res) =>{
    try{ 
        const id = parseInt(req.params.pid, 10);
        const title = req.body.title; 
        const description = req.body.description; 
        const code = req.body.code; 
        let price = parseInt(req.body.price, 10);
        const status = req.body.status; 
        let stock = parseInt(req.body.stock, 10);
        const category = req.body.category; 
        const thumbnails = req.body.thumbnails;
        const fueActualizado =  await productManager.updateProductById(id,title,description,code,price,status,stock,category,thumbnails); 
        if(!fueActualizado){
            res.status(400).send({Error : 'No se pudo agregar el producto'});
        }
        res.send()
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});


router.delete('/:pid',async (req,res) =>{
    try{
        const id = parseInt(req.params.pid, 10);   
        const fueEliminado =  await productManager.deleteProduct(id);
        if(!fueEliminado){
            res.status(400).send({Error : `No existe el producto de id: ${id}`});
        }
        res.send()
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

export default router;