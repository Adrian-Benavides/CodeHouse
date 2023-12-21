import { Router } from 'express';
import UserManager from '../dao/db/UserManager.js'
import isPremium from '../middlewares/isPremium.js';

const sessionRouter = Router();
const userManager = new UserManager();


sessionRouter.put('/premium/:id', async (req, res) =>{ 
    const id = req.params.id;
    const resp = await userManager.updateUserPremiumRoleById(id);
    res.send(resp);
});

export default sessionRouter;
