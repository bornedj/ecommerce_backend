import { Router, Request, Response, NextFunction } from "express";
import { GetCartItemByID } from "src/types";
import db from "../db/db";

// create the router
const cartItemRouter = Router();

// setup params
cartItemRouter.param('cartItemID', async (req: GetCartItemByID, res: Response, next: NextFunction, id: number) => {
    const cartItem = await db.getCartItemById(id);
    if (!cartItem) {
        res.status(404).send('Cart Item not found');
    }
    req.cartItem = cartItem;
    next();
})

// CRUD
// create cart items
cartItemRouter.post('/', async (req: Request, res: Response) => {
    // query for a product to make sure it exists
    const product = await db.getProductByID(req.body.productID)
    if (!product) {
        res.status(404).send('Product not found')
        return;
    }
    // query for a cart to make sure it exists
    const cart = await db.getCartByID(req.body.cartID);
    if (!cart) {
        res.status(404).send('Cart not found')
        return;
    }
    await db.insertCartItem(product.id, cart.id);
    res.status(200).send("Cart Item added")
})

// get specific cart item
cartItemRouter.get('/:cartItemID', async (req: GetCartItemByID, res: Response) => {
    res.send(req.cartItem)
});

// update cart item
cartItemRouter.put('/:cartItemID', async (req: GetCartItemByID, res: Response) => {
    if (req && req.cartItem && req.cartItem.id) {
        await db.updateCartItem(req.cartItem.id, req.body.productID, req.body.cartID);
        res.status(200).send('Cart Item updated')
    }
})

// delete cart item
cartItemRouter.delete('/:cartItemID', async (req: GetCartItemByID, res: Response) => {
    if (req && req.cartItem && req.cartItem.id) {
        await db.deleteCartItem(req.cartItem.id);
        res.status(200).send('Cart Item Deleted')
    }
})

export default cartItemRouter;