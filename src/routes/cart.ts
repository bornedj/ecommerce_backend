import { Router, Request, Response, NextFunction } from 'express';
import db from '../db/db';
import { GetCartByID, ProductID } from '../types';
import cartItemRouter from './cartItem';

// create the router
const cartRouter = Router(); 
// router for handling cart items
cartRouter.use('/cartItem', cartItemRouter);

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

// get cart by id
// cartRouter.get('/:cartID', (req: GetCartByID, res: Response) => {
//     res.status(200).send(req.cart)
// })

// get all cart items
cartRouter.get('/:cartID', async (req: GetCartByID, res: Response) => {
    if (req && req.cart && req.cart.id) {
        const cartItems = await db.getAllCartItems(req.cart.id) 
        if (!cartItems) {
            res.status(404).send('No Cart Found');
            return;
        }
        res.status(200).send(cartItems);
        return;
    }
})

// update a cart
cartRouter.put('/:cartID', async (req: GetCartByID, res: Response) => {
    if (req && req.cart && req.cart.id) {
        await db.updateCart(req.cart.id);
        res.status(200).send(req.cart);
        return req.cart;
    }
    return 'something went wrong update';
})

// delete cart
cartRouter.delete('/:cartID', async (req: GetCartByID, res: Response) => {
    if (req && req.cart && req.cart.id) {
        await db.deleteCart(req.cart.id);
        res.status(202).send('Cart deleted');
        return;
    }
    return 'something went wrong';
})

// checkout user
cartRouter.post('/:cartID/checkout', async (req: GetCartByID, res: Response) => {
    if (req && req.cart && req.cart.id) {
        // if there's a cart, get all of its product ids array structured [{productID: number}]
        const productIDs: Array<ProductID>  = await db.getAllCartItems(req.cart.id)
        const counts: {[index: number]:number} = {};// will keep track of counts for orderItem creation
        // counting the number of repeat items for the order items
        productIDs.forEach((productID: ProductID) => {
            counts[productID.productID] = (counts[productID.productID] || 0) + 1;
        })

        res.send(productIDs)
    }
})

export default cartRouter;