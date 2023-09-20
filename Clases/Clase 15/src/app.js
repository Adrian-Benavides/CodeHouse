import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import viewsRouter from "../src/routers/views.router.js";
import autosRouter from "../src/routers/autos.router.js";

mongoose.connect('mongodb+srv://adbenavidesdiaz:Wi9vA1SEOeOvN54k@cluster0.puhmbkn.mongodb.net/?retryWrites=true&w=majority');

const app  = express();
const httpServer = app.listen(8080,() => console.log('tuki'));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use('/static',express.static('./public'));
app.use(viewsRouter);
app.use('/autos', autosRouter);