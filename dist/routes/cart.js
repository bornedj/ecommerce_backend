"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const cartRouter = (0, express_1.Router)();
cartRouter.param('cartID', async (req, res, next, id) => {
    const query = await db_1.default.getCartByID(id);
    if (!query) {
        res.status(404).send('Cart not found');
        return;
    }
    req.cart = query;
    next();
});
cartRouter.post('/', async (_, res) => {
    await db_1.default.insertCart();
    res.status(200).send("Cart Created");
});
cartRouter.get('/', async (_, res) => {
    const query = await db_1.default.getAllCarts();
    res.status(200).send(query);
    return;
});
cartRouter.get('/:cartID', (req, res) => {
    res.status(200).send(req.cart);
});
exports.default = cartRouter;
//# sourceMappingURL=cart.js.map