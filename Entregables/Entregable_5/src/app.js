import express from 'express';
import handlebars from  'express-handlebars'
import {Server} from 'socket.io';
import viewsRouter from './router/viewsRouter.js';
import productRouter from './router/productRouter.js';
import cartRouter from './router/cartRouter.js';
import realtimerouter from './router/realTimeRouter.js';

const app = express()
const httpServer = app.listen(8080, () => console.log('levantado'));
const socketServer = new Server(httpServer);



app.engine('handlebars',handlebars.engine());
app.set('views','./src/views');
app.set('view engine', 'handlebars');


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


socketServer.on('connection', (socket) => {
    console.log('cliente conectado');    
});