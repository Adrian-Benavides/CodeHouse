import express from 'express';
import handlebars from  'express-handlebars'
import viewsRouter from './viewsRouter.js';
import productRouter from './productRouter.js';
import cartRouter from './cartRouter.js';
import realtimerouter from './realTimeRouter.js';
import chatrouter from './chatRouter.js';
import sessionRouter from './sessionRouter.js';
import initializePassport from '../config/passport.config.js';
import passport from 'passport';

const router = express()

router.engine('handlebars',handlebars.engine());
router.set('views','./src/views');
router.set('view engine', 'handlebars');

router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
router.use('/', viewsRouter);
router.use('/realtimeproducts', realtimerouter);
router.use('/', chatrouter);
router.use('/api/session', sessionRouter);

initializePassport();
router.use(passport.initialize());
router.use(passport.session());

export default router;