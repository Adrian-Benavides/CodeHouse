import express from 'express';
import handlebars from  'express-handlebars'
import {Server} from 'socket.io';
import chatSocket from './socket/chatSocket.js';
import config from './config/config.js';
import router from './router/appRouter.js'
import Conection from './dao/connect/conection.js';

const app = express()
const httpServer = app.listen(config.port, () => console.log('levantado'));
const socketServer = new Server(httpServer);

const conection = new Conection();

app.engine('handlebars',handlebars.engine());
app.set('views','./src/views');
app.set('view engine', 'handlebars');

app.use(
  conection.sessionMongo()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use((req,res,next)=>{
    req.context = {socketServer};
    next();
});


app.use(router);


socketServer.on('connection', (socket) => {
    console.log('cliente conectado');    
});

chatSocket(socketServer);

