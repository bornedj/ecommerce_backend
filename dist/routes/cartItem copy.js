"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const cartItemRouter = (0, express_1.Router)();
cartItemRouter.param('cartItemID', async (req, res, next, id) => {
    const cartItem = await db_1.default.getCartItemById(id);
    if (!cartItem) {
        res.status(404).send('Cart Item not found');
    }
    req.cartItem = cartItem;
    next();
});
cartItemRouter.post('/', async (req, res) => {
    const product = await db_1.default.getProductByID(req.body.productID);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    const cart = await db_1.default.getCartByID(req.body.cartID);
    if (!cart) {
        res.status(404).send('Cart not found');
        return;
    }
    await db_1.default.insertCartItem(product.id, cart.id);
    res.status(200).send("Cart Item added");
});
cartItemRouter.get('/:cartItemID', async (req, res) => {
    res.send(req.cartItem);
});
cartItemRouter.put('/:cartItemID', async (req, res) => {
    if (req && req.cartItem && req.cartItem.id) {
        await db_1.default.updateCartItem(req.cartItem.id, req.body.productID, req.body.cartID);
        res.status(200).send('Cart Item updated');
    }
});
cartItemRouter.delete('/:cartItemID', async (req, res) => {
    if (req && req.cartItem && req.cartItem.id) {
        await db_1.default.deleteCartItem(req.cartItem.id);
        res.status(200).send('Cart Item Deleted');
    }
});
exports.default = cartItemRouter;
//# sourceMappingURL=cartItem%20copy.js.map