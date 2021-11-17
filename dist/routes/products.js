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
productsRouter.post('/', async (req, res) => {
    await db_1.default.insertProduct(req.body.name, req.body.price, req.body.description);
    res.status(201).send('New product created');
});
productsRouter.put('/:productID', async (req, res) => {
    if (req.product) {
        await db_1.default.updateProduct(req.body.id, req.body.name, req.body.price, req.body.description);
        res.status(204).send('Product updated');
    }
});
productsRouter.delete('/:productID', async (req, res) => {
    if (req.product) {
        await db_1.default.deleteProduct(req.product.id);
        res.status(202).send('Product Deleted');
    }
});
exports.default = productsRouter;
//# sourceMappingURL=products.js.map