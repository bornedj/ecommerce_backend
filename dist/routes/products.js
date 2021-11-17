"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const productsRouter = (0, express_1.Router)();
productsRouter.param('productID', async (req, res, next, id) => {
    const query = await db_1.default.getProductByID(id);
    if (!query) {
        res.status(404).send('Product not found');
    }
    req.product = query;
    next();
});
productsRouter.get('/', (_, res) => {
    res.send(db_1.default.getAllProducts());
});
productsRouter.get('/:productID', (req, res) => {
    res.send(req.product);
});
exports.default = productsRouter;
//# sourceMappingURL=products.js.map