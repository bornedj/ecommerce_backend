import {Router, Response, Request, NextFunction} from 'express';
import db from '../db/db';
import { GetProductByID } from '../types'; 

// creating router
const productsRouter = Router();

//productID parameter
productsRouter.param('productID', async (req: GetProductByID, res: Response, next: NextFunction, id: number) => {
    const query = await db.getProductByID(id);//query database for product with id
    if (!query) {
        res.status(404).send('Product not found');   
    }

    req.product = query;
    next();
})

//get all product route
productsRouter.get('/', (_: Request, res: Response) => {
    res.send(db.getAllProducts());
})

//get product by ID
productsRouter.get('/:productID', (req: GetProductByID, res: Response) => {
    res.send(req.product);
})

export default productsRouter;