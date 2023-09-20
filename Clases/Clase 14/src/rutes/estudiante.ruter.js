import { Router } from "express";
import { estudianteModel } from "../models/estudiante.model.js";

const router = Router();

router.get('/', async (req, res)=>{
   
    const result = await estudianteModel.find();
    res.send(result);
});

router.post('/', async (req, res)=>{
    const {nombre, apellido,edad,dni,curso,nota} = req.body;
    
    if(!nombre || !apellido || !edad || !dni || !curso || !nota){
        res.status(400).send();
    }

    const result = await estudianteModel.create({
        nombre,apellido,edad,dni,curso,nota
    });
    res.send(result);
})


router.delete('/:uid', async (req, res)=>{
    const {uid} = req.params;

    if(!uid){
        res.status(400).send();
    }
    const result  = await estudianteModel.deleteOne({ _id : uid });
    res.send(result);
})

router.put('/:uid', async (req, res)=>{
    const {uid} = req.params;
    const {nombre, apellido,edad,dni,curso,nota} = req.body;    

    const result  = await estudianteModel.updateOne({ _id : uid },{nombre, apellido,edad,dni,curso,nota});
    res.send(result);
})

export default router;
