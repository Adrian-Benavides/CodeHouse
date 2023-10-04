import { Router } from 'express';
import { userModel } from '../dao/models/user.model.js';
import isLogged from '../middlewares/isLogged.js';

const sessionRouter = Router();

sessionRouter.post('/login',isLogged, async (req, res) => {
  
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password }).lean();
 
  if (!user) {
    return res.redirect('/login');
  }
  
  req.session.rol ='usuario';    
  if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123') {
      req.session.rol = 'admin';
  }
  req.session.first_name = user.first_name;
  req.session.last_name = user.last_name;
  req.session.email = user.email;
  req.session.isLogged = true;

  res.redirect('/products');
});

sessionRouter.post('/signup',isLogged, async (req, res) => {
  const { first_name,last_name, email,age, password } = req.body;
  const exist = await userModel.findOne({ email }).lean();
  if(exist){
    return res.send('Ya esta registrado el usuario');
  }
  await userModel.create({first_name,last_name, email,age, password });

  req.session.isLogged = false;

  res.redirect('/login');
});

sessionRouter.get('/logout', async (req, res) => {
  console.log('salir');
  req.session.destroy();
  res.redirect('/login');
});

export default sessionRouter;
