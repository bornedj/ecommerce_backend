//imports
import { Router, Request, Response} from 'express';
import db from '../db/db';

// create router
const loginRouter = Router();

//create responses
loginRouter.post('/', async (req: Request, res: Response) => {
    const flag = await db.loginUser(req.body.email, req.body.password);
    // user logged in
    if (flag) {
        res.status(200).send('User Logged in');
    } else {
        res.status(401).send('Login invalid');
    }
})

export default loginRouter;