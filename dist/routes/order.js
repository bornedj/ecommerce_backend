"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const orderItem_1 = __importDefault(require("./orderItem"));
const orderRouter = (0, express_1.Router)();
orderRouter.use('/orderItem', orderItem_1.default);
orderRouter.param('orderID', async (req, res, next, id) => {
    const order = await db_1.default.getOrderByID(id);
    if (!order) {
        res.status(404).send("Order not found");
        return;
    }
    req.order = order;
    next();
});
orderRouter.post('/', async (req, res) => {
    await db_1.default.insertOrder(req.body.userID, req.body.total, req.body.status);
    res.status(201).send('New Order Created');
});
orderRouter.get('/', async (_, res) => {
    res.send(await db_1.default.getAllOrders());
});
orderRouter.get('/:orderID', (req, res) => {
    if (req && req.order && req.order.id) {
        res.status(200).send(req.order);
    }
});
orderRouter.put('/:orderID', async (req, res) => {
    if (req && req.order && req.order.id) {
        await db_1.default.updateOrder(req.order.id, req.body.status, req.body.total);
        res.status(200).send('Order updated');
    }
});
orderRouter.delete('/:orderID', async (req, res) => {
    if (req && req.order && req.order.id) {
        await db_1.default.deleteOrder(req.order.id);
        res.status(200).send('Order deleted');
    }
});
exports.default = orderRouter;
//# sourceMappingURL=order.js.map