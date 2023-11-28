import { Router } from 'express';
import {logger} from '../utils/logger.js'
const router = Router();

router.get('/loggerTest',async (req,res) =>{
    try{
        logger.info('mensaje de info');
        logger.warn('mensaje de warn');
        logger.debug('mensaje de debug');
        logger.http('mensaje de http');
        res.send();
    }catch(e){        
        res.status(500).send();
    }
});

export default router;