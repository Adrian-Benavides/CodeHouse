import { Router } from 'express';
import { userModel } from '../dao/models/user.model.js';
import isLogged from '../middlewares/isLogged.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const sessionRouter = Router();

sessionRouter.post('/login',isLogged,
  passport.authenticate('login', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.role = req.user.role;
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

sessionRouter.get(
  '/currentjwt',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

sessionRouter.get(
  '/current',
  (req, res) => {
    console.log(req.session);
    res.send(req.session);
  }
);

sessionRouter.get('/loginjwt', 
  async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email});
    
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { first_name: user.first_name, mail: user.email },
          '4Np)=advb(85/Bb!+',
        {
          expiresIn: '24h',
        }
      );
      res
        .cookie('token', token, {
          maxAge: 100000,
          httpOnly: true,
        })
        .send('Logeado');
    }else{
      res.send('no logeado');
    }
});

sessionRouter.get('/cookies', (req, res) =>{ 
  console.log(req.cookies);
  res.send(req.cookies)
});

export default sessionRouter;
