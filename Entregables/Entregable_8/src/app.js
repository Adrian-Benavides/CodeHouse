import express from 'express';
import handlebars from  'express-handlebars'
import mongoose from "mongoose";
import {Server} from 'socket.io';
import viewsRouter from './router/viewsRouter.js';
import productRouter from './router/productRouter.js';
import cartRouter from './router/cartRouter.js';
import realtimerouter from './router/realTimeRouter.js';
import chatrouter from './router/chatRouter.js';
import chatSocket from './socket/chatSocket.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import sessionRouter from './router/sessionRouter.js';

const app = express()
const httpServer = app.listen(8080, () => console.log('levantado'));
const socketServer = new Server(httpServer);

mongoose.connect('mongodb+srv://adbenavidesdiaz:Wi9vA1SEOeOvN54k@cluster0.puhmbkn.mongodb.net/?retryWrites=true&w=majority');

app.engine('handlebars',handlebars.engine());
app.set('views','./src/views');
app.set('view engine', 'handlebars');

app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
          'mongodb+srv://adbenavidesdiaz:Wi9vA1SEOeOvN54k@cluster0.puhmbkn.mongodb.net/?retryWrites=true&w=majority',
        ttl: 120,
      }),
      secret: 's3$foaQF1.-Q)/(',
      resave: false,
      saveUninitialized: false,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use((req,res,next)=>{
    req.context = {socketServer};
    next();
});


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/realtimeproducts', realtimerouter);
app.use('/', chatrouter);
app.use('/api', sessionRouter);


socketServer.on('connection', (socket) => {
    console.log('cliente conectado');    
});

chatSocket(socketServer);