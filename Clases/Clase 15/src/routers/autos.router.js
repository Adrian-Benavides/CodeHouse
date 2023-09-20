import { Router } from "express";
import {uploader} from  "../middleware/multer.js";
import AutosManager from "../dao/db/AutosManager.js";

const router = Router();
const autosManager = new AutosManager();


router.post('/',uploader.single('file'), async (req, res) =>{
    const { name ,brand,year} = req.body;
    const image = req.file.originalname;
    const auto = await autosManager.create( name ,brand,year, image); 
    res.send(auto);
});

export default router;