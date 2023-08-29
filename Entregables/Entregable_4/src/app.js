
import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
//const ProductManager =  require("./ProductManager.js");
//const productManager =  new ProductManager();
const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(puerto,()=>{console.log(`server levantado en el puerto ${puerto}`)});
