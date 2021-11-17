import { Router, Request, Response, NextFunction } from 'express';
import { GetUserByID } from '../types';
import db from '../db/db';

// create the router
const userRouter = Router();

// setup user id params
userRouter.param('userID', async (req: GetUserByID, res: Response, next: NextFunction, id: number) => {
    const query = await db.selectUserByID(id);
    if (!query) {
        res.status(404).send('User not found');
        return;
    }

    req.user = query;
    next();
})

//select all users
userRouter.get('/', async (_: Request, res: Response) => {
    const query = await db.getAllProducts();
    res.status(200).send(query)
})

//select user by id
userRouter.get('/:userID', (req: GetUserByID, res: Response) => {
    res.status(200).send(req.user)
})

//update user information
userRouter.put('/:userID', async (req: GetUserByID, res: Response) => {
    //checked if exists in parameters
    await db.updateUser(req.body.id, req.body.firstName, req.body.lastName, req.body.password, req.body.email)
    res.status(204).send('user updated')
})

export default userRouter;