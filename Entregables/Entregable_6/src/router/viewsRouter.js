import { Router } from 'express';
import ProductManager from '../dao/db/ProductManager.js';
const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) =>{
    const products = await productManager.getProducts();
    res.render('home', {products});
});

export default router;