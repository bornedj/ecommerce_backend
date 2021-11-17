import { doesNotMatch } from 'assert';
import { Router, Request, Response } from 'express';
import db from '../db/db';

// create the router
const userRouter = Router();

//select all users
userRouter.get('/', async (_: Request, res: Response) => {
    const query = await db.getAllProducts();
    res.status(200).send(query)
})


export default userRouter;