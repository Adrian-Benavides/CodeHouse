import { Router } from 'express';
import ProductManager from '../dao/db/ProductManager.js';
import CartManager from '../dao/db/CartManager.js';
const cartManager = new CartManager();
const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) =>{
    const products = await productManager.getProducts();
    res.render('home', {products});
});


router.get('/products', async (req, res) =>{


    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const sort = req.query.sort;
    const query = req.query.query;

    let cartId = req.query.cartId;

    if(cartId == undefined || cartId == 'undefined') {
        cartId = await cartManager.addCart();
        cartId = cartId._id;
    }


    const products = await productManager.getProducts(limit,page,sort,query);
    res.render('listaProductos', {products,cartId});
});


router.get('/cart/:cid', async (req, res) =>{


    const cid = req.params.cid; 
    const response = await cartManager.getCartPopulateById(cid);
    const cart = response[0].products;
    res.render('carrito', {cart});
});



export default router;