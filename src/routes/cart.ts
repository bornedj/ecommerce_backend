import { Router, Request, Response, NextFunction } from 'express';
import db from '../db/db';
import { GetCartByID } from 'src/types';

// create the router
const cartRouter = Router(); 

// cart params
cartRouter.param('cartID', async (req: GetCartByID, res: Response, next: NextFunction, id: number) => {
    const query = await db.getCartByID(id);
    if (!query) {
        res.status(404).send('Cart not found');
        return;
    }
    req.cart = query;
    next();
})

//create a cart
cartRouter.post('/', async (_: Request, res: Response) => {
    await db.insertCart();
    res.status(200).send("Cart Created");
});

// get all carts
cartRouter.get('/', async (_: Request, res: Response) => {
    const query = await db.getAllCarts();
    res.status(200).send(query);
    return;
})

cartRouter.get('/:cartID', (req: GetCartByID, res: Response) => {
    res.status(200).send(req.cart)
})

export default cartRouter;