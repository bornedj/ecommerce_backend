// imports
import db from '../db/db'; 
import { Router, Response, Request } from 'express';
const registerRouter = Router();

registerRouter.post('/', async (req: Request, res: Response) => {
    const query = await db.doesUserExist(req.body.email);// searching for user currently in database

    if (query) {
        res.status(200).send('User already exists')
    } else {
        await db.insertUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.status(201).send('New User Created');
    }

})

export default registerRouter;
// module.exports = registerRouter;// exporting the router