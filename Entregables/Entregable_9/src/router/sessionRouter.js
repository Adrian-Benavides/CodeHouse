import { Router } from 'express';
import { userModel } from '../dao/models/user.model.js';
import isLogged from '../middlewares/isLogged.js';
import passport from 'passport';

const sessionRouter = Router();

sessionRouter.post('/login',isLogged,
  passport.authenticate('login', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.rol = req.user.rol;
    req.session.isLogged = true;

    res.redirect('/products');
});


sessionRouter.post('/signup',isLogged,
  passport.authenticate('register', { failureRedirect: '/signup' }),
  async (req, res) => {
    res.redirect('/login');
  }
);

sessionRouter.get('/logout', async (req, res) => {
  console.log('salir');
  req.session.destroy();
  res.redirect('/login');
});


sessionRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

sessionRouter.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    req.session.user = req.user;    
    req.session.isLogged = true;
    res.redirect('/products');
  }
);
export default sessionRouter;
