import { Router } from 'express';
import ProductManager from '../dao/db/ProductManager.js';
import UsuarioManager from '../dao/db/UserManager.js';
import CartManager from '../dao/db/CartManager.js';
import isLogged from '../middlewares/isLogged.js';
import isNotLogged from '../middlewares/isNotLogged.js';
import EmailService from "../service/mail.service.js";
import isAdminGlobal from '../middlewares/isAdmingGlobal.js';
import jwt from 'jsonwebtoken';

const emailService =  new EmailService();

const cartManager = new CartManager();
const productManager = new ProductManager();
const usuariosManager = new UsuarioManager();


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

    let cartId = req.session.cart;
/* 
    if(cartId == undefined || cartId == 'undefined') {
        cartId = await cartManager.addCart();
        cartId = cartId._id;
    } */


    const products = await productManager.getProducts(limit,page,sort,query);
    const { first_name, last_name,role} = req.session;
    let isUser = false;
    if(role === 'user'){
        isUser = true;
    }
    res.render('listaProductos', {products,cartId,first_name, last_name,role,isUser});
});


router.get('/users',isNotLogged,isAdminGlobal, async (req, res) =>{



    const usuarios = await usuariosManager.getAllUsers();
    const {first_name,last_name} = req.session;
    
    res.render('listaUsuarios', {usuarios,first_name,last_name});
});


router.get('/cart/:cid', async (req, res) =>{
    const cid = req.params.cid; 
    const response = await cartManager.getCartPopulateById(cid);

    const cart = {
        _id : response[0]._id,
        products : response[0].products
    };
    res.render('carrito', {cart});
});


router.get('/login',isLogged, (req, res) => {
    res.render('login');
});

router.get('/signup',isLogged, (req, res) => {
    res.render('signup');
});
router.get('/RecuperarPass',isLogged, (req, res) => {
    res.render('RecuperarPass');
});

router.get('/RestablecerPass',isLogged, async (req, res) => {
   const token = cookieExtractor(req);

   const decoded = jwt.verify(token, '4Np)=advb(85/Bb!+');
    const email = decoded.email; 
   const text = ``;
   const html = `<a href="http://localhost:8080/recuperarPassByEmail/${token}">Restableces contraseña</a>`;
   const title = 'Restablecer password';
   await emailService.sendEmail(email,title,text,html);
    res.render('login');
});


router.get('/recuperarPassByEmail/:token',isLogged, (req, res) => {
    const token = req.params.token;
     const error =  false;
     res.render('restablecerPass', {token,error});
 });

const cookieExtractor = (req) => {

    const cookieHeader = req.headers.cookie;

    // Verificar si existe el encabezado 'Cookie'
    if (cookieHeader) {
      // Dividir el encabezado 'Cookie' en partes
      const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
  
      // Buscar la cookie 'token'
      const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  
      // Extraer el valor de la cookie 'token'
      const tokenValue = tokenCookie ? tokenCookie.split('=')[1] : null;
      return tokenValue;
    }
    return null;

};




export default router;