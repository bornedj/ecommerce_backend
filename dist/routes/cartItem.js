"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const cartItemRouter = (0, express_1.Router)();
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
exports.default = cartItemRouter;
//# sourceMappingURL=cartItem.js.map