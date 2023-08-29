const express = require('express');
const ProductManager =  require("./ProductManager.js");
const productManager =  new ProductManager();
const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products',async (req,res) =>{
    try{
        const limit = req.query.limit;    
        const productos =  await productManager.getProductsLimit(limit);
        res.send(productos);
    }catch(e){
        res.status(500).send();
    }
});

app.get('/products/:pid',async (req,res) =>{
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

app.listen(puerto,()=>{console.log(`server levantado en el puerto ${puerto}`)});
