import { Router } from 'express';
//import MessageManager from '../dao/db/ChatManager.js';
//const messageManager = new MessageManager();

const router = Router();

router.get('/chat', (req, res) => res.render('chat', {}));


export default router;