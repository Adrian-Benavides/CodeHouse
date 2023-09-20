import express from "express";
//import usersRouter from "./rutes/users.ruter.js";
import estudianteRouter from "./rutes/estudiante.ruter.js";
import mongoose from "mongoose";

const app  = express();
const httpServer  = app.listen(8080,() => console.log('tuki'));

mongoose.connect('mongodb+srv://adbenavidesdiaz:Wi9vA1SEOeOvN54k@cluster0.puhmbkn.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//app.use('/users',usersRouter);
app.use('/estudiante',estudianteRouter);