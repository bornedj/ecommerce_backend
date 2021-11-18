import { Router, Request, Response } from "express";
import db from "../db/db";

// create the router
const cartItemRouter = Router();

// setup params
// cartItemRouter.param('cartItemID', (req: Request, res: Response, next: NextFunction, id: number) => {
//     const cartItem = db.
// })

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

export default cartItemRouter;