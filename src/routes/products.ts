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

//create new product
productsRouter.post('/', async (req: Request, res: Response) => {
    await db.insertProduct(req.body.name, req.body.price, req.body.description)
    res.status(201).send('New product created');
})

//update a product
productsRouter.put('/:productID', async (req: GetProductByID, res: Response) => {
    // if there is a product update it and update the database
    if (req.product) {
        await db.updateProduct(req.body.id, req.body.name, req.body.price, req.body.description);
        res.status(204).send('Product updated');
    }
})

// delete a product
productsRouter.delete('/:productID', async (req: GetProductByID, res: Response) => {
    if (req.product) {
        await db.deleteProduct(req.product.id)
        res.status(202).send('Product Deleted');
    }

})

export default productsRouter;