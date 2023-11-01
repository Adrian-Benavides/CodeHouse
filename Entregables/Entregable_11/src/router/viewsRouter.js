import { Router } from 'express';
import ProductManager from '../dao/db/ProductManager.js';
import CartManager from '../dao/db/CartManager.js';
import isLogged from '../middlewares/isLogged.js';
import isNotLogged from '../middlewares/isNotLogged.js';

const cartManager = new CartManager();
const productManager = new ProductManager();


const router = Router();

router.get('/', async (req, res) =>{
    const products = await productManager.getProducts();
    res.render('home', {products});
});


router.get('/products',isNotLogged, async (req, res) =>{

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
    const { first_name, last_name,role} = req.session;
    res.render('listaProductos', {products,cartId,first_name, last_name,role});
});


router.get('/cart/:cid', async (req, res) =>{
    const cid = req.params.cid; 
    const response = await cartManager.getCartPopulateById(cid);
    const cart = response[0].products;
    res.render('carrito', {cart});
});


router.get('/login',isLogged, (req, res) => {
    res.render('login');
});

router.get('/signup',isLogged, (req, res) => {
    res.render('signup');
});

export default router;